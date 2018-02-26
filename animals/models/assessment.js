const mongoose = require("mongoose");

const AssessmentSchema = mongoose.Schema({
  attitude: {
    type: String,
    required: false
  },
  hydration: {
    type: String,
    required: true
  },
  coatAndSkin: {
    type: String,
    required: true
  },
  eyes: {
    type: String,
    required: false
  },
  ears: {
    type: String,
    required: false
  },
  noseAndThroat: {
    type: String,
    required: false
  },
  legsAndPaws: {
    type: String,
    required: false
  },
  weight: {
    type: Number,
    required: true
  },
  treatmentAndRecommendations: {
    type: String,
    required: true
  },
});

AssessmentSchema.methods.serialize = function() {
  return {
    id: this._id,
    attitude: this.attitude,
    hydration: this.hydration,
    coatAndSkin: this.coatAndSkin,
    eyes: this.eyes,
    ears: this.ears,
    noseAndThroat: this.noseAndThroat,
    legsAndPaws: this.legsAndPaws,
    weight: this.weight,
    treatmentAndRecommendations: this.treatmentAndRecommendations
  };
};

const Assessment = mongoose.model("Assessment", AssessmentSchema);
module.exports = { Assessment };
