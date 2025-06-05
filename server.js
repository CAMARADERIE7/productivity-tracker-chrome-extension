const express = require('express');
const app = express();
const TimeLog = require('./models/timelog'); // ✅ correct path

app.use(express.json());

app.post('/track', async (req, res) => {
  const { url, timeSpent } = req.body;
  try {
    await TimeLog.create({ url, timeSpent, date: new Date() });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving time log');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
