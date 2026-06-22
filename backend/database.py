import sqlite3
import uuid
from datetime import datetime
import os
from zoneinfo import ZoneInfo

###################################### 
##          ENV VARIABLES           ##
######################################

DB_PATH = os.environ.get("DB_PATH", "fitrations.db")
TIMEZONE = os.environ.get("TIME_ZONE", "America/New_York")

###################################### 
##       BASE FUNCTIONALITY         ##
######################################

# Dedicated function to be called when database needs current DTG
# Must be called as needed to ensure DTG isn't cached at runtime
def get_date():
    set_timezone = ZoneInfo(TIMEZONE)
    now = datetime.now()
    # Adjust current date and time based on user preference
    adjusted_now = now.astimezone(set_timezone)
    formatted_date = adjusted_now.strftime("%Y-%m-%d")
    return formatted_date

###################################### 
## DATABASE CREATION AND VALIDATION ##
######################################

def create_database():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        print("Database initialized.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()

def create_database_table():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        print("Checking for food database table...")

        cursor.execute("""
            SELECT COUNT(*) FROM sqlite_master 
            WHERE type='table' AND name='Food_Database'
        """)

        result = cursor.fetchone()[0]

        if result < 1:
            print("This seems like initial database creation, setting up the food database table.")
            cursor.execute('''CREATE TABLE Food_Database(
                FOOD_UUID TEXT,
                NAME TEXT,
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL,
                SERVING_SIZE TEXT);''')
            conn.commit()
            print("Primary food database table created successfully.")
        else:
            print("Database was previously established. Verifying schema.")
            cursor.execute("PRAGMA table_info(Food_Database)")
            columns = cursor.fetchall()

            expected_columns = {"FOOD_UUID", "NAME", "CALORIES", "PROTEIN", "CARBS", "FAT", "SERVING_SIZE"}
            existing_columns = {row[1] for row in columns}

            if not expected_columns.issubset(existing_columns):
                missing = expected_columns - existing_columns
                unexpected = existing_columns - expected_columns
                print(f"Schema mismatch detected.")
                if missing:
                    print(f"Missing columns: {missing}")
                if unexpected:
                    print(f"Unexpected columns found: {unexpected}")
            else:
                print("Food database schema verified successfully.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()    
        
def create_journal_table():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        print("Checking for food journal table...")

        cursor.execute("""
            SELECT COUNT(*) FROM sqlite_master 
            WHERE type='table' AND name='Food_Journal'
        """)
    
        result = cursor.fetchone()[0]

        if result < 1:
            print("No food journal table exists. Creating it.")
            cursor.execute('''CREATE TABLE Food_Journal(
                JOURNAL_UUID TEXT,
                FOOD_UUID TEXT,
                MEAL_TYPE TEXT,
                PORTION REAL,
                DATE TEXT);''')
            conn.commit()
            print("Food journal table created successfully.")
        else:
            print("Database was previously established and journal table exists. Verifying schema.")
            cursor.execute("PRAGMA table_info(Food_Journal)")
            columns = cursor.fetchall()

            expected_columns = {"JOURNAL_UUID", "FOOD_UUID", "MEAL_TYPE", "PORTION", "DATE"}
            existing_columns = {row[1] for row in columns}

            if not expected_columns.issubset(existing_columns):
                missing = expected_columns - existing_columns
                unexpected = existing_columns - expected_columns
                print(f"Schema mismatch detected.")
                if missing:
                    print(f"Missing columns: {missing}")
                if unexpected:
                    print(f"Unexpected columns found: {unexpected}")
            else:
                print("Journal schema verified successfully.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()   

def create_goals_table():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        print("Checking for the goals table...")

        cursor.execute("""
            SELECT COUNT(*) FROM sqlite_master 
            WHERE type='table' AND name='Goals'
        """)
    
        result = cursor.fetchone()[0]

        if result < 1:
            print("No goals table exists. Creating it with default entries.")
            cursor.execute('''CREATE TABLE Goals(
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL);''')
            conn.commit()
            cursor.execute('''INSERT INTO Goals (CALORIES, PROTEIN, CARBS, FAT) VALUES (0, 0, 0, 0)''')
            conn.commit()
            print("Goals table created successfully.")
        else:
            print("Database was previously established and goals table exists. Verifying schema.")
            cursor.execute("PRAGMA table_info(Goals)")
            columns = cursor.fetchall()

            expected_columns = {"CALORIES", "PROTEIN", "CARBS", "FAT"}
            existing_columns = {row[1] for row in columns}

            if not expected_columns.issubset(existing_columns):
                missing = expected_columns - existing_columns
                unexpected = existing_columns - expected_columns
                print(f"Schema mismatch detected.")
                if missing:
                    print(f"Missing columns: {missing}")
                if unexpected:
                    print(f"Unexpected columns found: {unexpected}")
            else:
                print("Goal schema verified successfully.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()   

######################### 
## DATABASE TECHNIQUES ##
#########################

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

######################## 
## JOURNAL TECHNIQUES ##
########################

def query_journal():
    try:
        conn = sqlite3.connect(DB_PATH)
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
        conn = sqlite3.connect(DB_PATH)
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
    date = get_date()
    try:
        conn = sqlite3.connect(DB_PATH)
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
        conn = sqlite3.connect(DB_PATH)
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
        conn = sqlite3.connect(DB_PATH)
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

###################### 
## GOALS TECHNIQUES ##
######################

def retrieve_goal():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM Goals''')
        columns = [description[0] for description in cursor.description]
        result = cursor.fetchone()
        if result is None:
            print("No goal set.")
        else:
            return dict(zip(columns, result))
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def modify_goal(goal_update):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''UPDATE Goals SET CALORIES=?, PROTEIN=?, CARBS=?, FAT=? WHERE ROWID = 1''',
            (goal_update.calorie_goal, goal_update.protein_goal, goal_update.carbs_goal, goal_update.fat_goal))
        conn.commit()
        print("Goal updated successfully!")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()
