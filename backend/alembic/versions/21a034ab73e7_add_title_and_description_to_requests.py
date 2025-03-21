"""Add title and description to requests

Revision ID: 21a034ab73e7
Revises: 60d999b33132
Create Date: 2025-03-01 03:02:26.312320

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '21a034ab73e7'
down_revision: Union[str, None] = '60d999b33132'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_users_email', table_name='users')
    op.drop_index('ix_users_id', table_name='users')
    #op.drop_table('users')
    op.drop_index('ix_requests_id', table_name='requests')
    op.drop_index('ix_requests_title', table_name='requests')
    op.drop_table('requests')
    op.drop_index('ix_resources_id', table_name='resources')
    op.drop_table('resources')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('resources',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('resource_type', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('location_lat', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('location_lon', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('is_available', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='resources_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='resources_pkey')
    )
    op.create_index('ix_resources_id', 'resources', ['id'], unique=False)
    op.create_table('requests',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('description', sa.TEXT(), autoincrement=False, nullable=True),
    sa.Column('request_type', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('location_lat', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('location_lon', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('status', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), server_default=sa.text('now()'), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='requests_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='requests_pkey')
    )
    op.create_index('ix_requests_title', 'requests', ['title'], unique=False)
    op.create_index('ix_requests_id', 'requests', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('firstname', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('lastname', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('mobile_number', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('hashed_password', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_pkey')
    )
    op.create_index('ix_users_id', 'users', ['id'], unique=False)
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    # ### end Alembic commands ###
