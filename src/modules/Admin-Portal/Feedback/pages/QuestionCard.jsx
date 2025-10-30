import React, { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import { IoMdAdd, IoMdClose } from "react-icons/io";

const QuestionCard = ({ SaveChanges, isPreview = false, Questions, showPreview = false,valueItemClicked, insertValue }) => {
  const questionTypes = [
    { value: "short-text", label: "Short Text" },
    { value: "radio", label: "Radio" },
    { value: "checkbox", label: "Checkboxes" },
  ];

  // ✅ Parse initial questions from props or localStorage
  const parseQuestions = () => {
    try {
      if (Array.isArray(Questions) && Questions.length > 0) return Questions;
      const stored = localStorage.getItem("questionsData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [{ id: 1, question: "", type: "", options: [""] }];
    } catch (err) {
      console.error("Error parsing questions:", err);
      return [{ id: 1, question: "", type: "", options: [""] }];
    }
  };

  const [questions, setQuestions] = useState(parseQuestions());
  const prevQuestionsRef = useRef("");
  const quillRefs = useRef({});
  const [activeQuestion, setActiveQuestion] = useState(null);

  // ✅ Update questions when `showPreview` changes (e.g. update mode)
  useEffect(() => {
    if (showPreview && Array.isArray(Questions)) {
      const current = JSON.stringify(Questions);
      if (current !== prevQuestionsRef.current) {
        prevQuestionsRef.current = current;
        setQuestions(Questions);
      }
    }
  }, [showPreview, Questions]);

  // ✅ Stable SaveChanges (prevent loops)
  const saveToParent = useCallback(
    (updated) => {
      try {
        localStorage.setItem("questionsData", JSON.stringify(updated));
        if (SaveChanges) SaveChanges(updated);
      } catch (err) {
        console.error("Error saving questions:", err);
      }
    },
    [SaveChanges]
  );

  // ✅ Only trigger parent save when actual change happens
  useEffect(() => {
    const current = JSON.stringify(questions);
    if (current !== prevQuestionsRef.current) {
      prevQuestionsRef.current = current;
      saveToParent(questions);
    }
  }, [questions, saveToParent]);

  useEffect(() => {
    if (!valueItemClicked || !insertValue || activeQuestion == null) return;

    const editor = quillRefs.current[activeQuestion]?.getEditor();
    if (!editor) return;

    const range = editor.getSelection();
    const cursorPos = range ? range.index : editor.getLength();

    editor.insertText(cursorPos, insertValue);
    editor.setSelection(cursorPos + insertValue.length);

  }, [valueItemClicked, insertValue]);


  const handleQuestionChange = (id, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, question: value } : q))
    );
  };

  const handleTypeChange = (id, type) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            type,
            options: type === "short-text" ? [""] : ["", "", "", ""],
          }
          : q
      )
    );
  };

  const handleOptionChange = (qid, index, value) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
          : q
      )
    );
  };

  const addOption = (qid) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const removeOption = (qid, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
            ...q,
            options:
              q.options.length > 1
                ? q.options.filter((_, i) => i !== index)
                : q.options,
          }
          : q
      )
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { id: Date.now(), question: "", type: "", options: [""] },
    ]);
  };
  const setActive = (id) => {
    setActiveQuestion(id);
  };
  return (
    <div className="w-[70%] mx-auto flex flex-col gap-6">
      {questions.map((q) => (
        <div
          key={q.id}
          className="w-full rounded-[18px] p-4 flex flex-col gap-3 bg-white shadow-md border border-gray-100 mt-0"
        >
          {/* Question Row */}
          <div className="flex flex-row items-center gap-4">
            <div className="flex-1">
              {isPreview && !showPreview ? (
                <div
                  className="bg-[#E6F0FF] rounded-[8px] px-3 py-1 text-blue-900 min-h-[2.5rem]"
                  dangerouslySetInnerHTML={{ __html: q.question }}
                />
              ) : (
                <ReactQuill
                  theme="bubble"
                  value={q.question}
                  onChange={(val) => handleQuestionChange(q.id, val)}
                  placeholder="Enter your question..."
                  className="bg-[#E6F0FF] rounded-[8px] px-3 py-1 text-blue-900"
                  style={{
                    minHeight: "2.5rem",
                    height: "2.5rem",
                    padding: "0.25rem 0.5rem",
                    overflowY: "hidden",
                  }}
                  modules={{ toolbar: false }}
                  ref={(el) => (quillRefs.current[q.id] = el)}
                  onFocus={() => setActive(q.id)}
                />
              )}
            </div>

            {!isPreview && (
              <Select
                options={questionTypes}
                placeholder="Type..."
                value={questionTypes.find((opt) => opt.value === q.type) || null}
                onChange={(opt) => handleTypeChange(q.id, opt.value)}
                className="w-[130px] h-[2.5rem]"
              />
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2 mt-1">
            {q.type === "short-text" && (
              <input
                type="text"
                disabled
                placeholder="Short text answer"
                className="w-full border-b border-gray-300 bg-transparent outline-none px-2 py-1"
              />
            )}

            {(q.type === "radio" || q.type === "checkbox") &&
              q.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type={q.type} disabled className="text-blue-500" />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                    className="border-b border-gray-300 bg-transparent outline-none px-2 py-1 flex-1"
                    disabled={isPreview && !showPreview}
                  />
                  {!isPreview && q.options.length > 1 && (
                    <button
                      onClick={() => removeOption(q.id, i)}
                      className="text-red-500 hover:text-red-700 transition-all"
                      title="Remove Option"
                    >
                      <IoMdClose />
                    </button>
                  )}
                </div>
              ))}

            {!isPreview && (q.type === "radio" || q.type === "checkbox") && (
              <button
                onClick={() => addOption(q.id)}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mt-1 bg-transparent"
              >
                <IoMdAdd /> Add Option
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Add new question (editable or showPreview both allowed) */}
      {(!isPreview || showPreview) && (
        <div className="flex justify-end">
          <button
            onClick={addQuestion}
            className="flex items-center justify-center rounded-md border !border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white shadow-md transition-all w-8 h-8 mt-0"
          >
            <IoMdAdd />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
