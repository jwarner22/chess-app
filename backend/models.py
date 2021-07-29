from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base


# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)

#     items = relationship("Item", back_populates="owner")

# block comment with ctr+K+C
# un-block comment with ctrl+K+U

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



#class Item(Base):
 #   __tablename__ = "items"

  #  id = Column(Integer, primary_key=True, index=True)
   # title = Column(String, index=True)
    #description = Column(String, index=True)
   # owner_id = Column(Integer, ForeignKey("users.id"))

#    owner = relationship("User", back_populates="items")