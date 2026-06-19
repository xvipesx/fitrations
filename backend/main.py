# Python 3.12.0

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database
from routers import journal, foods, goals, calc


# Database operations to create initial DB if it doesn't exist and verify tables
database.create_database()
database.create_database_table()
database.create_journal_table()
database.create_goals_table()

app = FastAPI(
    title="FitRations Nutrition Tracking API",
    description="API to interact with program SQL database",
    version="0.0.0",
    docs_url="/docs",
)

# Only allow origins established in the user's docker-compose
raw_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [origin.strip() for origin in raw_origins.split(",") if origin.strip()]


# Adjusted to set only approved origins above and established by the user
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add API endpoint routing
app.include_router(journal.router)
app.include_router(foods.router)
app.include_router(goals.router)
app.include_router(calc.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True) # Set to 127.0.0.1 to avoid listening on a container port
