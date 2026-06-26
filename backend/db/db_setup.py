import sqlite3
import connection


def create_database():
    try:
        conn = sqlite3.connect(connection.DB_PATH)
        cursor = conn.cursor()
        print("Database initialized.")
    except sqlite3.Error as error:
        print("The following error occurred -", error)
    finally:
        cursor.close()
        conn.close()

def create_food_database_table():
    try:
        conn = sqlite3.connect(connection.DB_PATH)
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
        conn = sqlite3.connect(connection.DB_PATH)
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
        conn = sqlite3.connect(connection.DB_PATH)
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