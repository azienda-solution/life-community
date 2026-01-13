FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends tini curl && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app
ENV PYTHONPATH=/app
EXPOSE 2370
ENTRYPOINT ["/usr/bin/tini","--"]
CMD ["python","-m","uvicorn","app.main:app","--host","0.0.0.0","--port","2370","--workers","1"]
