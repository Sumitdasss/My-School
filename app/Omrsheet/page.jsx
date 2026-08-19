/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */

"use client";

import { useEffect } from "react";
import { useState } from "react";

// ==========================================
// BACKEND URL
// ==========================================

// ==========================================
// CONSTANTS
// ==========================================

const OPTIONS = ["A", "B", "C", "D"];

const TOTAL_QUESTIONS = 40;

const MARKS_PER_CORRECT = 1;

const MARKS_PER_WRONG = 0;

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function OMRPage() {
  // ========================================
  // STUDENT / EXAM INFORMATION
  // ========================================

  const [examType, setExamType] = useState("অর্ধ-বার্ষিক");

  const [examCode, setExamCode] = useState("");

  const [name, setName] = useState("");

  const [roll, setRoll] = useState("");

  const [cls, setCls] = useState("");

  const [subject, setSubject] = useState("");


  // ========================================
  // ANSWERS
  // ========================================

  const [answers, setAnswers] = useState(Array(TOTAL_QUESTIONS).fill(null));

  // ========================================
  // ROLL DIGITS
  // ========================================

  const [rollDigits, setRollDigits] = useState(Array(6).fill(null));

  // ========================================
  // REGISTRATION DIGITS
  // ========================================

  const [regDigits, setRegDigits] = useState(Array(8).fill(null));

  // ========================================
  // SET
  // ========================================

  const [setCode, setSetCode] = useState(null);

  // ========================================
  // RESULT
  // ========================================

  const [result, setResult] = useState(null);

  // ========================================
  // LOADING
  // ========================================

  const [loading, setLoading] = useState(false);

  // ========================================
  // ERROR
  // ========================================

  const [error, setError] = useState("");

  // ========================================
  // COLORS
  // ========================================

  const PINK = "#d6266f";

  const PINK_SOFT = "#f7d7e4";

  // ========================================
  // HANDLE ANSWER
  // ========================================

  const handleAnswer = (qIndex, option) => {
    setAnswers((prev) => {
      const next = [...prev];

      next[qIndex] = next[qIndex] === option ? null : option;

      return next;
    });

    // Answer change করলে পুরোনো result hide হবে
    setResult(null);
    setError("");
  };

  // ========================================
  // HANDLE DIGIT
  // ========================================

  const setDigitAt = (setter, col) => (digit) => {
    setter((prev) => {
      const next = [...prev];

      next[col] = next[col] === digit ? null : digit;

      return next;
    });

    setResult(null);
  };

  // ========================================
  // CONVERT ANSWERS ARRAY -> OBJECT
  // ========================================

  const createAnswerObject = () => {
    const answerObject = {};

    answers.forEach((answer, index) => {
      answerObject[index + 1] = answer;
    });

    return answerObject;
  };

  // ========================================
  // SUBMIT OMR
  // ========================================

  const checkOMR = async () => {
    try {
      setError("");
      setResult(null);

      // ------------------------------------
      // VALIDATION
      // ------------------------------------

      if (!examCode.trim()) {
        setError("Exam Code দিন।");

        return;
      }

      if (!setCode) {
        setError("Set নির্বাচন করুন।");

        return;
      }

      // ------------------------------------
      // CREATE ANSWER OBJECT
      // ------------------------------------

      const answerObject = createAnswerObject();

      console.log("=================================");

      console.log("OMR SUBMIT DATA");

      console.log("Exam Code:", examCode);

      console.log("Set:", setCode);

      console.log("Answers:", answerObject);

      console.log("=================================");

      setLoading(true);

      // ------------------------------------
      // SEND TO BACKEND
      // ------------------------------------

      const response = await fetch(`https://my-school-backend-iota.vercel.app/api/omr/cheak`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          examCode: examCode.trim(),

          setName:setCode,

          answers: answerObject,

          // Student information-ও backend-এ পাঠানো হচ্ছে
          student: {
            name,
            roll,
            class: cls,
            subject,
            examType,

            rollDigits,

            registrationDigits: regDigits,
          },
        }),
      });

      // ------------------------------------
      // RESPONSE
      // ------------------------------------

      const data = await response.json();

      console.log("Backend Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "OMR check failed");
      }

      // ------------------------------------
      // RESULT
      // ------------------------------------

      if (!data.result) {
        throw new Error("Backend থেকে result পাওয়া যায়নি।");
      }

      setResult(data.result);
    } catch (err) {
      console.error("OMR Submit Error:", err);

      setError(err.message || "OMR check করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };



const [Examecodeee, setExamcode] = useState([]);

const getFilters = async () => {
  try {
    const res = await fetch(
      "https://my-school-backend-iota.vercel.app/api/Student/allStudent-filter"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch filters");
    }

    const data = await res.json();

    console.log("FILTER DATA:", data);

    setExamcode(data.Examcode || []);
  } catch (error) {
    console.error("GET FILTER ERROR:", error);
  }
};

useEffect(() => {
  getFilters();
}, []);


  // ========================================
  // BUBBLE COMPONENT
  // ========================================

  const Bubble = ({ selected, onClick, label, size = 22 }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: size,
        height: size,

        borderColor: selected ? PINK : "#c9c9c9",

        backgroundColor: selected ? PINK : "white",

        color: selected ? "white" : "#3a3a3a",
      }}
      className="
        rounded-full
        border-[1.5px]
        flex
        items-center
        justify-center
        text-[11px]
        font-medium
        transition-colors
        duration-100
        hover:border-[#d6266f]
      "
    >
      {label}
    </button>
  );

  // ========================================
  // PATTERN STRIP
  // ========================================

  const PatternStrip = ({ vertical = false }) => (
    <div
      className={
        vertical ? "absolute top-0 bottom-0 w-[12px]" : "w-full h-[12px]"
      }
      style={{
        backgroundImage: `repeating-linear-gradient(${
          vertical ? "180deg" : "90deg"
        }, ${PINK} 0px, ${PINK} 6px, white 6px, white 12px)`,
      }}
    />
  );

  // ========================================
  // DIGIT GRID
  // ========================================

  const DigitGrid = ({ label, digitCount, values, onDigit }) => (
    <div
      className="
        border
        rounded
        bg-white
        px-2
        pt-2
        pb-2.5
      "
      style={{
        borderColor: "#e8b8cd",
      }}
    >
      <p
        className="
          text-[11px]
          font-bold
          text-center
          mb-1.5
        "
        style={{
          color: PINK,
        }}
      >
        {label}
      </p>

      {/* Selected digits */}

      <div
        className="
          flex
          justify-center
          gap-[3px]
          mb-1.5
        "
      >
        {Array.from(
          {
            length: digitCount,
          },
          (_, c) => (
            <div
              key={c}
              className="
                w-[16px]
                h-[18px]
                border
                rounded-sm
                flex
                items-center
                justify-center
                text-[11px]
                font-semibold
              "
              style={{
                borderColor: PINK,
              }}
            >
              {values[c] !== null ? values[c] : ""}
            </div>
          ),
        )}
      </div>

      {/* Digits */}

      <div
        className="
          flex
          justify-center
          gap-[3px]
        "
      >
        {Array.from(
          {
            length: digitCount,
          },
          (_, c) => (
            <div
              key={c}
              className="
                flex
                flex-col
                gap-[3px]
              "
            >
              {Array.from({ length: 10 }, (_, r) => (
                <Bubble
                  key={r}
                  size={16}
                  label={r}
                  selected={values[c] === r}
                  onClick={() => onDigit(c)(r)}
                />
              ))}
            </div>
          ),
        )}
      </div>
    </div>
  );

  // ========================================
  // RETURN
  // ========================================

  return (
    <div
      className="
        min-h-screen
        py-4
        px-2
        flex
        flex-col
        items-center
        gap-5
      "
      style={{
        backgroundColor: "#fdf1f6",
      }}
    >
      {/* ==================================
          OMR SHEET
      ================================== */}

      <div
        className="
          relative
          bg-white
          shadow-md
          overflow-hidden
        "
        style={{
          width: "100%",
          maxWidth: "960px",
          border: `2px solid ${PINK}`,

          fontFamily:
            "SolaimanLipi, Kalpurush, 'Noto Sans Bengali', Arial, sans-serif",
        }}
      >
        <PatternStrip />

        <div className="flex">
          <PatternStrip vertical />

          <div className="flex-1 min-w-0">
            {/* ============================
                HEADER
            ============================ */}

            <div
              className="
                pt-4
                pb-2
                px-8
                text-center
              "
            >
              <h1
                className="
                  text-[26px]
                  font-bold
                  tracking-wide
                  leading-tight
                "
                style={{
                  color: PINK,
                }}
              >
              GOALKHALI IDEAL
High School
              </h1>

              {/* Exam type */}

              <div
                className="
                  flex
                  justify-center
                  items-center
                  gap-6
                  mt-2
                  text-[15px]
                  font-medium
                  text-gray-800
                "
              >
                {[
                  "অর্ধ-বার্ষিক",
                  "বার্ষিক",
                  "প্রাক-নির্বাচনী",
                  "নির্বাচনী",
                ].map((type) => (
                  <label
                    key={type}
                    className="
                        flex
                        items-center
                        gap-1.5
                        cursor-pointer
                        select-none
                      "
                    onClick={() => setExamType(type)}
                  >
                    <span
                      className="
                          w-[14px]
                          h-[14px]
                          rounded-full
                          border-2
                          inline-flex
                          items-center
                          justify-center
                        "
                      style={{
                        borderColor: PINK,

                        backgroundColor: examType === type ? PINK : "white",
                      }}
                    >
                      {examType === type && (
                        <span
                          className="
                              w-[6px]
                              h-[6px]
                              rounded-full
                              bg-white
                            "
                        />
                      )}
                    </span>

                    <span>{type}</span>
                  </label>
                ))}

                <span
                  className="
                    font-bold
                    text-[17px]
                    ml-1
                  "
                  style={{
                    color: PINK,
                  }}
                >
                  ২০২৫
                </span>
              </div>

              {/* =================================
                  EXAM CODE
              ================================= */}

              <div
                className="
                  mt-3
                  flex
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >
                  <span
                    className="
                      font-bold
                      text-[13px]
                    "
                    style={{
                      color: PINK,
                    }}
                  >
                    Exam Code:
                  </span>
<select
  value={examCode}
  onChange={(e) => {
    setExamCode(e.target.value);
    setResult(null);
    setError("");
  }}
  className="border border-gray-200 rounded-xl p-3.5 outline-none
    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20
    transition-all bg-white"
>
  <option value="">Select Exam Code</option>

  {Examecodeee.map((item, index) => (
    <option
      key={index}
      value={item.examCode}
    >
      {item.examCode}
    </option>
  ))}
</select>
                </div>
              </div>

              <div
                className="
                  mt-2
                  mx-auto
                  max-w-[720px]
                  rounded-full
                  py-1
                  px-3
                "
                style={{
                  backgroundColor: PINK_SOFT,
                }}
              >
                <p
                  className="
                    text-[12px]
                    font-medium
                    leading-snug
                  "
                  style={{
                    color: PINK,
                  }}
                >
                  উত্তরপত্রে নির্ধারিত স্থান ব্যতীত অন্য স্থানে অঙ্কিত দাগ বা
                  কোনো কিছু লেখা যাবে না
                </p>
              </div>

              <p
                className="
                  text-[11px]
                  text-gray-600
                  mt-1
                "
              >
                অনুপস্থিত ফাঁকা রাখ, পরেও মনোযোগ দিয়ে পড়, ক্রমিক নম্বর ঠিক আছে
                কিনা দেখ
              </p>
            </div>

            {/* ============================
                STUDENT INFO
            ============================ */}

            <div
              className="
                px-8
                py-2.5
                grid
                grid-cols-4
                gap-4
                text-[13px]
                border-y
              "
              style={{
                borderColor: PINK_SOFT,
              }}
            >
              {[
                ["নাম", name, setName],
                ["রোল", roll, setRoll],
                ["শ্রেণি", cls, setCls],
                ["বিষয়", subject, setSubject],
              ].map(([label, value, setter]) => (
                <div
                  key={label}
                  className="
                      flex
                      items-center
                      gap-1
                    "
                >
                  <span
                    className="
                        font-semibold
                        whitespace-nowrap
                        text-gray-700
                      "
                  >
                    {label} :
                  </span>

                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    className="
                        flex-1
                        border-b
                        outline-none
                        bg-transparent
                        py-0.5
                        text-[13px]
                      "
                    style={{
                      borderColor: "#d9a9c0",
                      borderStyle: "dotted",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* ============================
                MAIN BODY
            ============================ */}

            <div
              className="
                flex
                px-5
                py-3
                gap-3
              "
            >
              <div
                className="
                  flex-1
                  flex
                  gap-4
                "
              >
                {[0, 20].map((offset) => (
                  <div className="flex-1" key={offset}>
                    <div
                      className="
                          flex
                          items-center
                          mb-1
                          text-[11px]
                          font-bold
                          pb-1
                          border-b
                        "
                      style={{
                        color: PINK,
                        borderColor: PINK_SOFT,
                      }}
                    >
                      <span className="w-[28px] text-center">নং</span>

                      <span className="w-[28px] text-center">উত্তর</span>
                    </div>

                    {Array.from(
                      {
                        length: 20,
                      },
                      (_, i) => {
                        const idx = i + offset;

                        const qNum = (idx + 1).toString().padStart(2, "0");

                        return (
                          <div
                            key={idx}
                            className="
                                flex
                                items-center
                                py-[3px]
                                border-b
                              "
                            style={{
                              borderColor: "#f6e2ea",
                            }}
                          >
                            <span
                              className="
                                  w-[28px]
                                  text-center
                                  text-[13px]
                                  font-semibold
                                  text-gray-700
                                "
                            >
                              {qNum}
                            </span>

                            <div
                              className="
                                  flex
                                  gap-[5px]
                                  ml-1
                                "
                            >
                              {OPTIONS.map((opt) => (
                                <Bubble
                                  key={opt}
                                  label={opt}
                                  selected={answers[idx] === opt}
                                  onClick={() => handleAnswer(idx, opt)}
                                />
                              ))}
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                ))}
              </div>

              {/* ============================
                  RIGHT PANEL
              ============================ */}

              <div
                className="
                  w-[230px]
                  flex
                  flex-col
                  gap-3
                "
              >
                <DigitGrid
                  label="রোল নম্বর"
                  digitCount={6}
                  values={rollDigits}
                  onDigit={(c) => setDigitAt(setRollDigits, c)}
                />

                <DigitGrid
                  label="রেজিস্ট্রেশন নম্বর"
                  digitCount={8}
                  values={regDigits}
                  onDigit={(c) => setDigitAt(setRegDigits, c)}
                />

                {/* SET */}

                <div
                  className="
                    border
                    rounded
                    bg-white
                    px-2
                    py-2
                  "
                  style={{
                    borderColor: "#e8b8cd",
                  }}
                >
                  <p
                    className="
                      text-[11px]
                      font-bold
                      text-center
                      mb-1.5
                    "
                    style={{
                      color: PINK,
                    }}
                  >
                    সেট
                  </p>

                  <div
                    className="
                      flex
                      justify-center
                      gap-[6px]
                    "
                  >
                    {OPTIONS.map((opt) => (
                      <Bubble
                        key={opt}
                        label={opt}
                        selected={setCode === opt}
                        onClick={() => {
                          setSetCode(setCode === opt ? null : opt);

                          setResult(null);

                          setError("");
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  className="
                    relative
                    border-2
                    border-dashed
                    rounded
                    flex-1
                    min-h-[90px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                  "
                  style={{
                    borderColor: "#e8b8cd",
                    backgroundColor: "#fdf6f9",
                  }}
                >
                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      pointer-events-none
                    "
                    style={{
                      transform: "rotate(-28deg)",
                    }}
                  >
                    <span
                      className="
                        text-[16px]
                        font-black
                        tracking-wide
                        whitespace-nowrap
                        opacity-50
                      "
                      style={{
                        color: PINK,
                      }}
                    >
                      এই অংশটি খালি রাখবেন
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================
                RULES
            ============================ */}

            <div
              className="
                px-6
                py-3
                border-t-2
                grid
                grid-cols-2
                gap-6
                text-[12px]
              "
              style={{
                borderColor: PINK,
              }}
            >
              <div>
                <h3
                  className="
                    font-bold
                    text-[14px]
                    mb-1.5
                    underline
                  "
                  style={{
                    color: PINK,
                  }}
                >
                  নিয়মাবলী
                </h3>

                <ol
                  className="
                    list-decimal
                    list-inside
                    space-y-1
                    leading-snug
                    text-[11.5px]
                    text-gray-800
                  "
                >
                  <li>
                    প্রতিটি প্রশ্নের সঠিক উত্তরের বৃত্তটি ভালোভাবে কালো করে ভরাট
                    করতে হবে।
                  </li>

                  <li>উত্তরপত্রে কোনো প্রকার কাটাকাটি করা যাবে না।</li>

                  <li>কলম দিয়ে ভরাট করতে হবে।</li>

                  <li>উত্তরপত্রে কোনো প্রকার ময়লা বা দাগ দেওয়া যাবে না।</li>

                  <li>
                    পরীক্ষার্থী যেন তার নিজের নাম, রোল, শ্রেণি, বিষয় সঠিকভাবে
                    লেখে।
                  </li>
                </ol>
              </div>

              <div
                className="
                  flex
                  flex-col
                  justify-between
                  pt-1
                "
              >
                <div>
                  <p
                    className="
                      font-semibold
                      text-[13px]
                      mb-2
                      text-gray-700
                    "
                  >
                    কক্ষ পরিদর্শকের স্বাক্ষর
                  </p>

                  <div
                    className="
                      h-12
                      border-b-2
                      border-dotted
                    "
                    style={{
                      borderColor: "#d9a9c0",
                    }}
                  />
                </div>

                <div
                  className="
                    text-right
                    mt-4
                  "
                >
                  <p
                    className="
                      font-semibold
                      text-[13px]
                      mb-1
                      text-gray-700
                    "
                  >
                    তারিখ
                  </p>

                  <div
                    className="
                      inline-block
                      w-36
                      border-b-2
                      border-dotted
                      h-7
                    "
                    style={{
                      borderColor: "#d9a9c0",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <PatternStrip vertical />
        </div>

        <PatternStrip />
      </div>

      {/* ==================================
          ERROR
      ================================== */}

      {error && (
        <div
          className="
            w-full
            max-w-[960px]
            bg-red-50
            border
            border-red-200
            text-red-600
            rounded-lg
            px-4
            py-3
            text-sm
            font-medium
          "
        >
          {error}
        </div>
      )}

      {/* ==================================
          SUBMIT BUTTON
      ================================== */}

      <button
        type="button"
        onClick={checkOMR}
        disabled={loading}
        className="
          w-full
          max-w-[960px]
          py-3
          rounded-lg
          font-bold
          text-white
          text-[16px]
          tracking-wide
          transition-opacity
          hover:opacity-90
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
        style={{
          backgroundColor: "#1a1a1a",
        }}
      >
        {loading ? "Checking OMR..." : "Submit & View Result"}
      </button>

      {/* ==================================
          RESULT PANEL
      ================================== */}

      {result && (
        <div
          className="
            w-full
            max-w-[960px]
            bg-[#f7f8fb]
            rounded-xl
            p-6
          "
        >
          {/* RESULT HEADER */}

          <div className="mb-5">
            <h2
              className="
                text-[20px]
                font-bold
                mb-2
              "
            >
              OMR Result
            </h2>

            <div
              className="
                flex
                flex-wrap
                gap-3
                text-[13px]
                text-gray-600
              "
            >
              <span>
                Exam Code:
                <b className="ml-1 text-gray-900">{examCode}</b>
              </span>

              <span>
                Set:
                <b className="ml-1 text-gray-900">{setCode}</b>
              </span>

              {name && (
                <span>
                  Name:
                  <b className="ml-1 text-gray-900">{name}</b>
                </span>
              )}

              {roll && (
                <span>
                  Roll:
                  <b className="ml-1 text-gray-900">{roll}</b>
                </span>
              )}
            </div>
          </div>

          {/* STATISTICS */}

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-3
              mb-3
            "
          >
            {[
              [
                "Total",
                result.totalQuestions ?? result.total ?? TOTAL_QUESTIONS,
                "#1a1a1a",
              ],

              ["Correct", result.correct ?? 0, "#16a34a"],

              ["Wrong", result.wrong ?? 0, "#dc2626"],

              ["Marks", result.marks ?? 0, "#1a1a1a"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="
                    bg-white
                    rounded-lg
                    py-4
                    text-center
                    shadow-sm
                  "
              >
                <p
                  className="
                      text-[13px]
                      text-gray-500
                      mb-1
                    "
                >
                  {label}
                </p>

                <p
                  className="
                      text-[22px]
                      font-bold
                    "
                  style={{
                    color,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* UNANSWERED */}

          <div
            className="
              bg-white
              rounded-lg
              py-3
              px-4
              flex
              justify-between
              items-center
              font-semibold
              mb-4
              shadow-sm
            "
          >
            <span>Unanswered</span>

            <span>{result.unanswered ?? 0}</span>
          </div>

          {/* ANSWER DETAILS */}

          <h3
            className="
              text-[16px]
              font-bold
              mb-2
            "
          >
            Answer Details
          </h3>

          <div
            className="
              flex
              flex-col
              gap-2
            "
          >
            {(result.details || []).map((d) => {
              const questionNumber = d.questionNumber ?? d.qNum;

              const yourAnswer = d.studentAnswer ?? d.yourAnswer ?? null;

              const correctAnswer = d.correctAnswer ?? null;

              const isCorrect = d.isCorrect ?? d.status === "correct";

              const status =
                d.status ??
                (yourAnswer === null
                  ? "unanswered"
                  : isCorrect
                    ? "correct"
                    : "wrong");

              return (
                <div
                  key={questionNumber}
                  className="
                    bg-white
                    rounded-lg
                    py-3
                    px-4
                    flex
                    items-center
                    justify-between
                    shadow-sm
                    text-[13px]
                  "
                >
                  <span
                    className="
                      font-bold
                      w-10
                    "
                  >
                    Q{questionNumber}
                  </span>

                  <span className="text-gray-600">
                    Your: <b>{yourAnswer ?? "-"}</b>
                  </span>

                  <span className="text-gray-600">
                    Correct: <b>{correctAnswer ?? "-"}</b>
                  </span>

                  <span
                    className="
                      w-5
                      text-center
                      font-bold
                    "
                    style={{
                      color:
                        status === "correct"
                          ? "#16a34a"
                          : status === "wrong"
                            ? "#dc2626"
                            : "#9ca3af",
                    }}
                  >
                    {status === "correct"
                      ? "✓"
                      : status === "wrong"
                        ? "✕"
                        : "—"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
