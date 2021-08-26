from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.expression import column
from database import Base

class Puzzles(Base):
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
    owner_id = Column(String, ForeignKey("user.user_id"))
    
    #owner = relationship("User", back_populates="themes")

class DailyPuzzle(Base):
    __tablename__ = 'daily_puzzles'
    
    id = Column(Integer, primary_key=True, index=True)
    location = Column(Integer, unique=False, index=True)
    theme_id = Column(Integer, unique = False, index=True)
    title = Column(String, unique=False,index=True)
    completed = Column(Boolean, unique=False,index=True)
    locked = Column(Boolean, unique=False, index=True)
    owner_id = Column(String, ForeignKey("user.user_id"))
    


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String,unique=True, index=True)
    overall_rating = Column(Integer,unique=False, index=True)

    themes =  relationship("Theme", backref="user")
    daily_puzzles = relationship("DailyPuzzle", backref="user")
    #themes = relationship("Theme", back_populates='owner')

    class Congif:
        orm_mode = True

# can repeat this structure for openings and endgames

#class UserProfile(Base):
#    __tablename__ = "user_profile"
#    id = Column(Integer, primary_key=True, index=True)
#    user_id = Column(Integer, unique=True, index=True)
#    rating = Column(Integer, unique=False, index=True)
    
#    user_progress = relationship("Users", back_populates="user_profile")

#class Progress(Base):
#    __tablename__ = "progress"

#    id = Column(Integer, primary_key=True, index=True)
#    module = Column(Integer, unique=False, index=True)
#    completed = Column(Boolean, unique=False, index=True)
#    score = Column(Integer, unique=False,index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)

#     items = relationship("Item", back_populates="owner")

# block comment with ctr+K+C
# un-block comment with ctrl+K+U

#class Item(Base):
 #   __tablename__ = "items"

  #  id = Column(Integer, primary_key=True, index=True)
   # title = Column(String, index=True)
    #description = Column(String, index=True)
   # owner_id = Column(Integer, ForeignKey("users.id"))

#    owner = relationship("User", back_populates="items")