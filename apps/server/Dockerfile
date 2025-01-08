# FROM node:20 AS development
# WORKDIR /development
# COPY . .
# RUN npm install -g pnpm && pnpm install
# RUN pnpm build

# FROM node:20 AS build
# WORKDIR /build
# RUN mkdir -p /build/server && mkdir -p /build/packages && npm install -g pnpm
# COPY --from=development /development/apps/server/ /build/server/
# COPY --from=development /development/pnpm-lock.yaml .
# COPY --from=development /development/packages/ ./packages/
# COPY --from=development /development/pnpm-workspace.yaml .
# WORKDIR /build/server
# RUN rm -rf node_modules && pnpm install --prod

# FROM node:20-alpine AS production
# WORKDIR /app
# RUN apk add --no-cache openssl
# RUN mkdir -p /app/node_modules
# COPY ./apps/server/package.json .
# COPY --from=build /build/server/node_modules ./node_modules
# COPY --from=build /build/server/dist ./dist
# RUN mkdir -p /app/prisma
# COPY ./apps/server/prisma/ /app/prisma/

# 빌드 단계: 애플리케이션 준비 및 프로덕션 의존성 설치
# FROM node:20 AS build
# WORKDIR /build

# pnpm을 전역으로 설치
# RUN npm install -g pnpm

# # 개발 단계에서 파일 복사
# COPY --from=development /development/apps/server/ /build/server/
# COPY --from=development /development/pnpm-lock.yaml .
# COPY --from=development /development/packages/ ./packages/
# COPY --from=development /development/pnpm-workspace.yaml .

# 프로덕션 의존성만 설치
# WORKDIR /build/server
# RUN pnpm install

# 프로덕션 단계: 런타임 환경 설정
# FROM node:20-alpine AS production
# WORKDIR /app

# # 필요한 시스템 의존성 설치 (Prisma 등)
# RUN apk add --no-cache openssl

# # 필요한 디렉토리 생성
# RUN mkdir -p /app/node_modules /app/prisma

# # 빌드 단계에서 애플리케이션 파일과 빌드 출력 복사
# COPY ./apps/server/package.json .
# COPY --from=build /build/server/node_modules ./node_modules
# COPY --from=build /build/server ./server
# COPY ./apps/server/prisma/ /app/prisma/

# # 프로덕션 환경 변수 설정
# ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
# ENV PORT=3000
# ENV NODE_ENV=production
# EXPOSE 3000

# # 애플리케이션 시작
# ENTRYPOINT ["sh", "-c", "node ./server/dist/src/main.js"]


# ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
# ENV PORT=3000
# ENV NODE_ENV=development
# EXPOSE 3000
# ENTRYPOINT ["sh", "-c", "npx prisma generate && node ./dist/src/main.js"]
# # Development stage: Install dependencies and build the project
# FROM node:20 AS development
# WORKDIR /development

# FROM node:20 AS development
# WORKDIR /development
# COPY . .
# RUN npm install -g pnpm && pnpm install
# RUN pnpm build

# # Build stage: Prepare production build
# FROM node:20 AS build
# WORKDIR /build

# # Install pnpm and prepare the workspace
# RUN npm install -g pnpm
# COPY --from=development /development/apps/server/package.json ./apps/server/
# COPY --from=development /development/pnpm-workspace.yaml ./
# COPY --from=development /development/pnpm-lock.yaml ./
# COPY --from=development /development/apps/server/ ./apps/server/
# COPY --from=development /development/packages/ ./packages/

# # Install production-only dependencies
# WORKDIR /build/apps/server
# RUN pnpm install --frozen-lockfile --prod

# # Production stage: Setup runtime environment
# FROM node:20-alpine AS production
# WORKDIR /app

# # Install required system packages
# RUN apk add --no-cache openssl

# # Copy necessary files for the application
# COPY ./apps/server/package.json .
# COPY --from=build /build/apps/server/node_modules ./node_modules
# COPY --from=build /build/apps/server/dist ./dist
# RUN mkdir -p /app/prisma
# COPY ./apps/server/prisma/ /app/prisma/

# # Environment variables and entrypoint
# ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
# ENV PORT=3000
# ENV NODE_ENV=production
# EXPOSE 3000

# FROM node:20 AS mono
# WORKDIR /mono
# COPY . .
# RUN npm install -g pnpm && pnpm install && pnpm build

# FROM node:20 AS development
# WORKDIR /development
# COPY ./packages/ ./packages/
# COPY ./pnpm-lock.yaml ./apps/server/package*.json ./pnpm-workspace.yaml .
# RUN npm install -g pnpm && pnpm install --prod

# FROM node:20-alpine AS production
# WORKDIR /app
# RUN apk add --no-cache openssl
# COPY ./apps/server/package.json ./apps/server/
# COPY --from=development /development/node_modules ./apps/server/node_modules
# COPY --from=mono /mono/apps/server/dist ./apps/server/dist
# RUN mkdir -p /app/packages
# COPY --from=mono /mono/packages /app/packages
# COPY ./apps/server/prisma/ ./apps/server/prisma/
# COPY ./pnpm-workspace.yaml .

# ENV DATABASE_URL=mysql://johndoe:randompassword@localhost:3306/mydb
# ENV PORT=3000
# ENV NODE_ENV=development
# EXPOSE 3000
# ENTRYPOINT ["sh", "-c", "node apps/server/dist/src/main.js"]

# FROM node:20
 
# WORKDIR /usr/src/app
 
# COPY . .
 
# RUN npm install -g pnpm && pnpm install && pnpm build
 
# # Copy app source

# ENV DATABASE_URL=mysql://seogeonhyuk:rhdrhdCLF@192.168.64.3:3306/cloud_canvas
# ENV MYSQL_HOST=1
# ENV MYSQL_PORT=3306
# ENV REDIS_HOST=3
# ENV REDIS_PORT=6379
# ENV NCLOUD_ACCESS_KEY=0
# ENV NCLOUD_SECRET_KEY=0
# ENV PORT=3000
# ENV NODE_ENV=development
# EXPOSE 3000
 
# CMD [ "node", "apps/server/dist/src/main.js" ]

# FROM node:20 AS development

# WORKDIR /dir
# COPY . .
# RUN npm install -g pnpm && cd apps/server/ && pnpm install --prod --ignore-scripts

# FROM node:20-alpine AS production
# WORKDIR /app
# RUN apk add --no-cache openssl
# RUN mkdir -p /app/node_modules
# COPY --from=development /dir/apps/server/node_modules ./node_modules
# COPY --from=development /dir/apps/server/dist ./dist
# RUN mkdir -p /app/prisma
# COPY ./apps/server/prisma/ /app/prisma/
# CMD [ "node", "./dist/src/main.js" ]


# FROM node:20 AS development

# WORKDIR /dir
# COPY . .
# RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile --ignore-scripts --filter server --shamefully-hoist

# FROM node:20-alpine AS production
# WORKDIR /app
# COPY ./apps/server/prisma ./prisma
# COPY --from=development /dir/apps/server/node_modules/ ./node_modules/
# COPY ./apps/server/dist ./dist
# CMD [ "node", "./dist/src/main.js" ]

FROM node:20-alpine AS prune
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /prune
COPY . .
RUN npm install -g turbo && turbo prune server --docker

FROM node:20-alpine AS build
WORKDIR /build
COPY --from=prune /prune/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store npm install -g pnpm && pnpm install --frozen-lockfile
COPY --from=prune /prune/out/full/ .
RUN apk add --no-cache openssl && cd ./apps/server && pnpm build && cd ../../packages/ncloud-sdk && pnpm build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm prune --prod --no-optional

# FROM node:20-alpine AS dependencies
# WORKDIR /dependencies
# COPY --from=prune /prune/out/json/ .
# RUN npm install -g pnpm && pnpm install --ignore-scripts --prod

FROM node:20-alpine AS production
WORKDIR /app
RUN apk add --no-cache openssl
COPY ./apps/server/prisma ./apps/server/prisma
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/apps/server ./apps/server
COPY --from=build /build/packages/ncloud-sdk ./packages/ncloud-sdk
ENV NODE_ENV=development
ENV DATABASE_URL=mysql://seogeonhyuk:rhdrhdCLF@192.168.64.3:3306/cloud_canvas
ENV REDIS_HOST=3
ENV REDIS_PORT=6379
ENV NCLOUD_ACCESS_KEY=0
ENV NCLOUD_SECRET_KEY=0
CMD [ "node", "./apps/server/dist/src/main.js" ]