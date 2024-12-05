FROM node:20 AS development
WORKDIR /development
COPY ./pnpm-lock.yaml ./apps/hub/package*.json .
RUN npm install -g pnpm && pnpm install

FROM node:20 AS build
WORKDIR /build
COPY --from=development /development/node_modules/ ./node_modules
COPY ./apps/hub/ .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN mkdir -p /app/server
COPY --from=build /build/.next/standalone/ ./standalone/
COPY --from=build /build/.next/static/ ./standalone/.next/static
COPY --from=build /build/public/ ./standalone/public

ENV BACK_URL=https://api.cloudcanvas.kro.kr
ENTRYPOINT ["sh", "-c", "node standalone/server.js"]
