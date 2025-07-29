FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system ce-monorepo-core-api && \
          adduser --system -G ce-monorepo-core-api ce-monorepo-core-api

COPY apps/core-api/dist ce-monorepo-core-api/
COPY apps/core-api/package.json ce-monorepo-core-api/
RUN chown -R ce-monorepo-core-api:ce-monorepo-core-api .

RUN npm --prefix ce-monorepo-core-api --omit=dev -f install

CMD [ "node", "ce-monorepo-core-api" ]
