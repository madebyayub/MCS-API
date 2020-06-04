/* 
  Backend API initialization 
*/
var express = require("express"),
  cors = require("cors"),
  app = express(),
  courses = require("./data/courses.json"),
  programs = require("./data/programs.json");

app.use(cors());
app.get("/api/courses/:code", function (req, res) {
  let course_results = courses.filter((course) => {
    const regex = new RegExp(`^${req.params.code}`, "gi");
    return course.code.match(regex);
  });
  res.json(course_results);
});
app.get("/api/programs", function (req, res) {
  res.json(programs);
});
app.get("/api/programs/:program", function (req, res) {
  let program_results = programs.filter((prog) => {
    const regex = new RegExp(`^${req.params.program}`, "gi");
    return prog.program.match(regex);
  });
  res.json(program_results);
});
app.get("/api/program/requirements/first/:code", function (req, res) {
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
  }
  res.json([]);
});
app.get("/api/program/requirements/second/:code", function (req, res) {
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
  }
  res.json([]);
});
app.get("/api/program/requirements/third/:code", function (req, res) {
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
  }
  res.json([]);
});
app.get("/api/program/requirements/fourth/:code", function (req, res) {
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
  }
  res.json([]);
});

app.get("*", function (req, res) {
  res.json([]);
});

const port = process.env.PORT || 3001;
app.listen(port);

console.log("Backend API server listening on port " + port);
