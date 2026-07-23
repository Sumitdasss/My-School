import emitter from "./events";

emitter.on("student-login", (student) => {
  console.log(`${student.fullName} Login Success`);
});
emitter.on("Parent Login", (Preant) => {
  console.log(`${Preant.fullName} Login Success`);
});
emitter.on("Teacher Login", (Teacher) => {
  console.log(`Teacher ${Teacher.fullName} Login Success`);
});
