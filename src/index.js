import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import parseArgs from 'minimist';

const argv = parseArgs(process.argv.slice(2));

const app = express();
const port = argv.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.all(/.*/, (req, res) => {
  let stub = req.body._stub || req.query._stub;
  let headers = req.body._headers || req.query._headers;
  let status = parseInt(req.body._status || req.query._status, 10);

  if (headers) {
    res.set(headers);
  }

  if (status) {
    res.status(status);
  }

  res.send(stub);
});

app.listen(port, () => {
  console.log(`api-stubber listening on port ${port}...`);
});
