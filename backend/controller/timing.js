
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all timings
router.get('/', async (req, res) => {
  try {
    const timings = await prisma.timing.findMany();
    res.json(timings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve timings' });
  }
});

// Create or update a timing
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { day, hours, isOutOfService } = req.body;

  try {
    const timing = await prisma.timing.upsert({
      where: { id },
      update: { day, hours, isOutOfService },
      create: { id, day, hours, isOutOfService }
    });
    res.json(timing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create or update timing' });
  }
});

// Delete a timing (mark as out of service)
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const timing = await prisma.timing.update({
      where: { id },
      data: { isOutOfService: true, hours: 'Out of Service' }
    });
    res.json(timing);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete timing' });
  }
});

module.exports = router;
