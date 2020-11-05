# build stage
FROM node:15.1-stretch
WORKDIR /build
COPY package-lock.json package.json ./
RUN npm ci
COPY . .

# runtime stage
FROM alpine:3.12
RUN apk add --update nodejs
RUN addgroup -S node && adduser -S node -G node
USER node
#RUN mkdir /home/node/code
WORKDIR /home/node/code
COPY --from=0 --chown=node:node /build .
CMD ["node", "./bin/www"]