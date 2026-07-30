import {
  pgTable,
  serial,
  varchar,
  text,
    integer,
  timestamp,
  boolean,
  unique ,
  date
} from "drizzle-orm/pg-core";

export const Teacher = pgTable("Teacher", {
  id: serial("id").primaryKey(),

  fullName: varchar("full_name", { length: 255 }).notNull(),

  dateOfBirth: timestamp("date_of_birth").notNull(),

  phone: varchar("phone", { length: 20 }).unique().notNull(),

  email: varchar("email", { length: 255 }).unique().notNull(),

  password: text("password").notNull(),

  photo: text("photo"),
});

export const Parent = pgTable("Parent", {
  id: serial("id").primaryKey(),

  fullName: varchar("full_name", { length: 255 }).notNull(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),

  phone: varchar("phone", { length: 20 })
    .notNull()
    .unique(),
childEmail: varchar("child_email", { length: 255 }).notNull(),
  childName: varchar("child_name", { length: 255 }).notNull(),

  childClass: varchar("child_class", { length: 50 }).notNull(),

  childRoll: varchar("child_roll", { length: 50 }).notNull(),

  password: varchar("password", { length: 255 }).notNull(),

  photo: varchar("photo", { length: 500 }),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});


// Student Table
export const Students = pgTable("Students", {

  id: serial("id").primaryKey(),

  fullName: varchar("full_name", { length: 255 }).notNull(),

  fatherName: varchar("father_name", { length: 255 }).notNull(),

  motherName: varchar("mother_name", { length: 255 }).notNull(),

  dateOfBirth: timestamp("date_of_birth").notNull(),

  phone: varchar("phone", { length: 20 })
    .notNull()
    .unique(),

    rollNumber: varchar("roll_number", { length: 50 })
  .notNull()
  .unique(),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique(),
parentId: integer("parent_id")
  .references(() => Parent.id),
  password: varchar("password", { length: 255 })
    .notNull(),

  photo: varchar("photo", { length: 500 }),


   class1: varchar("class", { length: 20 }).notNull(),      
  section: varchar("section", { length: 10 }).notNull(),


  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),

});
export const Admin = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("admin"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});
export const LoginHistory = pgTable("LoginHistory", {
  id: serial("id").primaryKey(),
  // ✅ onDelete: "cascade" যোগ করো
  studentId: integer("student_id")
    .notNull()
    .references(() => Students.id, { onDelete: "cascade" }),
  loginAt: timestamp("login_at").defaultNow().notNull(),
});
export const ParentLoginHistory = pgTable("ParentLoginHistory", {
  id: serial("id").primaryKey(),

  ParentId: integer("Parent_id")
    .notNull()
    .references(() => Parent.id),

  loginAt: timestamp("login_at")
    .defaultNow()
    .notNull(),
});
export const TeacherLoginHistory = pgTable("TeacherLoginHistory", {
  id: serial("id").primaryKey(),

  TeacherId: integer("Teacher_id")
    .notNull()
    .references(() => Teacher.id),

  loginAt: timestamp("login_at")
    .defaultNow()
    .notNull(),
});

export const Subjects = pgTable("Subjects", {
  id: serial("id").primaryKey(),
  subjectName: varchar("subjectname", { length: 100 }).notNull(),
  class1: varchar("class", { length: 20 }).notNull(),
});


export const TeacherAssignments = pgTable("TeacherAssignments", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id")
    .notNull()
    .references(() => Teacher.id, { onDelete: "cascade" }),
  subjectId: integer("subject_id")
    .notNull()
    .references(() => Subjects.id, { onDelete: "cascade" }),
  class1: varchar("class", { length: 20 }).notNull(),
  section: varchar("section", { length: 10 }).notNull(),
});


export const Exams = pgTable("Exams", {
  id: serial("id").primaryKey(),
  examName: varchar("exam_name", { length: 50 }).notNull(),
  examYear: integer("exam_year").notNull(),
  class1: varchar("class", { length: 20 }).notNull(),
  section: varchar("section", { length: 10 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});


export const Results = pgTable(
"Results",
{
 id: serial("id").primaryKey(),

 studentId: integer("student_id").notNull(),

 examId: integer("exam_id").notNull(),

 subjectId: integer("subject_id").notNull(),

 teacherId: integer("teacher_id"),

 marksObtained: integer("marks_obtained").notNull(),

 totalMarks: integer("total_marks").notNull(),

 createdAt: timestamp("created_at")
 .defaultNow(),

},
(table)=>({
 uniqueResult: unique()
 .on(
   table.studentId,
   table.examId,
   table.subjectId
 )
})
);

export const Attendance = pgTable(
  "Attendance",
  {
    id: serial("id").primaryKey(),

    studentId: integer("student_id")
      .notNull()
      .references(() => Students.id, { onDelete: "cascade" }),

    attendanceDate: date("attendance_date").notNull(),

    status: varchar("status", { length: 10 }).notNull(), // "Yes" বা "No"

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => ({
    uniqueAttendance: unique("unique_student_attendance").on(
      table.studentId,
      table.attendanceDate
    ),
  })
);

export const Notices = pgTable("notices", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  slug: varchar("slug", { length: 255 }).unique().notNull(),

  category: varchar("category", { length: 100 }).notNull(),

  date: varchar("date", { length: 100 }).notNull(),

  urgent: boolean("urgent").default(false),

  shortDescription: text("short_description"),

  description: text("description"),

  attachment: varchar("attachment", { length: 500 }),

  createdAt: timestamp("created_at").defaultNow(),
});




// =============================
// Routine Header
// =============================
export const ClassRoutine = pgTable("ClassRoutine", {
  id: serial("id").primaryKey(),

  className: varchar("class_name", { length: 20 }).notNull(),

  section: varchar("section", { length: 10 }).notNull(),

  shift: varchar("shift", { length: 20 }).notNull(),

  day: varchar("day", { length: 20 }).notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

// =============================
// Routine Period
// =============================
export const RoutinePeriod = pgTable("RoutinePeriod", {
  id: serial("id").primaryKey(),

  routineId: integer("routine_id")
    .references(() => ClassRoutine.id, {
      onDelete: "cascade",
    })
    .notNull(),

  period: integer("period").notNull(),

  startTime: varchar("start_time", { length: 20 }).notNull(),

  endTime: varchar("end_time", { length: 20 }).notNull(),

  subject: varchar("subject", { length: 100 }).notNull(),

  teacher: varchar("teacher", { length: 100 }).notNull(),

  room: varchar("room", { length: 50 }),

  createdAt: timestamp("created_at").defaultNow(),
});