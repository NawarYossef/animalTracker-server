const mongoose = require("mongoose");

const AnimalSchema = mongoose.Schema({
  img: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  bread: {
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
    img: this.img,
    name: this.name,
    class: this.class,
    species: this.species,
    bread: this.bread,
    dateReceived: this.dateReceived,
    age: this.age
  };
};

const Animal = mongoose.model("Animal", AnimalSchema);
module.exports = { Animal };
