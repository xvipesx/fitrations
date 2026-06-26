import sqlite3
import uuid
from .connection import DB_PATH

# Allow absolute query of all food items in the database
def query_all_foods():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        statement = '''SELECT * FROM Food_Database'''
        cursor.execute(statement)
        results = cursor.fetchall()
        return results
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def add_food(food):
    new_uuid = str(uuid.uuid4())
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''INSERT INTO Food_Database (FOOD_UUID, NAME, CALORIES, PROTEIN, CARBS, FAT, SERVING_SIZE)
            VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (new_uuid, food.name, food.calories, food.protein, food.carbs, food.fat, food.serving_size))
        conn.commit()
        return new_uuid
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def return_food(id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM Food_Database WHERE FOOD_UUID = (?)''', (id,))
        conn.commit()
        results = cursor.fetchall()
        return results
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def delete_food(id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''DELETE FROM Food_Database WHERE FOOD_UUID = (?)''', (id,))
        conn.commit()
        if cursor.rowcount == 0:
            return None
        return id
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def modify_food(id, food):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''UPDATE Food_Database 
            SET NAME = ?, CALORIES = ?, PROTEIN = ?, CARBS = ?, FAT = ?, SERVING_SIZE = ? WHERE FOOD_UUID = (?)''',
            (food.name, food.calories, food.protein, food.carbs, food.fat, food.serving_size, id))
        conn.commit()
        if cursor.rowcount == 0:
            return None
        return id
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def search_foods(query):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM Food_Database 
            WHERE NAME LIKE (?)''', (f'%{query}%',))
        columns = [description[0] for description in cursor.description]
        results = cursor.fetchall()
        foods = [dict(zip(columns, row)) for row in results]
        return foods
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def clear_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''DELETE FROM Food_Database''')
        conn.commit()
        return None
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()