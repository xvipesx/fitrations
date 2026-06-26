import sqlite3
import uuid

import connection
from utils import datetime_helpers



def query_journal():
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        statement = '''SELECT * FROM Food_Journal'''
        cursor.execute(statement)
        results = cursor.fetchall()
        return results
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def query_journal_by_date(date):
    keyed_data = []
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''SELECT fj.JOURNAL_UUID, fj.MEAL_TYPE, fd.NAME, fd.CALORIES, fd.PROTEIN, fd.CARBS, fd.FAT, fd.SERVING_SIZE, fj.PORTION, fj.DATE
                       FROM Food_Journal fj INNER JOIN Food_Database fd ON fj.FOOD_UUID = fd.FOOD_UUID WHERE fj.DATE = (?) ''', (date,))
        columns = [description[0] for description in cursor.description]
        results = cursor.fetchall()
        rows = len(results)
        if results is None:
            print("Error receiving data from journal.") # Error will be produced if items have the wrong FOOD_UUID; correct error handling later
        else:
            for i in range(rows):
                keyed_data.append(dict(zip(columns, results[i])))
        return keyed_data
    except sqlite3.Error as error:
        print('The following error occurred -', error)
        return None
    finally:
        cursor.close()
        conn.close()


def add_journal_entry(data):
    journal_uuid = str(uuid.uuid4()) # Journal entry receives unique UUID separate from food_uuid in Food_Database
    date = datetime_helpers.get_date()
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        # Journal intentionally uses FOOD_UUID from Food_Database to avoid data duplication in two tables.
        cursor.execute('''INSERT INTO Food_Journal (JOURNAL_UUID, FOOD_UUID, MEAL_TYPE, PORTION, DATE) 
                       VALUES (?, ?, ?, ?, ?)''', 
                       (journal_uuid, data.food_uuid, data.meal_type, data.portion, date))
        conn.commit()
        return journal_uuid
    except sqlite3.Error as error:
        print("The folloiwng error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def delete_journal_entry(id):
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''DELETE FROM Food_Journal WHERE JOURNAL_UUID = (?) ''', (id,)) # Uses journal_uuid
        conn.commit()
        return id
    except sqlite3.Error as error:
        print("The folloiwng error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def clear_journal():
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''DELETE FROM Food_Journal''')
        conn.commit()
        return None
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()
