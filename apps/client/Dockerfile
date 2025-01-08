# FROM node:20 AS development
# WORKDIR /development
# COPY ./pnpm-lock.yaml ./apps/client/package.json  .
# RUN npm install -g pnpm && pnpm install

# FROM node:20 AS build
# WORKDIR /build
# RUN mkdir -p /build/apps/client
# RUN mkdir -p /build/config
# COPY --from=development /development/node_modules/ /build/apps/client/node_modules
# COPY --from=development /development/pnpm-lock.yaml /build/apps/client/
# RUN npm install -g pnpm typescript
# COPY ./config/ /build/config/
# COPY ./apps/client/ /build/apps/client/
# WORKDIR /build/apps/client
# RUN npm run build && rm -rf node_modules && pnpm install --frozen-lockfile --prod

# FROM nginx:alpine AS production
# COPY --from=build /build/apps/client/dist /usr/share/nginx/html
# COPY ./apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# ENV PORT=5000
# EXPOSE 5000
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine AS build
 
WORKDIR /build
 
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm install -g pnpm && pnpm install && pnpm build

FROM nginx:alpine AS production
COPY --from=build /build/apps/client/dist /usr/share/nginx/html
COPY ./apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENV PORT=5000
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
