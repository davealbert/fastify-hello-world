FROM node:12 AS builder
COPY . /code
WORKDIR /code
RUN rm -rf node_modules &2>/dev/null; npm install


FROM node:12-slim
WORKDIR /app
COPY --from=builder /code /app

ENV NODE_ENV production
ENV PORT 3000

USER node

EXPOSE 3000

CMD ["npm", "start"]
