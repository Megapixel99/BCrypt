var express = require("express");
var passport = require("passport");
var path = require("path");

var User = require("./models/user");
var router = express.Router();

var sports = require('./sportsModule');
sports('andrewyates', 'T4pQsEYsxXop');

//function ensureAuthenticated(req, res, next) {
//  if (req.isAuthenticated()) {
//    next();
//  } else {
//    req.flash("info", "You must be logged in to see this page.");
//    res.redirect("/login");
//  }
//}

router.use(function(req, res, next) {
  res.locals.currentUserjy = req.user;
  res.locals.errors = req.flash("error");
  res.locals.infos = req.flash("info");
  next();
});






router.get("/successroot", function(req, res) {
console.log("get successroot");
	res.json({redirect:"/"});
});

router.get("/failroot", function(req, res) {
console.log("get failroot");
	res.json({redirect:"/login"});
});

router.get("/successsignup", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});

router.get("/failsignup", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});
});

router.get("/successlogin", function(req, res) {
console.log("get successsignup");
	res.json({redirect:"/session"});
});
router.get("/faillogin", function(req, res) {
console.log("get failsignup");
	res.json({redirect:"/login"});

});



router.get("/", function(req, res, next) {
console.log("get root");
	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

 // User.find()
 // .sort({ createdAt: "descending" })
 // .exec(function(err, users) {
 //   if (err) { return next(err); }
 //   res.render("index", { users: users });
 // });
});


router.get("/signup", function(req, res) {
console.log("get signup");

	let thePath = path.resolve(__dirname,"public/views/signup.html");
	res.sendFile(thePath);

});

router.get("/login", function(req, res) {
console.log("get login");

	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);

});


router.get("/session", function(req, res) {
  console.log("get session");
  if (req.isAuthenticated()) {
	let thePath = path.resolve(__dirname,"public/views/session.html");
	res.sendFile(thePath);
  } else {
  	let thePath = path.resolve(__dirname,"public/views/login.html");
	res.sendFile(thePath);
  }
});

router.get("/userInfo",function(req,res){
     if (req.isAuthenticated()) {
		res.json({username:req.user.username});
	}
	else {
		res.json(null);
	}
});




router.get("/logout", function(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect("/successroot");
  } else {
    res.redirect("/failroot");
  }
});

router.post("/save", function(req, res, next) {
console.log("post save");

  var ident = req.body.ident;
       var update = {$add : { teams: ident }};
       User.findOneAndUpdate(conditions, update, function (err)
       {
         console.log("updated: " + term + ", for user " + userIP + "");
           if (err)
           {
             console.error(err);
           }
       });
  });

router.post("/signup", function(req, res, next) {
console.log("post signup");

  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function(err, user) {

    if (err) { return next(err); }
    if (user) {
      req.flash("error", "User already exists");
      return res.redirect("/failsignup");
    }
console.log("post signup1");

    var newUser = new User({
      username: username,
      password: password,
    });
console.log("post signup2");

    newUser.save(next);    //this line has to be called.
console.log("post signup done");

  });

router.post("/addteam", function(req, res, next) {

  var team;
   team.push(req.body.ident);

  var newUser = new User({
    username: username,
    password: password,
    teams: team
  });
});

}, passport.authenticate("login", {
  successRedirect: "/successsignup",
  failureRedirect: "/failsignup",
  failureFlash: true
}));




router.post("/login", passport.authenticate("login", {
  successRedirect: "/successlogin",
  failureRedirect: "/faillogin",
  failureFlash: true
}));
////////////////////////////////////

router.get("/session/nba", function(req, res, next) {
	sports.NBA.getActivePlayers( function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
//console.log(result[0].stats.GamesPlayed['#text']);
		res.json({"info":obj});
	});
});

router.get("/session/nba/stats", function(req, res, next) {
	sports.NBA.getPlayerStats( function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
//console.log(result[0].stats.GamesPlayed['#text']);
		res.json({"info":obj});
	});
});

router.get("/session/nba/teams", function(req, res, next) {
	sports.NBA.getTeams( function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
//console.log(result[0].stats.GamesPlayed['#text']);
		res.json({"info":obj});
	});
});
////////////////////////////////////

router.get("/session/nba/:name", function(req, res, next) {
	sports.NBA.getPlayer(req.params.name, function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
console.log(result);

		res.json({"info":obj});
	});
});

router.get("/session/nba/team/:name", function(req, res, next) {
	sports.NBA.getTeam(req.params.name, function (err, obj) {
    		if (err) {
        		return console.log('Error occurred active_players: ' + err);
    		}
var result = JSON.stringify(obj);
console.log(result);

//console.log(obj[0].player);

//console.log(obj[0].stats.GamesPlayed['#text']);
		res.json({"info":obj});
	});
});

////////////////////////////////////
router.post("/session/mongo/", function(req, res, next) {

	});


////////////////////////////////////

router.use(function(req,res,next) {
	next();
});

router.use(function(req,res) {
	res.statusCode = 404;
	res.end("404!");
});

module.exports = router;
