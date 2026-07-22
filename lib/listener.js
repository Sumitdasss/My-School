import emitter from "./events";

emitter.on("student-login", (student) => {
  console.log(`${student.fullName} Login Success`);
});
