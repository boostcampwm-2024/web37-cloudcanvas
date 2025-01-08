FROM node:20-alpine AS prune
WORKDIR /prune
COPY . .
RUN npm install -g turbo && turbo prune hub --docker

FROM node:20-alpine AS build
WORKDIR /build
COPY --from=prune /prune/out/json/ .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY --from=prune /prune/out/full/ .
RUN cd /build/apps/hub && pnpm build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=build /build/apps/hub/.next/standalone/ ./standalone/
COPY --from=build /build/apps/hub/.next/static/ ./standalone/apps/hub/.next/static/
COPY --from=build /build/apps/hub/public/ ./standalone/apps/hub/public/

ENV BACK_URL=http://localhost:3000
ENTRYPOINT ["sh", "-c", "node ./standalone/apps/hub/server.js"]
