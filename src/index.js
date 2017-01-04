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
  if (req.method === 'GET') {
    if (!req.query._stub) {
      res.send({ error: 'No _stub object was provided in the query string' });
      return;
    }

    res.send(req.query._stub);
  } else {
    if (!req.body._stub) {
      res.send({ error: 'No _stub object was provided in the body' });
      return;
    }

    res.send(req.body._stub);
  }
});

app.listen(port, () => {
  console.log(`api-stubber listening on port ${port}...`);
});
