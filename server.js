// importing mongoose Java Script library
const express = require("express");
const cors = require("cors");
const path = require("path");

let app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, "./client/build")));

app.listen(1234, () => {
  console.log("Listening to Port 1234");
});

const mongoose = require("mongoose");

//conencting to Database
let connectToDB = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/Maydb");
    // Connecting to cloud Database, give Password and Database name. you can also put it in Environment Variable(.env) and access from there.
    await mongoose.connect(
      "mongodb+srv://pawanbedampet:pawan4343@cluster0.7wonqnd.mongodb.net/Batch2212?retryWrites=true&w=majority"
    );

    console.log("Connected Succesfully");
    saveData();

    // after successfully connected fetching the data from Database.
    // getDataFromMDB();
    // updateDB();
    // deleteData();
  } catch (error) {
    console.log(error);
  }
};

// Creating the Schema: means structure of object.
let userSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  age: String,
  email: String,
  gender: String,
  address: String,
  city: String,
  state: String,
  country: String,
  department: String,
  pic: String,
});

// Class User: Created a class of above Schema.
let User = new mongoose.model("users", userSchema);

app.get("/getUsers", async (req, res) => {
  let results = await User.find();
  console.log(results);
  res.json(results);
});

let saveData = async () => {
  let dhoni = new User({
    id: "1001",
    firstName: "Mahendra",
    lastName: "Dhoni",
    age: "42",
    email: "dhoni@bcci.com",
    gender: "Male",
    address: "Ranchi Street",
    city: "Ranchi",
    state: "Jharkhand",
    country: "India",
    department: "Cricket",
    pic: "https://www.espncricinfo.com/cricketers/ms-dhoni-28081",
  });

  // inserting into Database
  await User.insertMany([dhoni]);
};

// Fetching the Data
let getDataFromMDB = async () => {
  // Is like select * from table_name
  // let fetchedData = await User.find();

  // Gives number of records
  // let fetchedData = await User.find().count();

  // Gives limited number of records like 5 records
  // let fetchedData = await User.find().limit(5);

  // for selecting Distinct columns.
  // let fetchedData = await User.find().distinct("country");

  // OR statement
  // let fetchedData = await User.find()
  // .or([{ country: "Russia" }, { country: "India" }, { country: "USA" }])
  // .count();

  // select is used for seletcing particular feilds.
  // let fetchedData = await User.find().select({ firstName: 1, lastname: 1, department: 1, country:1 });

  // It's like where clause, for selecting country Russia and department Sales.
  // used for Sorting
  let fetchedData = await User.find()
    .and({
      country: "Russia",
      department: "sales",
    })
    .sort({ department: "asc" });

  console.log(fetchedData);
};

// For Updating
let updateDB = async () => {
  // Where ever the country China is there, updating with India.
  let result = await userSchema.updateMany(
    { country: "China" },
    { country: "India" }
  );
  console.log(result);
};

// For Deleting
let deleteData = async () => {
  // Where ever the country Russia is there, where age is greater than 60.
  let deleteResult = await userSchema.deleteMany({
    country: "Russia",
    age: { $gte: 60 },
  });
  console.log(deleteResult);
};

connectToDB();
