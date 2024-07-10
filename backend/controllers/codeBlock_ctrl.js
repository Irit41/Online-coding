import codeBlock from '../models/codeBlock.js';
export async function getBlocks(req, res) {
  try {
    const codeblocks = await codeBlock.find();
    res.json(codeblocks);
  } catch (error) {
    console.error('Error retrieving codeblocks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
export async function getBlockById(req, res) {
  try {
    const { id } = req.params;
    const codeblock = await codeBlock.findById(id);
    if (!codeblock) {
      return res.status(404).json({ error: 'Code block not found' });
    }
    res.json(codeblock);
  } catch (error) {
    console.error('Error retrieving code block:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


