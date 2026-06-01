#Python 3.12.0
#Version 0.0.0

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
    title="FitRation Nutrition Tracking API",
    description="API to interact with program SQL database",
    version="0.0.0",
    docs_url="/docs",
)

origin = "http://127.0.0.1:5173"


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
app.include_router(calc.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
