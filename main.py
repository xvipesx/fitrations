#Python 3.12.0
#Version 0.0.0

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.database
from backend.routers import journal, foods


#from core.config import settings

# Verify database exists or setup a new DB
backend.database.create_database()


app = FastAPI(
    title="Nutrition Tracking API",
    description="API to interact with program database",
    version="0.0.0",
    docs_url="/docs",
)
# Adjust later for security
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add API endpoint routing
app.include_router(journal.router)
app.include_router(foods.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
