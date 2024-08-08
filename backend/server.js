const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const menuRoutes = require('./controller/menu-items');
const categoryRoute = require('./controller/category');
const ingredientsRoutes = require('./controller/ingredients')
const timingRoutes = require('./controller/timing');
const dotenv = require('dotenv');
const { initializeTimings } = require('./initialization');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
dotenv.config();
// Load environment variables from .env file


const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Use the menu items routes
app.use('/api/menu-items', menuRoutes);

//Use for Category routes
app.use('/api/categories', categoryRoute);

//Use for ingredients routes
app.use('/api/ingredients', ingredientsRoutes)

//Use for timing routes
app.use('/api/timings', timingRoutes)

initializeTimings().catch(e => {
  console.error(e);
  prisma.$disconnect();
}).finally(() => {
  prisma.$disconnect();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});