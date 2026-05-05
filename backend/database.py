import sqlite3
import uuid

def create_database():
    try:
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        print("Database initialized.")

        cursor.execute("""
            SELECT COUNT(*) FROM sqlite_master 
            WHERE type='table' AND name='Food_Items'
        """)

        result = cursor.fetchone()[0]

        if result < 1:
            print("This seems like initial database creation, setting table.")
            cursor.execute('''CREATE TABLE Food_Items(
                UUID TEXT,
                MEAL TEXT,
                NAME TEXT,
                CALORIES INTEGER,
                PROTEIN REAL,
                CARBS REAL,
                FAT REAL);''')
            conn.commit()
            print("Table created successfully.")
        else:
            print("Database was previously established. Verifying schema.")
            cursor.execute("PRAGMA table_info(Food_Items)")
            columns = cursor.fetchall()

            expected_columns = {"UUID", "MEAL", "NAME", "CALORIES", "PROTEIN", "CARBS", "FAT"}
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
                print("Schema verified successfully. Moving on.")

    except sqlite3.Error as error:
        print("The following error occurred -", error)

    finally:
        cursor.close()
        conn.close()

# Conduct a general query against the database for all entries
def query_foods():
    try:
        conn = sqlite3.connect('fitrations.db')
        cursor = conn.cursor()
        statement = '''SELECT * FROM Food_Items'''
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
        cursor.execute('''INSERT INTO Food_Items 
            VALUES (?, ?, ?, ?, ?, ?, ?)''',
            (new_uuid, food.meal_type, food.name, food.calories, food.protein, food.carbs, food.fat))
        conn.commit()
        return new_uuid
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
        cursor.execute('''DELETE FROM Food_Items WHERE UUID = (?)''', (id,))
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