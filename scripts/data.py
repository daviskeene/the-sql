import mysql.connector
import hashlib
import string
import random

### Example query
# query = ("SELECT * FROM students;")
# cursor.execute(query)
###

###
# Queries for adding new rows to each table in our schema.
###

def generate_id(seed):
    """
    Function to generate a random uuid
    """
    result = hashlib.md5(seed.encode())
    hex_dig = str(result.hexdigest())
    result = ""
    i = 0

    while len(result) < 8:
        char = hex_dig[i]
        if char.isdigit():
            result += char
        i += 1

    return int(result)


def generate_random_word(length):
    """
    Function to generate random seed for IDs
    """
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


add_classroom_q = ("INSERT INTO classrooms "
               "(classroom_id, classroom_name, classroom_description) "
               "VALUES (%s, %s, %s)")

add_student_q = ("INSERT INTO students "
              "(student_id, email, first_name, last_name, points_earned, points_total, classroom_id) "
              "VALUES (%s, %s, %s, %s, %s, %s, %s)")

add_teacher_q = ("INSERT INTO teachers "
              "(teacher_id, email, first_name, last_name, classroom_id) "
              "VALUES (%s, %s, %s, %s, %s)")

add_assignment_q = ("INSERT INTO assignments "
              "(assignment_id, assignment_name, assignment_description, assignment_points, code, test_cases, classroom_id)"
              "VALUES (%s, %s, %s, %s, %s, %s, %s)")

add_assignment_grade_q = ("INSERT INTO assignments "
              "(assignment_grade_id, assignment_id, student_id, points_earned, points_total)"
              "VALUES (%s, %s, %s, %s, %s)")


cnx = mysql.connector.connect(user='root', password='root',
                        host='35.193.10.169',
                        database='the_sql_db')
cursor = cnx.cursor()

def add_teacher(email, first_name, last_name, classroom_id, teacher_id=generate_id(generate_random_word(50))):
    """
    Adds a teacher to the database. 
    
    If no teacher_id is specified, then we will create one.
    """
    if (email is None or first_name is None or last_name is None or classroom_id is None):
        print("Missing one or more necessary fields.")
        return
    
    # Put all data from arguments into a tuple
    data_teacher = (teacher_id, email, first_name, last_name, classroom_id)
    # Execute query
    cursor.execute(add_teacher_q, data_teacher)

    # Make sure data is committed to the database
    cnx.commit()

    # Close connections
    cursor.close()
    cnx.close()

add_teacher(email="test@gmail.com", first_name="testy", last_name="mctest", classroom_id=4111)