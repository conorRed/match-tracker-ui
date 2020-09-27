FROM node:12.18.1 as builder

WORKDIR /app
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY build /app/build
RUN npm install 

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp
