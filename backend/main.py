# Python 3.12.0

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import db_setup
from routers import journal, foods, goals, calc, backups


# Database operations to create initial DB if it doesn't exist and verify tables
db_setup.create_database()
db_setup.create_food_database_table()
db_setup.create_journal_table()
db_setup.create_goals_table()

app = FastAPI(
    title="FitRations Nutrition Tracking API",
    description="API to interact with the FitRations SQL database.",
    version="0.2.0",
    docs_url="/docs",
)

# Only allow origins established in the user's docker-compose, 5173 is used during dev work only and is not used if an explicit environment available is set in docker-compose.yaml
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


# Adjusted to set only approved origins above and established by the user
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Disposition"], # Response header from backend required for proper naming of database backup file
)

# Add API endpoint routing
app.include_router(journal.router)
app.include_router(foods.router)
app.include_router(goals.router)
app.include_router(calc.router)
app.include_router(backups.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True) # Set to 127.0.0.1 to avoid listening on a container port
