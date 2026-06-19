# Stage 1 - build the React frontend
FROM node:20-slim AS build
WORKDIR /app
COPY frontend/package*.json .
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2 - final image with Python, nginx, and supervisor
FROM python:3.12-slim
RUN apt-get update && apt-get install -y nginx supervisor && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/sites-available/default
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
EXPOSE 80
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]