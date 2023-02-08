import express from 'express';
import people from './db.js';

const router = express.Router();

router.get('/people', (req, res) => {
  res.json(people);
});

router.get('/people/emails', (req, res) => {
  const emails = people.map((person) => {
    return person.email;
  });

  res.json(emails);
});

router.get('/people/female', (req, res) => {
  const females = people.filter((person) => person.gender.toLowerCase() === 'female');

  const fullNames = females.map((person) => `${person.first_name} ${person.last_name}`);

  res.json(fullNames);
});

router.get('/people/:make', (req, res) => {
  const { make } = req.params;
  const filteredPeople = people.filter((person) => person.car === make);

  res.json(filteredPeople);
});

router.get('/people/find/:id', (req, res) => {
  const { id } = req.params;
  const person = people.find((p) => p.id === +id);

  res.json(person);
});

export default router;
