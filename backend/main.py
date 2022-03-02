from starlette.requests import Request
import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from utlities.security import check_token
from routes.v1 import app_v1
from starlette.responses import Response
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED
from fastapi.middleware.cors import CORSMiddleware
from utlities.security import get_user

app = FastAPI(title="Elo Elevation API Documenation", description="API to manage public user data and track user progress", version="1.0.0")

app.include_router(app_v1, prefix="/v1", dependencies=[Depends(get_user)])

#app.mount('/v1', app_v1)
# app.mount('/v2, app_v2)

@app.middleware("http")
async def middleware(request: Request, call_next):
    # modify request
    if not any(word in str(request.url) for word in ["/docs","/openapi.json"]):
        try:
            id_token = request.headers["Authorization"].split("Bearer ")[1]
            is_valid = check_token(id_token)
        except Exception as e:
            is_valid = False

        if not is_valid:
            return Response("Unauthorized", status_code=HTTP_401_UNAUTHORIZED)
    response = await call_next(request)
    #modify response
    return response

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://chess-app-frontend.vercel.app",
    "https://eloelevation.com",
    "https://www.eloelevation.com"
]

app.add_middleware(
      CORSMiddleware,
      allow_origins=origins,
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )


if __name__ == '__main__':
    uvicorn.run('main:app', host='127.0.0.1', port=8000, reload=True) # remove reload for production