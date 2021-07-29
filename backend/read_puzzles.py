from sqlalchemy.orm import Session

import models #, schemas


def get_puzzle(db: Session, puzzle_id: str):
    return db.query(models.Puzzles).filter(models.Puzzles.puzzle_id == puzzle_id).first()

def get_puzzles(db: Session, rating: int = 1500, theme: str = '', limit: int = 20):
    return db.query(models.Puzzles).filter((models.Puzzles.rating > (rating - 200)) & (models.Puzzles.rating < (rating + 200)) & (models.Puzzles.themes.contains(theme))).limit(limit).all() # .first() # .limit(10)