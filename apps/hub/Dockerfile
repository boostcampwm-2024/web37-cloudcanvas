# FROM node:20-alpine AS development
# WORKDIR /development
# COPY ./pnpm-lock.yaml ./apps/hub/package*.json .
# RUN npm install -g pnpm && pnpm install --prod

# FROM node:20-alpine AS build
# WORKDIR /build
# COPY --from=development /development/node_modules ./node_modules
# COPY ./apps/hub/ .
# RUN npm run build

# FROM node:20-alpine AS production
# WORKDIR /app
# RUN mkdir -p /app/server
# COPY --from=build /build/.next/standalone/ ./standalone/
# COPY --from=build /build/.next/static/ ./standalone/.next/static
# COPY --from=build /build/public/ ./standalone/public

# ENV BACK_URL=https://api.cloudcanvas.kro.kr
# ENTRYPOINT ["sh", "-c", "node standalone/server.js"]

FROM node:20-alpine AS prune
WORKDIR /prune
COPY . .
RUN npm install -g turbo && turbo prune hub --docker

FROM node:20-alpine AS dependencies
WORKDIR /dependencies
COPY --from=prune /prune/out/json/ .
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS build
WORKDIR /build
COPY --from=prune /prune/out/json/ .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY --from=prune /prune/out/full/ .
RUN cd /build/apps/hub && pnpm build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /build/apps/hub/.next/standalone/ ./standalone/
COPY --from=build /build/apps/hub/.next/static/ ./standalone/.next/static
COPY --from=build /build/apps/hub/public/ ./standalone/public
COPY --from=dependencies /dependencies/node_modules ./node_modules
COPY --from=dependencies /dependencies/apps/hub/node_modules ./standalone/node_modules

ENV BACK_URL=http://localhost:3000
ENTRYPOINT ["sh", "-c", "node ../standalone/apps/hub/server.js"]
