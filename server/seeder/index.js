var mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Map = require("../models/Map");

mongoose.connect(process.env.DB_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Now, the interesting part:

const dirs = path.join(__dirname, `map.json`);
const files = fs.readFileSync(dirs, "utf8");
const datas = JSON.parse(files);

Map.insertMany(datas, function (err, r) {
  console.log(err, r);
});
