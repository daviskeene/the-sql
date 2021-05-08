TRIGGER_REMOVE_ASSIGNMENT_GRADE = """"
CREATE TRIGGER RemoveAssignmentGrades

AFTER DELETE ON thesql_assignment
FOR EACH ROW

DELETE FROM thesql_assignmentgrade WHERE thesql_assignmentgrade.assignment_grade_id = thesql_assignment.assignment_id;
"""