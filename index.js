require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8000;

// connection mongodb

mongoose
.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB Connected'))
.catch((err) => {
    console.error('MongoDB Connection Error: ', err);
});

// Person Schema
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
});

// Person Model
const Person = mongoose.model('Person', personSchema);

// Creating a Person
const person = new Person({
name: 'John',
    age: 37,
    favoriteFoods: ['Pizza', 'Burger']
});

person
.save()
.then(() => console.log('Person Created'))
.catch((err) => console.error(err));

// Creating Array of People
const arrayOfPeople = [
    {name:'ANTMAN', age:'24', favoriteFoods:['philadelphia', 'burger']},
    {name:'Tamsir', age:'25', favoriteFoods:['croissant', 'tacos']},
    {name:'P2A', age:'23', favoriteFoods:['Mafe', 'thiere']}
];

Person
.insertMany(arrayOfPeople)
.then(() => console.log('Array of People Created'))
.catch((err) => console.error(err));

// Getting All People
Person
.find({})
.then((people) => console.log('All People: ', people))
.catch((err) => console.error(err));

// Trouver avec find one 
Person
.find({favoriteFoods: 'burger'})
.then((people)=> console.log('person avec favfood burger: ', people))
.catch((err)=> console.error(err));

// Trouver avec les id 
 Person
.findById('674db954ce8fa44bc61c719e')
.then((person) => {
    person.favoriteFoods.push('burger');
    person
    .save()
    .then(() => console.log('Favorite Food Updated'))
    .catch((err) => console.error(err));
})
.catch((err) => console.error(err));

// Find by Name and Update AGe
Person
.findOneAndUpdate({name: 'ANTMAN'}, {age: 20}, {new: true})
.then((person) => console.log('Person Updated: ', person))
.catch((err) => console.error(err));

// Delete by ID
Person
.findByIdAndDelete('id')
.then(() => console.log('Person Deleted'))
.catch((err) => console.error(err));

// Delete by Name
Person
.deleteOne({name: 'name'})
.then(() => console.log('Person Deleted'))
.catch((err) => console.error(err));

// Find People who like Burger
Person
.find({favoriteFoods: 'Burger'})
.sort({name: 'tamsir'})
.limit(2)
.select()
.exec()
.then((people) => console.log('People who like Burger: ', people))
.catch((err) => console.error(err));

// Port Confg

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});