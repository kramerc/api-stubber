import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import parseArgs from 'minimist';

const argv = parseArgs(process.argv.slice(2));

const app = express();
const port = argv.port || 3000;

app.use(bodyParser.json());
app.use(morgan('combined'));

app.all(/.*/, (req, res) => {
  let sentData;

  if (req.method === 'GET') {
    if (!req.query._stub) {
      res.send({ error: 'No _stub object was provided in the query string' });
      return;
    }

    sentData = req.query;
  } else {
    if (!req.body._stub) {
      res.send({ error: 'No _stub object was provided in the body' });
      return;
    }

    sentData = req.body;
  }

  if (sentData._headers) {
    res.set(sentData._headers);
  }

  if (sentData._status) {
    res.status(sentData._status);
  }

  res.send(sentData._stub);
});

app.listen(port, () => {
  console.log(`api-stubber listening on port ${port}...`);
});
