FROM node:20-alpine AS build
 
WORKDIR /build
 
COPY . .

RUN npm install -g pnpm && pnpm install && pnpm build

FROM nginx:alpine AS production
COPY --from=build /build/apps/client/dist /usr/share/nginx/html
COPY ./apps/nginx/nginx.conf /etc/nginx/conf.d/default.conf
ENV PORT=5000
EXPOSE $PORT
ENV VITE_API_URL=''
CMD ["nginx", "-g", "daemon off;"]
