import sqlite3
import connection


def retrieve_goal():
    try:
        conn = sqlite3.connect(connection.DB_PATH)
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
        conn = sqlite3.connect(connection.DB_PATH)
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
