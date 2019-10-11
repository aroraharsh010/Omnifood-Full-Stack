const mongoose = require("mongoose");
const validator = require("validator");
const {mongodbPassword}=require("../utils/config");
const DB =
  "mongodb+srv://myadmin:"+mongodbPassword+"@cluster0-zu20j.mongodb.net/test?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(conn => {
    // console.log(conn);
    console.log("Connected to DB!");
  });

//schema=>Set Of Rules
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isAlpha
  },
  price: { type: Number, default: 45 },
  description: { type: String, default: "Cool Plan" },
  ratingsAverage: {
    type: Number,
    required: true,
    validate: function validator() {
      if (this.ratingsAverage <= this.totalRating) return true;
      else return false;
    },
    message: "Average Rating can't be more than total rating"
  },
  duration: {
    type: Number,
    required: true
  },
  type: { type: String, required: true },
  totalRating: { type: Number, required: true }
});
//model

const PlanModel = mongoose.model("PlanModel", planSchema);
//record
module.exports = PlanModel;

// Another way to add data -:
// const demoplan = new PlanModel({
//   name: "Premium"
// });
// demoplan
//   .save()
//   .then(d => {
//     console.log(d);
//   })
//   .catch(err => {
//     console.log(err);
//   });
