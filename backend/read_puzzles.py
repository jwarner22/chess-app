from sqlalchemy.orm import Session
from sqlalchemy.sql.expression import func
import sqlalchemy
import models #, schemas


def get_puzzle(db: Session, puzzle_id: str):
    return db.query(models.Puzzles).filter(models.Puzzles.puzzle_id == puzzle_id).first()

def get_puzzles(db: Session, rating: int = 1500, theme: str = '', limit: int = 30):
    upperBound = rating + 50
    lowerBound = max(1000, (rating - 50))
    
    # pull random puzzles from the database based on theme and rating
    if theme != 'mix':
        puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound) & (models.Puzzles.themes.contains(theme))).order_by(func.random()).limit(limit).all() # .first() # .limit(10)
    else: # healthy mix of puzzles from all themes and categories for a specific rating
        puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound)).order_by(func.random()).limit(limit).all()
    
    while (upperBound < 2500 and len(puzzles) == 0):
        upperBound += 50
        lowerBound = max(1000, (lowerBound - 50))
        
        if theme != 'mix':
            puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound) & (models.Puzzles.themes.contains(theme))).order_by(func.random()).limit(limit).all() # .first() # .limit(10)
        else:
            puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound)).order_by(func.random()).limit(limit).all()
    return puzzles


# & sqlalchemy.not_(models.Puzzles.themes.contains('promotion'))