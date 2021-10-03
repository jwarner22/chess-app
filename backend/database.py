from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from retrying_query import RetryingQuery

#uri = os.getenv("DATABASE_URL") 
#if uri.startswith("postgres://"):
 #   uri = uri.replace("postgres://", "postgresql://", 1)
# rest of connection code using the connection string `uri`

# remote user database
SQLALCHEMY_DATABASE_URL = 'postgresql://admin:91fb0df341@143.110.153.229:5432/chess_user'
#SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:AHnaHlgTnQwV2SwwVzUVyYZuxdxE7hQD@chess32d3e-chess21a41-db-lb-264ce7b2cdcec80d.elb.us-east-1.amazonaws.com:5432/'

engine_remote = create_engine(SQLALCHEMY_DATABASE_URL,                                      pool_size=10,
                                      max_overflow=2,
                                      pool_recycle=300,
                                      pool_pre_ping=True,
                                      pool_use_lifo=True)



SessionRemote = sessionmaker(bind=engine_remote, autocommit=False, autoflush=False, query_cls=RetryingQuery)

Base = declarative_base()

# Local puzzle database
LOCAL_DATABASE_URL = 'sqlite:///./database/UserBase.sqlite'

engine_local = create_engine(LOCAL_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(bind=engine_local, autocommit=False, autoflush=False)

LocalBase = declarative_base()