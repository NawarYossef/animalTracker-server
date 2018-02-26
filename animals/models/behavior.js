const mongoose = require("mongoose");

const BehaviorSchema = mongoose.Schema({
  entry: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

BehaviorSchema.methods.serialize = function() {
  return {
    id: this._id,
    entry: this.entry,
    date: this.date
  };
};

const Behavior = mongoose.model("Behavior", BehaviorSchema);
module.exports = { Behavior };