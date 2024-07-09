import express from 'express';
const codeBlock = require('../models/codeBlock');
const router = express.Router();
router.get('/', async (req, res) => {
    const codeBlocks = await codeBlock.find();
    res.json(codeBlocks);
});
router.get('/:id', async (req, res) => {
    const codeblock = await codeBlock.findById(req.params.id);
    res.send(codeblock);
});
router.post('/', async (req, res) => {
    const newCodeBlock = new codeBlock(req.body);
    await newCodeBlock.save();
    res.json(newCodeBlock);
})

module.exports = router;


