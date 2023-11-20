const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Replace '<YOUR_MONGODB_URI>' with your MongoDB Atlas connection string
const MONGO_URI = 'mongodb+srv://dyanixdhawale:dyanix@cluster0.ncw1ybr.mongodb.net/';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const LogSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: String,
  timestamp: String,
  traceId: String,
  spanId: String,
  commit: String,
  metadata: {
    parentResourceId: String,
  },
});

const Log = mongoose.model('Log', LogSchema);

app.post('/ingest', async (req, res) => {
  const logData = req.body;

  try {
    const log = new Log(logData);
    await log.save();
    console.log('Log ingested:', logData);
    res.send('Log ingested successfully');
  } catch (error) {
    console.error('Error ingesting log:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Search route
app.post('/search', async (req, res) => {
  const searchParams = req.body;

  try {
    const logs = await Log.find(searchParams);
    res.json(logs);
  } catch (error) {
    console.error('Error searching logs:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Log Ingestor listening at http://localhost:${port}`);
});
