/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Save, Trash2,  } from "lucide-react";
import { useRouter,  } from "next/navigation";
import toast from "react-hot-toast";

export default function MCQQuestionManagement() {
  const router = useRouter();


  // Exam ID URL থেকে নেওয়া হবে
  // Example: /MCQQuestionManagement?examId=1


  const [questions, setQuestions] = useState([]);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
 const [setcode, setSetcode] = useState("");
const [sets, setSets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
const [exams, setExams] = useState([]);
const [selectedExam, setSelectedExam] = useState("");
  // =========================
  // LOAD QUESTIONS
  // =========================


useEffect(() => {
  const loadExams = async () => {
    try {
      const res = await fetch(
        "https://my-school-backend-iota.vercel.app/api/mcq-questions/getmcqexam"
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


  const loadQuestions = async () => {
try {
setLoadingQuestions(true);

const res = await fetch(
  `https://my-school-backend-iota.vercel.app/api/mcq-questions/getquction?examId=${selectedExam}`
);

const data = await res.json();

if (data.success) {
  const allQuestions = data.data || [];

  // সব question state এ রাখো
  setQuestions(allQuestions);

  // এই exam-এর unique set বের করো
  const uniqueSets = [
    ...new Set(
      allQuestions
        .map((item) => item.setName)
        .filter(Boolean)
    ),
  ];

  setSets(uniqueSets);
}

} catch (error) {
console.error("Load questions error:", error);
} finally {
setLoadingQuestions(false);
}
};

  useEffect(() => {
  setSetcode("");
  setSets([]);

  if (selectedExam) {
    loadQuestions();
  } else {
    setQuestions([]);
    setLoadingQuestions(false);
  }
}, [selectedExam]);

  // =========================
  // OPTION CHANGE
  // =========================

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];

    updatedOptions[index] = value;

    setOptions(updatedOptions);
  };

  // =========================
  // ADD QUESTION
  // =========================

  const addQuestion = async () => {
    if (!selectedExam) {
      alert("Exam ID is missing");
      return;
    }

    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    if (options.some((option) => !option.trim())) {
      alert("Please fill all options");
      return;
    }

    if (!correctAnswer) {
      alert("Please select the correct answer");
      return;
    }

    try {
      setLoading(true);

      const nextQuestionNumber =
        questions.length + 1;

      const res = await fetch(
        "https://my-school-backend-iota.vercel.app/api/mcq-questions/postquction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            examId: Number(selectedExam),

            setName: "A",

            questionNumber: nextQuestionNumber,

            question,

            optionA: options[0],
            optionB: options[1],
            optionC: options[2],
            optionD: options[3],

            correctAnswer,

            marks: 1,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add question");
        return;
      }


      setQuestions((prev) => [
        ...prev,
        data.data,
      ]);

      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setSetcode("")

      alert("Question added successfully!");
    } catch (error) {
      console.error("Add question error:", error);

      alert("Server error");
    } finally {
      setLoading(false);
    }
  };
const filteredQuestions = setcode
  ? questions.filter((item) => item.setName === setcode)
  : questions;

  const deleteQuestion = async (id) => {
    try {
      const res = await fetch(
        `https://my-school-backend-iota.vercel.app/api/mcq-questions/deletquction/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      setQuestions((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);

      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
  <div className="mx-auto max-w-360 mt-20 px-4 py-8 md:px-6">

    {/* ================= HEADER ================= */}
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          MCQ Question Management
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500">
          Create, edit and manage multiple choice questions for your exams.
        </p>
      </div>

      <button
        onClick={() => router.back()}
        className="group flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
      >
        <ArrowLeft
          size={17}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Back
      </button>
    </div>

    {/* ================= SELECT EXAM ================= */}
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Exam Selection
        </h2>
      </div>
      <div className="p-5">
        <label className="mb-2.5 block text-sm font-semibold text-slate-700">
          Select MCQ Exam
        </label>
        <div className="relative">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 pr-10 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Select an exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.examName} — {exam.subject} - class={exam.className}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {!selectedExam && (
          <p className="mt-2.5 text-xs text-amber-600">
            Please select an exam before adding questions.
          </p>
        )}
      </div>
    </div>

    {/* ================= CREATE QUESTION ================= */}
    <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/80 to-white px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/25">
          <Plus size={18} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Add New Question
          </h2>
          <p className="text-xs text-slate-500">
            Fill in the question, options and correct answer
          </p>
        </div>
      </div>

      <div className="p-5 md:p-6">
        {/* QUESTION */}
        <div className="mb-6">
          <label className="mb-2.5 block text-sm font-semibold text-slate-700">
            Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your MCQ question..."
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {/* OPTIONS */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-semibold text-slate-700">
            Options
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              return (
                <div key={index} className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600 transition group-focus-within:bg-blue-100 group-focus-within:text-blue-700">
                      {letter}
                    </span>
                    Option {letter}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, e.target.value)
                    }
                    placeholder={`Enter option ${letter}`}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              );
            })}
          </div>
        </div>


        <div className="mb-6">
  <label className="mb-2.5 block text-sm font-semibold text-slate-700">
    Select Set Code
  </label>

<select
value={setcode}
onChange={(e) => setSetcode(e.target.value)}
disabled={!selectedExam}
className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-50"

>


<option value="">



  {selectedExam
    ? "Select Set Code"
    : "First select an exam"}
</option>

{sets.map((set) => (
  <option key={set} value={set}>
    Set {set}
  </option>
))}


  </select>
</div>


        {/* CORRECT ANSWER */}
        <div className="mb-6">
          <label className="mb-2.5 block text-sm font-semibold text-slate-700">
            Correct Answer
          </label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          >
            <option value="">Select correct answer</option>
            {options.map((option, index) => {
              const letter = String.fromCharCode(65 + index);
              return (
                <option key={index} value={letter}>
                  Option {letter}
                  {option ? ` — ${option}` : ""}
                </option>
              );
            })}
          </select>
        </div>
       

        {/* ADD BUTTON */}
        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            onClick={addQuestion}
            disabled={loading || !selectedExam}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-md"
          >
            <Plus size={18} />
            {loading ? "Adding..." : "Add Question"}
          </button>
        </div>
      </div>
    </div>

    {/* ================= QUESTIONS LIST ================= */}
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
      <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Questions
          </h2>
          <p className="text-xs text-slate-500">
            All questions under selected exam
          </p>
        </div>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-600/10">
          {questions.length}{" "}
          {questions.length === 1 ? "Question" : "Questions"}
        </span>
      </div>

      <div className="p-5 md:p-6">
        {loadingQuestions ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-3 h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />
            <p className="text-sm font-medium text-slate-500">
              Loading questions...
            </p>
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Plus size={22} />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              No questions yet
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Select an exam and add your first question above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((item, index) => {
              const itemOptions = [
                item.optionA,
                item.optionB,
                item.optionC,
                item.optionD,
              ];

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md hover:shadow-slate-200/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-4 flex gap-3">
                        <span className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                          {item.questionNumber || index + 1}
                        </span>
                        <h3 className="pt-1 text-[15px] font-semibold leading-snug text-slate-900">
                          {item.question}
                        </h3>
                      </div>

                      <div className="grid gap-2.5 pl-11 md:grid-cols-2">
                        {itemOptions.map((option, optionIndex) => {
                          const letter = String.fromCharCode(
                            65 + optionIndex
                          );
                          const isCorrect =
                            letter === item.correctAnswer;

                          return (
                            <div
                              key={optionIndex}
                              className={`flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm transition ${
                                isCorrect
                                  ? "border-emerald-200 bg-emerald-50/80 text-emerald-900"
                                  : "border-slate-100 bg-slate-50 text-slate-700"
                              }`}
                            >
                              <span
                                className={`mt-0.5 flex h-5 w-5 min-w-5 items-center justify-center rounded-md text-[11px] font-bold ${
                                  isCorrect
                                    ? "bg-emerald-500 text-white"
                                    : "bg-slate-200 text-slate-600"
                                }`}
                              >
                                {letter}
                              </span>
                              <span className="leading-snug">
                                {option}
                                {isCorrect && (
                                  <span className="ml-2 inline-flex items-center rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                                    Correct
                                  </span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      onClick={() => deleteQuestion(item.id)}
                      className="rounded-xl p-2.5 text-slate-400 opacity-60 transition-all hover:bg-red-50 hover:text-red-500 hover:opacity-100 group-hover:opacity-100"
                      title="Delete question"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>

    {/* ================= SAVE ================= */}
    {questions.length > 0 && (
      <div className="mt-6 flex justify-end">
        <button
          onClick={() =>
            alert("All questions are already saved in database.")
          }
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/25 transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30 active:translate-y-0"
        >
          <Save size={18} />
          Save All Questions
        </button>
      </div>
    )}
  </div>
</div>
  );
}


