const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadImage, s3 } = require('../UploadImage');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get all categories
router.get('', async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});


// Get 3 categories
router.get('/top', async (req, res) => {
  const categories = await prisma.category.findMany({take:3});
  res.json(categories);
});

// Create a new category
router.post('', uploadImage.single('image'), async (req, res) => {
  const { name, description, mealPeriod, minAge } = req.body;
  const newCategory = await prisma.category.create({
    data: {
      id: uuidv4(),
      name,
      description,
      image: req.file ? req.file.location : null,
      mealPeriod,
      minAge: parseInt(minAge, 10),
    },
  });
  res.status(201).json(newCategory);
});

// Update an existing category
router.put('/:id', uploadImage.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, description, mealPeriod, minAge } = req.body;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Delete the old image from S3 if a new image is uploaded
  if (req.file && category.image && category.image.startsWith('https://')) {
    const oldImageKey = category.image.split('/').pop();
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: oldImageKey,
        })
      );
    } catch (err) {
      console.error('Failed to delete old image:', err);
    }
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      name,
      description,
      image: req.file ? req.file.location : category.image,
      mealPeriod,
      minAge: parseInt(minAge, 10),
    },
  });

  res.json(updatedCategory);
});

// Delete a category
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Delete the image from S3
  if (category.image && category.image.startsWith('https://')) {
    const imageKey = category.image.split('/').pop();
    try {
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: imageKey,
        })
      );
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  }

  await prisma.category.delete({ where: { id } });

  res.status(204).end();
});

module.exports = router;
