FROM node:22-alpine AS build

WORKDIR /build

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx AS FINAL

WORKDIR /usr/share/nginx/html

COPY --from=build /build/dist .

