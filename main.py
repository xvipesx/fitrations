#Python 3.12.0
#Version 0.0.0

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import backend.database
from backend.routers import journal, foods, goals


#from core.config import settings

# Database operations to create DB and verify tables
backend.database.create_database()
backend.database.create_database_table()
backend.database.create_journal_table()
backend.database.create_goals_table()



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
app.include_router(goals.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
