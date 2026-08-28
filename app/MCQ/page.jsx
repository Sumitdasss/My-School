/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState } from "react";
import { ArrowLeft, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";


export default function MCQExamCreatePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
   examCode: "",
  examName: "",
  subject: "",
  className: "",
  section: "",
  totalMarks: "",
  duration: "",
  examDate: "",
  });

  const [questions, setQuestions] = useState([]);

  const [questionForm, setQuestionForm] = useState({
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  setName: "",
  correctAnswer: "",
  marks: 1,
});


const [exams, setExams] = useState([]);
useEffect(() => {
  const loadExams = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/mcq-questions/getmcqexam"
      );

      const data = await res.json();

      console.log("Exam API:", data);

      if (data.success) {
        setExams(data.data);
      }
    } catch (error) {
      console.error("Load exams error:", error);
    }
  };

  loadExams();
}, []);
  // =========================
  // Exam input change
  // =========================

  const handleExamChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Question input change
  // =========================

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;

    setQuestionForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Add Question
  // =========================

  const addQuestion = () => {
    if (!questionForm.question.trim()) {
      toast.error("Question লিখুন");
      return;
    }

    if (!questionForm.optionA.trim()) {
      toast.error("Option A লিখুন");
      return;
    }

    if (!questionForm.optionB.trim()) {
      toast.error("Option B লিখুন");
      return;
    }

    if (!questionForm.optionC.trim()) {
      toast.error("Option C লিখুন");
      return;
    }

    if (!questionForm.optionD.trim()) {
      toast.error("Option D লিখুন");
      return;
    }

    if (!questionForm.correctAnswer) {
      toast.error("Correct answer select করুন");
      return;
    }

   const newQuestion = {
  id: Date.now(),

  question: questionForm.question,

  optionA: questionForm.optionA,

  optionB: questionForm.optionB,

  optionC: questionForm.optionC,

  optionD: questionForm.optionD,

  setName: questionForm.setName,

  correctAnswer: questionForm.correctAnswer,

  marks: Number(questionForm.marks),
};

    setQuestions((prev) => [
      ...prev,
      newQuestion,
    ]);

   setQuestionForm({
  question: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  setName: "",
  correctAnswer: "",
  marks: 1,
});
    toast.success("Question added");
  };

  // =========================
  // Delete Question
  // =========================

  const deleteQuestion = (id) => {
    setQuestions((prev) =>
      prev.filter(
        (question) => question.id !== id
      )
    );
  };

  // =========================
  // Create Exam
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.examName.trim()) {
      toast.error("Exam name required");
      return;
    }

    if (!form.subject.trim()) {
      toast.error("Subject required");
      return;
    }

    if (!form.className) {
      toast.error("Class select করুন");
      return;
    }
if (!form.examCode.trim()) {
  toast.error("Exam code required");
  return;
}
    if (!form.totalMarks) {
      toast.error("Total marks required");
      return;
    }

    if (!form.duration) {
      toast.error("Duration required");
      return;
    }

    if (questions.length === 0) {
      toast.error("কমপক্ষে একটি question add করুন");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `https://my-school-backend-iota.vercel.app/api/ALLMCQEXAM/Addmcq`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
       examCode: form.examCode.trim(),

  examName: form.examName,
  subject: form.subject,
  className: form.className,
  section: form.section || null,

  totalMarks: Number(form.totalMarks),

  duration: Number(form.duration),

  examDate: form.examDate || null,

  questions: questions.map((question) => ({
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,

    correctAnswer: question.correctAnswer,

    // এখানে SET নয়
    setName: question.setName,

    marks: Number(question.marks),
  })),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create exam"
        );
      }

      toast.success(
        "MCQ Exam created successfully"
      );

    
    } catch (error) {
      console.error(
        "CREATE EXAM ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };
const [classes, setClasses] = useState([]);
const [sections, setSections] = useState([]);
const getFilters = async () => {
  const res = await fetch("https://my-school-backend-iota.vercel.app/api/Student/allStudent-filter");
  const data = await res.json();

  setClasses(data.classes);
  setSections(data.sections);
};

useEffect(() => {
  getFilters();
}, []);


  return (
    <div className="min-h-screen bg-slate-50 p-4 mt-20 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            Header
        ========================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

{/* Left Side */}

  <div>
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
    >
      <ArrowLeft size={18} />
      Back
    </button>


<h1 className="text-3xl font-bold text-slate-900">
  Create MCQ Exam
</h1>

<p className="mt-1 text-sm text-slate-500">
  Create an exam and add MCQ questions.
</p>


  </div>

{/* Right Side Edit Button */}
<a
  type="button"
  href={`/MCQ/Edit`}
  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
>
  <Pencil size={17} />
  Edit
</a>
</div>


        <form onSubmit={handleSubmit}>

          {/* =========================
              Exam Information
          ========================= */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Exam Information
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

             <Input
    label="Exam Code"
    name="examCode"
    value={form.examCode}
    onChange={handleExamChange}
    placeholder="Example: MATH-HY-2026"
  />

  <Input
    label="Exam Name"
    name="examName"
    value={form.examName}
    onChange={handleExamChange}
    placeholder="Example: Half Yearly MCQ Exam"
  />

  <Input
    label="Subject"
    name="subject"
    value={form.subject}
    onChange={handleExamChange}
    placeholder="Example: Mathematics"
  />
            

              {/* Class */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Class
                </label>

                <select
                  name="className"
                  value={form.className}
                  onChange={handleExamChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                >
                  <option value="">
                    Select Class
                  </option>

                  {classes.map((item) => (
            <option key={item.class1} value={item.class1}>
              Class {item.class1}
            </option>
          ))}
                </select>
              </div>

              {/* Section */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Section
                </label>

                <select
                  name="section"
                  value={form.section}
                  onChange={handleExamChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                >
                  <option value="">
                    Select Section
                  </option>

                {sections.map((item) => (
            <option key={item.section} value={item.section}>
              Section {item.section}
            </option>
          ))}
                </select>
              </div>

              <Input
                label="Total Marks"
                name="totalMarks"
                type="number"
                value={form.totalMarks}
                onChange={handleExamChange}
                placeholder="50"
              />

              <Input
                label="Duration (Minutes)"
                name="duration"
                type="number"
                value={form.duration}
                onChange={handleExamChange}
                placeholder="60"
              />

              <Input
                label="Exam Date"
                name="examDate"
                type="date"
                value={form.examDate}
                onChange={handleExamChange}
              />
            </div>
          </div>

          {/* =========================
              Add Question
          ========================= */}

          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add Questions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add question, options and correct answer.
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600">
                {questions.length} Questions
              </div>
            </div>

            {/* Question */}

            <div className="mb-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Question
              </label>

              <textarea
                name="question"
                value={
                  questionForm.question
                }
                onChange={
                  handleQuestionChange
                }
                rows={4}
                placeholder="Write your question..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />




              <Input
  label="SET"
  name="setName"
  value={questionForm.setName}
  onChange={handleQuestionChange}
  placeholder="Select Your Question Set"
/>
            </div>

            {/* Options */}

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">





              <Input
                label="Option A"
                name="optionA"
                value={
                  questionForm.optionA
                }
                onChange={
                  handleQuestionChange
                }
                placeholder="Option A"
              />

              <Input
                label="Option B"
                name="optionB"
                value={
                  questionForm.optionB
                }
                onChange={
                  handleQuestionChange
                }
                placeholder="Option B"
              />

              <Input
                label="Option C"
                name="optionC"
                value={
                  questionForm.optionC
                }
                onChange={
                  handleQuestionChange
                }
                placeholder="Option C"
              />

              <Input
                label="Option D"
                name="optionD"
                value={
                  questionForm.optionD
                }
                onChange={
                  handleQuestionChange
                }
                placeholder="Option D"
              />

              {/* Correct Answer */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Correct Answer
                </label>

                <select
                  name="correctAnswer"
                  value={
                    questionForm.correctAnswer
                  }
                  onChange={
                    handleQuestionChange
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                >
                  <option value="">
                    Select Correct Answer
                  </option>

                  <option value="A">
                    A
                  </option>

                  <option value="B">
                    B
                  </option>

                  <option value="C">
                    C
                  </option>

                  <option value="D">
                    D
                  </option>
                </select>
              </div>

              <Input
                label="Marks"
                name="marks"
                type="number"
                min="1"
                value={
                  questionForm.marks
                }
                onChange={
                  handleQuestionChange
                }
              />
            </div>

            {/* Add button */}

            <button
              type="button"
              onClick={addQuestion}
              className="mt-6 flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={18} />
              Add Question
            </button>
          </div>

          {/* =========================
              Question List
          ========================= */}

          {questions.length > 0 && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <h2 className="mb-5 text-xl font-bold text-slate-900">
                Questions
              </h2>

              <div className="space-y-4">

                {questions.map(
                  (question, index) => (
                    <div
                      key={question.id}
                      className="rounded-xl border border-slate-200 p-5"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex-1">

                          {/* Question title */}

                          <div className="mb-4 flex gap-3">

                            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                              {index + 1}
                            </div>

                            <p className="font-semibold leading-6 text-slate-900">
                              {question.question}
                            </p>
                          </div>

                          {/* Options */}

                          <div className="grid grid-cols-1 gap-3 pl-11 md:grid-cols-2">

                            <QuestionOption
                              label="A"
                              value={
                                question.optionA
                              }
                              correct={
                                question.correctAnswer ===
                                "A"
                              }
                            />

                            <QuestionOption
                              label="B"
                              value={
                                question.optionB
                              }
                              correct={
                                question.correctAnswer ===
                                "B"
                              }
                            />

                            <QuestionOption
                              label="C"
                              value={
                                question.optionC
                              }
                              correct={
                                question.correctAnswer ===
                                "C"
                              }
                            />

                            <QuestionOption
                              label="D"
                              value={
                                question.optionD
                              }
                              correct={
                                question.correctAnswer ===
                                "D"
                              }
                            />
                          </div>

                          <p className="mt-4 pl-11 text-sm font-semibold text-slate-500">
                            Marks:{" "}
                            {question.marks}
                          </p>
                        </div>

                        {/* Delete */}

                        <button
                          type="button"
                          onClick={() =>
                            deleteQuestion(
                              question.id
                            )
                          }
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={19} />
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* =========================
              Submit
          ========================= */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />

              {loading
                ? "Creating Exam..."
                : "Create MCQ Exam"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// =====================================================
// INPUT COMPONENT
// =====================================================

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  min,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        min={min}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}


// =====================================================
// QUESTION OPTION
// =====================================================

function QuestionOption({
  label,
  value,
  correct,
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        correct
          ? "border-green-300 bg-green-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span className="mr-2 font-bold text-slate-900">
        {label}.
      </span>

      <span className="text-sm text-slate-700">
        {value}
      </span>

      {correct && (
        <span className="ml-2 text-xs font-bold text-green-600">
          ✓ Correct
        </span>
      )}
    </div>
  );
}