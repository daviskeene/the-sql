from django.core.management.base import BaseCommand, CommandError
from thesql.models import Student
from django.db import connection
from thesql.grading.test_framework import DELIMETER


def generate_test_cases(query):
    """
    Turns a (PROPER) query into a string that is representative of the correct output of an assignment.
    """
    with connection.cursor() as cursor:
        # Get the results of the query
        cursor.execute(query)

        # Current delimeter is '%<>%', which separates rows
        return DELIMETER.join(str(x) for x in cursor.fetchall())


class Command(BaseCommand):
    help = 'Run a SQL query from the command line.'

    def handle(self, *args, **options):
        print(generate_test_cases('SELECT * FROM thesql_classroom'))
        return
