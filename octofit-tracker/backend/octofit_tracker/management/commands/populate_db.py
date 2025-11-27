from django.core.management.base import BaseCommand
from octofit_tracker.models import Team, User, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear existing data
        Activity.objects.all().delete()
        Workout.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team=marvel, is_superhero=True),
            User(name='Iron Man', email='ironman@marvel.com', team=marvel, is_superhero=True),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team=dc, is_superhero=True),
            User(name='Batman', email='batman@dc.com', team=dc, is_superhero=True),
        ]
        for user in users:
            user.save()

        # Create activities
        Activity.objects.create(user=users[0], type='Running', duration=30, calories=300, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Cycling', duration=45, calories=450, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Swimming', duration=60, calories=600, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Yoga', duration=40, calories=200, date=timezone.now().date())

        # Create workouts
        workout1 = Workout.objects.create(name='Hero HIIT', description='High intensity for heroes')
        workout2 = Workout.objects.create(name='Power Yoga', description='Yoga for superheroes')
        workout1.suggested_for.set(users)
        workout2.suggested_for.set([users[2], users[3]])

        # Create leaderboards
        Leaderboard.objects.create(team=marvel, total_points=750, rank=1)
        Leaderboard.objects.create(team=dc, total_points=800, rank=1)

        self.stdout.write(self.style.SUCCESS('Test data populated successfully.'))
