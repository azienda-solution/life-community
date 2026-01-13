from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
scheduler = BackgroundScheduler()


def schedule_job(cron_expr: str, tool: str, payload: dict | None):
    # Exemple simple: cron_expr="0 8 * * *" => utilise add_job avec trigger='cron'
    minute, hour, day, month, dow = cron_expr.split()

def start_scheduler():
    scheduler.start()
