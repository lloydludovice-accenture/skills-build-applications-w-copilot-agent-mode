from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel, is_superhero=True)
        Activity.objects.create(user=user, type='Running', duration=30, calories=300, date='2025-11-25')
        workout = Workout.objects.create(name='Hero HIIT', description='High intensity for heroes')
        workout.suggested_for.add(user)
        Leaderboard.objects.create(team=marvel, total_points=750, rank=1)

    def test_user_email_unique(self):
        marvel = Team.objects.get(name='Marvel')
        with self.assertRaises(Exception):
            User.objects.create(name='Duplicate', email='spiderman@marvel.com', team=marvel)

    def test_activity_creation(self):
        user = User.objects.get(email='spiderman@marvel.com')
        activity = Activity.objects.get(user=user)
        self.assertEqual(activity.type, 'Running')
        self.assertEqual(activity.calories, 300)

    def test_leaderboard(self):
        marvel = Team.objects.get(name='Marvel')
        leaderboard = Leaderboard.objects.get(team=marvel)
        self.assertEqual(leaderboard.total_points, 750)
