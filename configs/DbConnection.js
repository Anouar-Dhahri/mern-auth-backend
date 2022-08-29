const mongoose = require('mongoose');

const dbconnect = async(req, res, next) => {
  mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=> {
    console.log("Connected Succesfully to MongoDB")
  }).catch((err)=> {
    console.log(err)
  });
};

module.exports= dbconnect;