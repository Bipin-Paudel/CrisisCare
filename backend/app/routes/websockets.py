from fastapi import APIRouter, Request, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from ..database import get_db
import json

from ..models import User, Request, Resource

ws_router = APIRouter()

class ConnectionManager:
    """Handles WebSocket connections and broadcasting"""
    def __init__(self):
        self.active_connections: dict[int, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        if user_id not in self.active_connections:
            self.active_connections[user_id] = []
        self.active_connections[user_id].append(websocket)

    def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            self.active_connections[user_id].remove(websocket)
            if not self.active_connections[user_id]:  
                del self.active_connections[user_id]

    async def send_personal_message(self, message: dict, user_id: int):
        """Send message to a specific user"""
        if user_id in self.active_connections:
            for connection in self.active_connections[user_id]:
                await connection.send_json(message)

    async def broadcast(self, message: dict):
        """Send message to all connected users"""
        for connections in self.active_connections.values():
            for connection in connections:
                await connection.send_json(message)

manager = ConnectionManager()

@ws_router.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    """WebSocket connection for real-time updates"""
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()  
            print(f"Received data from {user_id}: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket, user_id)

async def notify_match(request_id: int, donor_id: int, db: Session):
    request = db.query(Request).filter(Request.id == request_id).first()
    donor = db.query(User).filter(User.id == donor_id).first()
    
    if request and donor:
        message = {
            "type": "match",
            "request_id": request.id,
            "request_title": request.title,
            "donor_id": donor.id,
            "donor_name": donor.firstname
        }
        await manager.send_personal_message(message, request.user_id)
        await manager.send_personal_message(message, donor_id)
