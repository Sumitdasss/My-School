import {
  pgTable,
  serial,
  varchar,
  text,
    integer,
  timestamp,
  boolean,
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

  studentId: integer("student_id")
    .notNull()
    .references(() => Students.id),

  loginAt: timestamp("login_at")
    .defaultNow()
    .notNull(),
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