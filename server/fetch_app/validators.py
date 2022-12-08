from django.core.exceptions import ValidationError
from datetime import date, datetime

def age_greater_or_equal_to_18(birthdate):
    dob = datetime.strptime(str(birthdate), '%Y-%m-%d')
    today = date.today()
    age = today.year - birthdate.year -((today.month, today.day) < (birthdate.month, birthdate.day))
    print(age, 'years')
    if age < 18:
        raise ValidationError("You must be at least 18 years old to use Fetch.")

# print(date.today())

# def calculateAge(birthDate):
#     today = date.today()
#     age = today.year - birthDate.year -((today.month, today.day) <(birthDate.month, birthDate.day))
 
#     return age

# print(calculateAge(date(2004, 12, 8)), "years")