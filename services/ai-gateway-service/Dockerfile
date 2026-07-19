FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY tsconfig.json ./
COPY src ./src
RUN npm install typescript && npx tsc
ENV PORT=8081
EXPOSE 8081
CMD ["node", "dist/index.js"]
