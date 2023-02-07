import express from 'express';
import cors from 'cors';

const people = [
  { name: 'Petras', surname: 'Slekys' },
  { name: 'Jonas', surname: 'Kazlauskas' },
];

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json(people);
});

app.post('/', (req, res) => {
  const { name, surname } = req.body;

  const person = {
    name,
    surname,
  };

  people.push(person);

  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
