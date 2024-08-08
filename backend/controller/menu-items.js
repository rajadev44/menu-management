const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { uploadImage, s3 } = require('../UploadImage');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get all menu items
router.get('/', async (req, res) => {
  const menuItems = await prisma.menuItem.findMany({
    include: {
      ingredients: true,
      sizes: {
        orderBy: {
          price: 'asc', 
        },
      },
      baseIngredients: true,
    },
  });
  res.json(menuItems);
});

// Get top 3 menu items
router.get('/top', async (req, res) => {
  const menuItems = await prisma.menuItem.findMany({
    take: 3,
    include: {
      ingredients: true,
      sizes:  {
        orderBy: {
          price: 'asc', 
        },
      },
      baseIngredients: true,
    },
  });
  res.json(menuItems);
});

// Get a menu item by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: {
      ingredients: true,
      sizes:  {
        orderBy: {
          price: 'asc', 
        },
      },
      baseIngredients: true,
    },
  });
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Create a new menu item
router.post('/', uploadImage.single('image'), async (req, res) => {
  const { name, description, price, category, ingredients, sizes, baseIngredients } = req.body;
  const newItem = await prisma.menuItem.create({
    data: {
      id: uuidv4(),
      name,
      description,
      price: parseFloat(price) || 0, // Ensure price is a number
      category,
      imageUrl: req.file ? req.file.location : null,
      ingredients: {
        create: JSON.parse(ingredients),
      },
      sizes: {
        create: JSON.parse(sizes),
      },
      baseIngredients: {
        create: JSON.parse(baseIngredients),
      },
    },
    include: {
      ingredients: true,
      sizes:  {
        orderBy: {
          price: 'asc', 
        },
      },
      baseIngredients: true,
    },
  });
  res.status(201).json(newItem);
});

// Update an existing menu item
router.put('/:id', uploadImage.single('image'), async (req, res) => {
  const id = req.params.id;
  const { name, description, price, category, ingredients, sizes, baseIngredients } = req.body;
  const item = await prisma.menuItem.findUnique({ where: { id } });

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Delete the old image from S3 if a new image is uploaded
  if (req.file && item.imageUrl && item.imageUrl.startsWith('https://')) {
    const oldImageKey = item.imageUrl.split('/').pop();
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: oldImageKey,
      }));
    } catch (err) {
      console.error('Failed to delete old image:', err);
    }
  }

  const updatedItem = await prisma.menuItem.update({
    where: { id },
    data: {
      name,
      description,
      price: parseFloat(price) || item.price,
      category,
      imageUrl: req.file ? req.file.location : item.imageUrl,
      ingredients: {
        deleteMany: {},
        create: JSON.parse(ingredients),
      },
      sizes: {
        deleteMany: {},
        create: JSON.parse(sizes),
      },
      baseIngredients: {
        deleteMany: {},
        create: JSON.parse(baseIngredients),
      },
    },
    include: {
      ingredients: true,
      sizes:  {
        orderBy: {
          price: 'asc', 
        },
      },
      baseIngredients: true,
    },
  });

  res.json(updatedItem);
});

// Delete a menu item
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const item = await prisma.menuItem.findUnique({ where: { id } });

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  // Delete the image from S3
  if (item.imageUrl && item.imageUrl.startsWith('https://')) {
    const imageKey = item.imageUrl.split('/').pop();
    try {
      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: imageKey,
      }));
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  }

  await prisma.menuItem.delete({
    where: { id },
  });

  res.status(204).end();
});

module.exports = router;
