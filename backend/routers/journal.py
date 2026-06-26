from fastapi import APIRouter, HTTPException
from models import Journal

from db import journal

router = APIRouter()

@router.get("/query_journal")
def query_journal():
    result = journal.query_journal()
    return result

@router.get("/query_journal_by_date")
def query_journal_by_date(date: str):
    result = journal.query_journal_by_date(date)
    return result

@router.post("/add_journal_entry")
def add_journal_entry(data: Journal):
    result = journal.add_journal_entry(data)
    return result

@router.delete("/delete_journal_entry")
def delete_journal_entry(journal_id: str): # Uses journal_uuid
    result = journal.delete_journal_entry(journal_id)
    return result

@router.delete("/clear_journal")
def clear_journal():
    result = journal.clear_journal()
    return result