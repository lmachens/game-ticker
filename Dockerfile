FROM node:lts-alpine

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run server:build
RUN npm ci --production --prefer-offline

ENV PORT=3001
ENV NODE_ENV=production
EXPOSE 3001
CMD npm start