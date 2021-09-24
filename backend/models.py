from enum import unique
from typing import Sequence
import uuid
from pydantic.types import UUID1
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import column
from sqlalchemy.sql.sqltypes import TIMESTAMP
from database import Base, LocalBase

class Puzzles(LocalBase):
    __tablename__ = "labels_raw"
    puzzle_id = Column(String, primary_key=True, index=True)
    fen = Column(String, unique=False, index=True)
    moves = Column(String, unique=False, index=True)
    rating = Column(Integer, unique=False, index=True)
    rating_dev = Column(Integer, unique=False, index=True)
    rating_dev2 = Column(Integer, unique=False, index=True)
    nb_plays = Column(Integer, unique=False, index=True)
    themes = Column(String, unique=False, index=True)
    game_url = Column(String, unique=False, index=True)


class Theme(Base):
    __tablename__ = "themes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique = False, index=True)
    category = Column(String, index=True)
    completed = Column(Integer, index=True)
    rating = Column(Integer, index=True)
    high_score = Column(Integer, index=True)
    score_history = Column(String, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))
    
    #owner = relationship("User", back_populates="themes")

class DailyPuzzle(Base):
    __tablename__ = 'daily_puzzles'
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(Integer, unique=False, index=True)
    inserted_at = Column(String, unique=False, index=True)
    theme_id = Column(Integer, unique = False, index=True)
    title = Column(String, unique=False,index=True)
    completed = Column(Boolean, unique=False,index=True)
    locked = Column(Boolean, unique=False, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))
    

class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    inserted_at = Column(Float, unique=False, index=True)
    category = Column(String, unique=False, index=True)
    value = Column(Integer, unique=False, index=True)
    theme = Column(String, unique=False, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String,unique=True, index=True)
    overall_rating = Column(Integer,unique=False, index=True)
    inserted_at = Column(String, unique=False, index=True)
    total_score = Column(Integer, unique=False, index=True)
    
    themes =  relationship("Theme", backref="user")
    daily_puzzles = relationship("DailyPuzzle", backref="user")
    achievements = relationship("Achievement", backref="user")
    #themes = relationship("Theme", back_populates='owner')

    class Congif:
        orm_mode = True



# can repeat this structure for openings and endgames

