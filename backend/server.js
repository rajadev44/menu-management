const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // For unique IDs
const {uploadImage, s3} = require('./UploadImage');
const {   DeleteObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();
// Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imageURL = "https://ishine-dry-clean.s3.eu-west-2.amazonaws.com/1721855218006_image_DALL%C3%82%C2%B7E%202023-12-18%2015.04.06%20-%20An%20expanded%20view%20of%20a%20professional%20setting%20with%20a%20sleek%20laptop%20showing%20code%20on%20the%20screen%2C%20a%20cup%20of%20coffee%2C%20a%20notepad%20with%20algorithm%20sketches%2C%20sophist.png"

let categories = [
  { id: uuidv4(), name: 'Breakfast', description: 'Breakfast items and dishes', image: imageURL, mealPeriod: 'Breakfast', minAge: 0 },
  { id: uuidv4(), name: 'Lunch', description: 'Lunch items and dishes', image: imageURL, mealPeriod: 'Lunch', minAge: 0 },
  { id: uuidv4(), name: 'Dinner', description: 'Dinner items and dishes', image: imageURL, mealPeriod: 'Dinner', minAge: 0 },
  { id: uuidv4(), name: 'Dessert', description: 'Sweet treats and desserts', image: imageURL, mealPeriod: 'Dessert', minAge: 0 },
];

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.post('/api/categories',  uploadImage.single('image'), (req, res) => {
  const { name, description, mealPeriod, minAge } = req.body;
  const newCategory = {
    id: uuidv4(),
    name,
    description,
    image: req.file ? req.file.location : 'http://placeholder.svg',
    mealPeriod,
    minAge: parseInt(minAge, 10),
  };
  categories.push(newCategory);
  res.status(201).json(newCategory);
});

app.put('/api/categories/:id', uploadImage.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, mealPeriod, minAge } = req.body;
  const category = categories.find((cat) => cat.id === id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Delete the old image from S3 if a new image is uploaded
  if (req.file && category.image && category.image.startsWith('https://')) {
    const oldImageKey = category.image.split('/').pop();
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: oldImageKey,
      }));
    } catch (err) {
      console.error('Failed to delete old image:', err);
    }
  }

  category.name = name;
  category.description = description;
  category.image = req.file ? req.file.location : category.image;
  category.mealPeriod = mealPeriod;
  category.minAge = parseInt(minAge, 10);
  res.json(category);
});

app.delete('/api/categories/:id', async (req, res) => {
  const { id } = req.params;
  const category = categories.find((cat) => cat.id === id);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Delete the image from S3
  if (category.image && category.image.startsWith('https://')) {
    const imageKey = category.image.split('/').pop();
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: imageKey,
      }));
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  }

  categories = categories.filter((cat) => cat.id !== id);
  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
