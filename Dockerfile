FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN ./node_modules/.bin/migrate up product -d mongodb+srv://kelompok1:Kelompok1db@ecommerce.hovkvpv.mongodb.net/?retryWrites=true&w=majority
RUN ./node_modules/.bin/migrate up User -d mongodb+srv://kelompok1:Kelompok1db@ecommerce.hovkvpv.mongodb.net/?retryWrites=true&w=majority
CMD ["node", "app.js"]
EXPOSE 8080
