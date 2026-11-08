from django.core.management.base import BaseCommand
from study.models import Subject

SUBJECTS = [
 ('Mathematics','Core','Master methods, sharpen problem-solving and practise exam-style questions.'),
 ('Biology','Science','Understand life processes with clear notes, diagrams and exam practice.'),
 ('Chemistry','Science','Build confidence with reactions, calculations and worked examples.'),
 ('Physics','Science','Turn difficult concepts into manageable steps and repeatable methods.'),
 ('English Language','Languages','Improve comprehension, grammar, composition and exam technique.'),
 ('Geography','Humanities','Connect physical and human geography with structured revision.'),
 ('History','Humanities','Organise events, causes and consequences into strong exam answers.'),
 ('Civic Education','Humanities','Revise citizenship, governance, rights and responsibilities.'),
 ('Commerce','Business','Learn the principles of trade, business operations and markets.'),
 ('Principles of Accounts','Business','Practise accounting concepts, calculations and financial statements.'),
]
class Command(BaseCommand):
    help = 'Create or update the STar Academy Zambia ECZ Grade 12 subject catalogue.'
    def handle(self, *args, **options):
        for name, category, description in SUBJECTS:
            Subject.objects.update_or_create(name=name, defaults={'category':category,'curriculum':'Zambia ECZ','description':description,'price_zmw':'0.00','is_published':True})
        self.stdout.write(self.style.SUCCESS(f'Seeded {len(SUBJECTS)} subjects.'))
