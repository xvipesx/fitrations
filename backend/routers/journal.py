from fastapi import APIRouter, HTTPException
from models import Journal

import database

router = APIRouter()

@router.get("/query_journal")
def query_journal():
    result = database.query_journal()
    return result

@router.post("/add_journal_entry")
def add_journal_entry(data: Journal):
    result = database.add_journal_entry(data)
    return result

@router.delete("/delete_journal_entry")
def delete_journal_entry(journal_id: str): # Uses journal_uuid
    result = database.delete_journal_entry(journal_id)
    return result

@router.delete("/clear_journal")
def clear_journal():
    result = database.clear_journal()
    return result