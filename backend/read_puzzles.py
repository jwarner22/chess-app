from sqlalchemy.orm import Session
import sqlalchemy
import models #, schemas


def get_puzzle(db: Session, puzzle_id: str):
    return db.query(models.Puzzles).filter(models.Puzzles.puzzle_id == puzzle_id).first()

def get_puzzles(db: Session, rating: int = 1500, theme: str = '', limit: int = 20):
    upperBound = rating + 50
    lowerBound = max(1000, (rating - 50))
    puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound) & (models.Puzzles.themes.contains(theme)) & sqlalchemy.not_(models.Puzzles.themes.contains('promotion'))).limit(limit).all() # .first() # .limit(10)
    while (upperBound < 2500 and len(puzzles) == 0):
        upperBound += 50
        lowerBound = max(1000, (lowerBound - 50))
        puzzles = db.query(models.Puzzles).filter((models.Puzzles.rating > lowerBound) & (models.Puzzles.rating < upperBound) & (models.Puzzles.themes.contains(theme)) & sqlalchemy.not_(models.Puzzles.themes.contains('promotion'))).limit(limit).all() # .first() # .limit(10)
    return puzzles