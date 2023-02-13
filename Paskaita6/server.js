import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './User.js';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  () => {
    console.log('connected to MongoDB');
  },
  (e) => {
    console.log(e);
  }
);

async function getUsersWhere() {
  const users = await User.where('age').lt(40).sort({ age: -1, name: 1, createdAt: 1 }).limit(2).skip(4);

  console.log(users);
}

async function getUsers() {
  try {
    // const users = await User.find({ name: 'Tadas', age: 26, createdAt: new Date('2000-10-04') }, { name: true, age: true });
    // const users = await User.count();
    const user = await User.findOne({ 'address.number': 6 });
    console.log(user);
  } catch (err) {
    console.log(err.message);
  }
}

// { $set: { age: 21 } }
async function updateUsers() {
  // const user = await User.updateOne(
  //   { name: 'Marius' },
  //   {
  //     $set: {
  //       name: 'Andrius',
  //       age: 40,
  //     },
  //   }
  // );
  // const users = await User.updateMany(
  //   { age: 26 },
  //   {
  //     address: {
  //       street: 'Kauno',
  //       number: '7B',
  //     },
  //   }
  // );

  const users = await User.updateMany({}, { age: undefined });
  console.log(users);
}

updateUsers();

async function deleteUsers() {
  // const users = await User.findByIdAndDelete('63e51e3fa3f37087022a2aaa');
  const users = await User.deleteMany({
    name: 'Tadas',
  });

  console.log(users);
}

async function createUser() {
  // const user = new User({
  //   name: 'Marius',
  //   age: 26,
  // });
  // user.save();
  try {
    const user = await User.create({
      name: 'Marius',
      age: 26,
      hobbies: ['Bowling', 'jogging'],
      address: {
        street: 'Vilniaus gatve',
        number: 6,
      },
      createdAt: new Date('2000-10-04'),
    });

    user.createdAt = new Date('2005-03-03');
    user.save();

    console.log(user);
  } catch (err) {
    console.error(err.message);
  }
}
