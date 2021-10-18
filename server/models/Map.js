const { Schema, model } = require("mongoose");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;

const mapSchema = new Schema(
  {
    title: String,
    lat: Number,
    lng: Number,
    speed: Number,
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", function (next) {
//   const user = this;

//   if (!user.isModified("password")) return next();
//   if(user.password == user.retypepassword){

//     bcrypt.hash(user.password, saltRounds, function (err, hashpassword) {
//       if (err) return next(err);
//       user.password = hashpassword;
//       user.retypepassword = hashpassword;
//       next()
//     });
//   }

// });

// userSchema.methods.validatePassword = function (password, cb) {
//   bcrypt.compare(password, this.password, (err, isMatchPassword) => {
//     if (err) return cb(err);

//     cb(null, isMatchPassword);
//   });
// };

module.exports = model("Map", mapSchema);
