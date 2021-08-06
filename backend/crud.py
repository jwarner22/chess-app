from sqlalchemy.orm import Session

import models, schemas
import json

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.user_id == user_id).first()

# def get_user_ratings(db: Session, user_id: int):
#     # need to find specific attribute user.themes
#     return db.query(models.Theme).filter(models.Theme.owner_id == user_id).all()
# #def get_user_by_email(db: Session, email: str):
# #    return db.query(models.User).filter(models.User.email == email).first()

def get_all_ratings(db: Session, skip:int = 0, limit: int = 100):
    return db.query(models.Theme).offset(skip).limit(limit).all()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    #fake_hashed_password = user.password + "notreallyhashed"
    #db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
    db_user = models.User(user_id = user.user_id, overall_rating =  user.overall_rating)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def add_theme(db: Session, theme: schemas.CreateTheme, user_id: int):
    db_theme = models.Theme(**theme.dict(), owner_id = user_id)
    db.add(db_theme)
    db.commit()
    db.refresh(db_theme)
    return db_theme

#def get_items(db: Session, skip: int = 0, limit: int = 100):
#    return db.query(models.Item).offset(skip).limit(limit).all()


#def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#    db_item = models.Item(**item.dict(), owner_id=user_id)
#    db.add(db_item)
#    db.commit()
#    db.refresh(db_item)
#    return db_item