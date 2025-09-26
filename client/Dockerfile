# FROM node:20-alpine AS build
# WORKDIR /app
# COPY ./client/package.json ./client/package-lock.json ./  
# RUN yarn install
# COPY /client .
# RUN yarn build

# # Runtime Stage
# FROM nginx:alpine
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine AS build
WORKDIR /app
COPY ./client/package.json ./client/package-lock.json ./  
RUN yarn install
COPY ./client .
RUN yarn build

# Runtime Stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]