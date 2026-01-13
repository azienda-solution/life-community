import threading
import queue
import time
import importlib
import traceback
from typing import Dict, Any
from datetime import datetime
task_q: "queue.Queue[int]" = queue.Queue()

def worker_loop():
    while True:
        job_id = task_q.get()
        #run ici
        task_q.task_done()


def start_worker():
    t = threading.Thread(target=worker_loop, daemon=True)
    t.start()


def enqueue(job_id: int):
    task_q.put(job_id)
