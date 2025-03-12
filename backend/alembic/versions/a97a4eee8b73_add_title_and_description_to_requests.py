"""Add title and description to requests

Revision ID: a97a4eee8b73
Revises: 6a52f6ce91e5
Create Date: 2025-02-28 22:42:18.600914

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a97a4eee8b73'
down_revision: Union[str, None] = '6a52f6ce91e5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_requests_id', table_name='requests')
    op.drop_index('ix_requests_title', table_name='requests')
    op.drop_table('requests')
    op.drop_index('ix_users_email', table_name='users')
    op.drop_index('ix_users_id', table_name='users')
    #op.drop_table('users')
    op.drop_index('ix_resources_id', table_name='resources')
    op.drop_table('resources')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('resources',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('resource_type', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('location_lat', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('location_lon', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='resources_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='resources_pkey')
    )
    op.create_index('ix_resources_id', 'resources', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.INTEGER(), server_default=sa.text("nextval('users_id_seq'::regclass)"), autoincrement=True, nullable=False),
    sa.Column('firstname', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('lastname', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('email', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('mobile_number', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('hashed_password', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='users_pkey'),
    postgresql_ignore_search_path=False
    )
    op.create_index('ix_users_id', 'users', ['id'], unique=False)
    op.create_index('ix_users_email', 'users', ['email'], unique=True)
    op.create_table('requests',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('request_type', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('location_lat', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('location_lon', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True),
    sa.Column('status', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('title', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('description', sa.TEXT(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='requests_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='requests_pkey')
    )
    op.create_index('ix_requests_title', 'requests', ['title'], unique=False)
    op.create_index('ix_requests_id', 'requests', ['id'], unique=False)
    # ### end Alembic commands ###
