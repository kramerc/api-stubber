import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

app.all(/.*/, (req, res) => {
  let stub = req.body._mock || req.query._mock;
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

export function start(port = 3000) {
  app.listen(port, () => {
    console.log(`api-stubber listening on port ${port}...`);
  });
}

export default app;
