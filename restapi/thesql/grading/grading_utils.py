"""

This is our SQL grading hacky test framework. The main idea here is that we need a way to run a users
SQL query against a database, parse the test cases, and return a grade based on how many cases hit.

To accomplish this, we first need to standardize how test cases are stored in the database. This way, we
can parse them into values that we can test.

Let's define the schema for our test cases as follows:

[database name]: [expected results after query]

The expected results will be the raw text returned from the expected SQL query.
This way, we can query from multiple databases and get the expected result.

The expected results will be stored as follows:
"[row1, row2, ... rown]", where each row is the raw text returned from the query.

"""

import numpy
from .test_framework import DELIMETER


def generate_test_cases(query, connection):
    """
    Turns a (PROPER) query into a string that is representative of the correct output of an assignment.
    """
    with connection.cursor() as cursor:
        # Get the results of the query
        cursor.execute(query)

        results = cursor.fetchall()
        # Current delimeter is '%<>%', which separates rows
        return DELIMETER.join([x for x in results])


def parse_test_cases(test_cases: str):
    """
    Returns the rows of a SQL query from test cases string format
    """
    rows = test_cases.split(DELIMETER)
    outarr = []
    for row in rows:
        # row is a string, so we must convert all of its comma separated values into data
        parsed_row = row.strip('(').strip(')').split(', ')
        outarr.append(parsed_row)
    return outarr


def get_assignment_score(sql_query):
    """
    Returns the proportion of rows correct after executing a SQL query.
    """
    # The expected results are stored as a string. Parse this string into rows instead.
    return


def get_student_by_email(email):
    """
    Returns a user object based on their email. Used for adding AssignmentGrades.
    """
    from ..models import Student

    student = Student.objects.get(email=email)
    return None if not student else student


def validate_query(query):
    """
    Make sure that the query won't harm our database.
    """
    return True  # default


if __name__ == "__main__":
    generate_test_cases('SELECT * from thesql_classrooms')