GRADE_SCALE = [(97, 'A+'), (93, 'A'), (90, 'A-'), (87, 'B+'), (83, 'B'), (80, 'B-'), (77, 'C+'), (73, 'C'),
                       (70, 'C-'), (67, 'D+'), (63, 'D'), (60, 'D-')]

GPA_VALUES = {
    'A+': 4,
    'A': 4,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1,
    'D-': .7,
    'F': 0
}


def get_letter_grade(score):
    for (min_score, letter) in GRADE_SCALE:
        if score >= min_score:
            return letter
    return 'F'


def get_grade_points(units, score):
    letter_grade = get_letter_grade(score)
    return GPA_VALUES[letter_grade] * units


def get_gpa(classes):
    if not classes:
        return 0.0
    grade_points = [get_grade_points(cls.units, cls.score) for cls in classes]
    units = sum([cls.units for cls in classes])
    return sum(grade_points) / units
