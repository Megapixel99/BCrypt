var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  teams: Array
});


var noop = function() {};

userSchema.pre("save", function(done) {
  console.log("userSchema.pre save");
  var user = this;

  if (!user.isModified("password")) {
   console.log("userSchema.pre save not modified");
   return done();
  }
  console.log("userSchema.pre bcrypt");

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

    if (err) { return done(err); }

    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
  console.log("userSchema.pre set password to hashedPassword");
      user.password = hashedPassword;
      done();
    });


  });
});

userSchema.methods.checkPassword = function(guess, done) {
    console.log("userSchema.methods.checkPassword");
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

userSchema.methods.name = function() {
  return this.displayName || this.username;
};

var User = mongoose.model("User", userSchema);

module.exports = User;
