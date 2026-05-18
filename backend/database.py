import sqlite3
import uuid

## 
## DATABASE CREATION
##

def create_database():
    try:
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        print("Database initialized.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()

def create_database_table():
    try:
        conn = sqlite3.connect('fitrations.db')
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
                UUID TEXT,
                NAME TEXT,
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL);''')
            conn.commit()
            print("Primary food database table created successfully.")
        else:
            print("Database was previously established. Verifying schema.")
            cursor.execute("PRAGMA table_info(Food_Database)")
            columns = cursor.fetchall()

            expected_columns = {"UUID", "NAME", "CALORIES", "PROTEIN", "CARBS", "FAT"}
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
        conn = sqlite3.connect('fitrations.db')
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
                UUID TEXT,
                NAME TEXT,
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL,
                PORTION REAL,
                TYPE TEXT,
                DATE TEXT);''')
            conn.commit()
            print("Food journal table created successfully.")
        else:
            print("Database was previously established and journal table exists. Verifying schema.")
            cursor.execute("PRAGMA table_info(Food_Journal)")
            columns = cursor.fetchall()

            expected_columns = {"UUID", "NAME", "CALORIES", "PROTEIN", "CARBS", "FAT", "PORTION", "TYPE", "DATE"}
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        print("Checking for the goals table...")

        cursor.execute("""
            SELECT COUNT(*) FROM sqlite_master 
            WHERE type='table' AND name='Goals'
        """)
    
        result = cursor.fetchone()[0]

        if result < 1:
            print("No goals table exists. Creating it.")
            cursor.execute('''CREATE TABLE Goals(
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL);''')
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

## 
## DATABASE TECHNIQUES
##

def query_all_foods():
    try:
        conn = sqlite3.connect('fitrations.db')
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''INSERT INTO Food_Database 
            VALUES (?, ?, ?, ?, ?, ?)''',
            (new_uuid, food.name, food.calories, food.protein, food.carbs, food.fat))
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM Food_Database WHERE UUID = (?)''', (id,))
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''DELETE FROM Food_Database WHERE UUID = (?)''', (id,))
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''UPDATE Food_Database 
            SET NAME = ?, CALORIES = ?, PROTEIN = ?, CARBS = ?, FAT = ?
            WHERE UUID = ?''',
            (food.name, food.calories, food.protein, food.carbs, food.fat, id))
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
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''SELECT * FROM Food_Database 
            WHERE NAME LIKE ?''', (f'%{query}%',))
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

## 
## FOOD JOURNAL SECTION
##


## 
## GOALS SECTION
##

def set_initial_goal(goal):
    try:
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        cursor.execute('''INSERT INTO Goals 
            VALUES (?, ?, ?, ?)''',
            (goal.calorie_goal, goal.protein_goal, goal.carbs_goal, goal.fat_goal))
        conn.commit()
        print("Initial goal set successfully.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def retrieve_goal():
    try:
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        statement = '''SELECT * FROM Goals'''
        cursor.execute(statement)
        results = cursor.fetchall()
        return results
    except sqlite3.Error as error:
        print("The following error occurred -", error)
        return None
    finally:
        cursor.close()
        conn.close()

def modify_goal(goal_update):
    try:
        conn = sqlite3.connect('fitrations.db')
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


