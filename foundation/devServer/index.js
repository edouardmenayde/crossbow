import express from 'express';
import bodyParser from 'body-parser';
import graphQLHandler from '../../api/graphql/index';
import cors from 'cors';

const APP_PORT = 3000;
const app      = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});

app.post('/graphql', async (req, res) => {
  try {
    const result = await graphQLHandler(req.body.query, req.body.variables, req);

    if (result && result.errors) {
      console.error(result.errors);
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(result, null, 2));
  }
  catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.listen(APP_PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
