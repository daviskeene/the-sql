from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello():
    return ({
        'hello': 'world',
        'goodbye': 'earth'
    })

if __name__ == '__main__':
    # Create connections to GCP sql database
    cnx = mysql.connector.connect(user='root', password='root',
                        host='35.232.8.8',
                        database='test')
    
    cursor = cnx.cursor()

    ### YOUR CODE HERE
    # add_teacher(cnx, cursor, "davisk2@illinois.edu", "Davis", "Keene", classroom_id)
    # remove_row(cnx, cursor, 'teachers', '7982699')
    # add_assignment(cnx, cursor, "Update University Database", "As a Database Administrator, you are responsible for updating the information in the university database. Some changes are made to the course with CRN 243. The Credits for this course are changed to 3 and the current Instructor has been replaced by Professor 'Ron Spectre'. Update the records in the Courses and Enrollments tables. A new student named 'Elizabeth Viara' has joined the 'CS' department. Her NetId is 'eviara1'. She took the course with CRN 243 for 3 credits and got a Score of 85. Update her Students and Enrollments records. Finally, print out the CRN and Title of all 200-level courses (200 <= CRN < 300) along with the total number of students enrolled in each course. Order the results in descending order of CRN.", 10, '', '', classroom_id)
    # add_assignment_grades_bulk(cnx, cursor, classroom_id)
    # add_assignments(cnx, cursor, 996)
    # add_students(cnx, cursor, 10)

    app.run(port=8000, debug=True)