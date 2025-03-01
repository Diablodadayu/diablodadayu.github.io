import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const filePath = path.join(process.cwd(), 'public', 'message.txt');

    fs.appendFile(filePath, text + '\n', (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write to file.' });
      }
      res.status(200).json({ message: 'Message submitted successfully.' });
    });
  } else {
    res.status(405).json({ error: `${req.method} Method Not Allowed.` });
  }
}
