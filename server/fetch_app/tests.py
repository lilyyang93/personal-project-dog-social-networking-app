from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import AppUser

class AppUserTest(TestCase):
    def test_01_create_user(self):
        new_user = AppUser(username='steve@apple.com', password='1234', first_name='Steve', last_name='Jobs', email='steve@apple.com', birthdate='2010-12-08')
        try:
            new_user.full_clean()
            self.fail()
        except ValidationError as e:
            self.assertTrue("You must be at least 18 years old to use Fetch." in e.message_dict['birthdate'])

