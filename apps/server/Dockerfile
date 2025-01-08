FROM node:20-alpine AS prune
WORKDIR /prune
COPY . .
RUN npm install -g turbo && turbo prune server --docker

FROM node:20-alpine AS build
WORKDIR /build
COPY --from=prune /prune/out/json/ .
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY --from=prune /prune/out/full/ .
RUN apk add --no-cache openssl && cd /build/apps/server && pnpm build && cd /build/packages/ncloud-sdk && pnpm build && cd /build && pnpm prune --prod --no-optional

FROM node:20-alpine AS production
WORKDIR /app
RUN apk add --no-cache openssl
COPY ./apps/server/prisma ./apps/server/prisma
COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/pnpm-workspace.yaml .
COPY --from=build /build/package.json .
COPY --from=build /build/packages/ncloud-sdk/node_modules ./packages/ncloud-sdk/node_modules
COPY --from=build /build/packages/ncloud-sdk/dist ./packages/ncloud-sdk/dist
COPY --from=build /build/packages/ncloud-sdk/package.json ./packages/ncloud-sdk/package.json
COPY --from=build /build/apps/server/node_modules ./apps/server/node_modules
COPY --from=build /build/apps/server/dist ./apps/server/dist

ENV NODE_ENV=''
ENV DATABASE_URL=''
ENV REDIS_HOST=''
ENV REDIS_PORT=''
ENV NCLOUD_ACCESS_KEY=''
ENV NCLOUD_SECRET_KEY=''
CMD [ "node", "./apps/server/dist/src/main.js" ]