const mongoose = require("mongoose");

const AnimalSchema = mongoose.Schema({
  animalImg: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: false
  },
  dateReceived: {
    type: Date,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
});

AnimalSchema.methods.serialize = function() {
  return {
    id: this._id,
    animalImg: this.animalImg,
    name: this.name,
    species: this.species,
    breed: this.breed,
    dateReceived: this.dateReceived,
    age: this.age
  };
};

const Animal = mongoose.model("Animal", AnimalSchema);
module.exports = { Animal };
