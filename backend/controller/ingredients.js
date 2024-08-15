const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

// Get all dropdown ingredients
router.get('/', async (req, res) => {
  const ingredients = await prisma.dropDownIngredient.findMany({orderBy:{name:'asc'}});
  res.json(ingredients);
});

// Create a new dropdown ingredient
router.post('/', async (req, res) => {
  const { name } = req.body;
  const newIngredient = await prisma.dropDownIngredient.create({
    data: { name }, 
  });
  res.status(201).json(newIngredient);
});

// Update an existing dropdown ingredient
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedIngredient = await prisma.dropDownIngredient.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.json(updatedIngredient);
  } catch (error) {
    res.status(404).json({ message: 'Ingredient not found' });
  }
});

// Delete a dropdown ingredient
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.dropDownIngredient.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: 'Ingredient not found' });
  }
});

module.exports = router;
