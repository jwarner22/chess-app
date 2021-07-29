from pydantic import BaseModel
from typing import Optional


class UserInfo(BaseModel):
    email: 'str'
    lichess_usn: Optional['str']
    chesscom_usn: Optional['str']

class Puzzle(BaseModel):
    puzzle_id: str
    fen: str
    moves: str
    themes: str
    class Config:
        orm_mode = True