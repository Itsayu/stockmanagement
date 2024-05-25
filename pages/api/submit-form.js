import db from "../../database";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = await new Promise((resolve, reject) => {
      const formDataObj = {};
      req.on('data', (chunk) => {
        const fieldName = chunk.toString().split('=')[0];
        const value = chunk.toString().split('=')[1];
        if (fieldName === 'image') {
          formDataObj[fieldName] = Buffer.from(value.split(',')[1], 'base64');
        } else {
          formDataObj[fieldName] = value;
        }
      });
      req.on('end', () => {
        resolve(formDataObj);
      });
      req.on('error', reject);
    });

    const {
      category,
      artNo,
      fabric,
      size,
      color,
      description,
      rate,
      image,
    } = formData;

    try {
      // Insert the form data into the database
      db.run(
        'INSERT INTO products (category, artNo, fabric, size, color, description, rate, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [category, artNo, fabric, size, color, description, rate, image],
        function (err) {
          if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ error: 'Failed to submit the form' });
          } else {
            res.status(200).json({ message: 'Form submitted successfully' });
          }
        }
      );
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ error: 'An error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}