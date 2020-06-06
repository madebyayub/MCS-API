/* 
  Backend API initialization 
*/
var express = require("express"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  bp = require("body-parser"),
  app = express(),
  courses = require("./data/courses.json"),
  programs = require("./data/programs.json"),
  User = require("./models/User");

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/uoftplanner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongoose Database");
});

// MONGODB_URI = "mongodb+srv://admin:zdzmvse43s@cluster0-30e8d.mongodb.net/UofTPlanner?retryWrites=true&w=majority"
/*

  User MongoDB Atlas API to receive previous saved states

*/
// GET Request to receive the previous state the user last saved.
app.get("/user/:id", function (req, res) {
  User.findOne({ userID: req.params.id }, function (err, user) {
    if (err) {
      res.json({ message: "GET - Error finding the userID provided" });
    } else {
      if (user) {
        res.json(JSON.parse(user.prevState));
      } else {
        res.json({});
      }
    }
  });
});
// POST Request to save the state the user wishes to save
app.post("/user/:id", function (req, res) {
  const state = JSON.stringify(req.body.state);
  User.findOne({ userID: req.body.userID }, function (err, user) {
    if (err) {
      res.json({ reponse: "POST- Error finding the userID provided" });
    } else {
      if (!user) {
        const newUser = new User({ userID: req.body.userID, prevState: state });
        newUser.save((error) => {
          if (!error) {
            res.json({
              reponse: "Successfully saved new user with their previous state",
            });
          } else {
            res.json({ reponse: "Error saving the new user's previous state" });
          }
        });
      } else {
        user.prevState = state;
        user.userID = req.body.userID;
        user.save((error) => {
          if (!error) {
            res.json({
              reponse:
                "Successfully saved an existing user with their previous state",
            });
          } else {
            res.json({
              reponse: "Error saving the existing user's previous state",
            });
          }
        });
      }
    }
  });
});

/*

  UTM MCSS Course and Program API GET requests

*/
// GET Requests to receive all courses
app.get("/courses", function (req, res) {
  res.json(courses);
});
// GET Requests to receive all courses matching the code query
app.get("/courses/:code", function (req, res) {
  let course_results = courses.filter((course) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return course.code.match(regex);
  });
  res.json(course_results);
});
// GET Requests to receive all programs
app.get("/programs", function (req, res) {
  res.json(programs);
});
// GET Requests to receive all programs matching the program query
app.get("/programs/:program", function (req, res) {
  let program_results = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.program}`, "gi");
    return prog.program.match(regex);
  });
  res.json(program_results);
});
// GET Requests to receive all first year courses required for the program given by code query
app.get("/program/requirements/first/:code", function (req, res) {
  let program = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return prog.code.match(regex);
  });
  if (program.length === 1) {
    program = program[0];
    const year = program.requirements.first.map((course) => {
      let course_result = courses.filter((searchCourse) => {
        const regex = new RegExp(`^${course}`, "gi");
        return searchCourse.code.match(regex);
      });
      return course_result[0];
    });
    const options = program.requirements.options.first;
    res.json({ set: year, options });
  } else {
    res.json([]);
  }
});
// GET Requests to receive all second year courses required for the program given by code query
app.get("/program/requirements/second/:code", function (req, res) {
  let program = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return prog.code.match(regex);
  });
  if (program.length === 1) {
    program = program[0];
    const year = program.requirements.second.map((course) => {
      let course_result = courses.filter((searchCourse) => {
        const regex = new RegExp(`^${course}`, "gi");
        return searchCourse.code.match(regex);
      });
      return course_result[0];
    });
    const options = program.requirements.options.second;
    res.json({ set: year, options });
  } else {
    res.json([]);
  }
});
// GET Requests to receive all third year courses required for the program given by code query
app.get("/program/requirements/third/:code", function (req, res) {
  let program = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return prog.code.match(regex);
  });
  if (program.length === 1) {
    program = program[0];
    const year = program.requirements.third.map((course) => {
      let course_result = courses.filter((searchCourse) => {
        const regex = new RegExp(`^${course}`, "gi");
        return searchCourse.code.match(regex);
      });
      return course_result[0];
    });
    const options = program.requirements.options.third;
    res.json({ set: year, options });
  } else {
    res.json([]);
  }
});
// GET Requests to receive all fourth year courses required for the program given by code query
app.get("/program/requirements/fourth/:code", function (req, res) {
  let program = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return prog.code.match(regex);
  });
  if (program.length === 1) {
    program = program[0];
    const year = program.requirements.fourth.map((course) => {
      let course_result = courses.filter((searchCourse) => {
        const regex = new RegExp(`^${course}`, "gi");
        return searchCourse.code.match(regex);
      });
      return course_result[0];
    });
    const options = program.requirements.options.fourth;
    res.json({ set: year, options });
  } else {
    res.json([]);
  }
});

/*

  Server listen setup

*/
app.listen(PORT);
console.log("Backend API server listening on port " + PORT);
