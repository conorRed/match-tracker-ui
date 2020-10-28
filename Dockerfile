FROM node:12.18.1 as builder

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install --silent
COPY . . 
RUN yarn run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp
