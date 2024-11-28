#!/bin/sh
MYSQL_HOST=${MYSQL_HOST}
MYSQL_PORT=${MYSQL_PORT}
REDIS_HOST=${REDIS_HOST}
REDIS_PORT=${REDIS_PORT}

# MySQL 헬스체크
echo "Checking MySQL connection at ${MYSQL_HOST}:${MYSQL_PORT}..."
until nc -z -v -w30 "${MYSQL_HOST}" "${MYSQL_PORT}"; do
  echo "Waiting for MySQL connection..."
  sleep 1
done
echo "MySQL is up and running at ${MYSQL_HOST}:${MYSQL_PORT}!"

# Redis 헬스체크
echo "Checking Redis connection at ${REDIS_HOST}:${REDIS_PORT}..."
until nc -z -v -w30 "${REDIS_HOST}" "${REDIS_PORT}"; do
  echo "Waiting for Redis connection..."
  sleep 1
done
echo "Redis is up and running at ${REDIS_HOST}:${REDIS_PORT}!"

# Prisma 및 애플리케이션 시작
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
node ./dist/src/main.js