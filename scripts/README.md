# Scripts

## Contents

Scripts is the directory where we'll put all of our one-off scripts for this project.
Primarily, everything lives inside of the `data.py` file, since that's where we're writing most of the one-off's.

Examples of a one-off script include:
```python
    cnx = ...
    cursor = cnx.cursor()

    # One-off
    cursor.execute('UPDATE assignments SET assignment_points = 10 WHERE assignment_id = 1000;')

    cnx.commit()
    cursor.close()
    cnx.close()
```