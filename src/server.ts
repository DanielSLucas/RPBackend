import express from 'express';

const app = express();

app.get('/:name', (request, response) => {
  response.send(`Hello ${request.params.name}`);
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
