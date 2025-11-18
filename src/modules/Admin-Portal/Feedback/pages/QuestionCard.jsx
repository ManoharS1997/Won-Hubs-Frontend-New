import React, { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import ReactQuill from "react-quill";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import {
  MdShortText,
  MdSubject,
  MdRadioButtonChecked,
  MdCheckBox,
  MdArrowDropDownCircle,
  MdCloudUpload,
  MdLinearScale,
  MdStarRate,
  MdGridOn,
  MdDateRange,
  MdAccessTime,
} from "react-icons/md";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RxDragHandleDots2 } from "react-icons/rx";

const questionTypes = [
  { value: "short-answer", label: "Short answer", icon: <MdShortText size={18} /> },
  { value: "paragraph", label: "Paragraph", icon: <MdSubject size={18} /> },
  { value: "multiple-choice", label: "Multiple choice", icon: <MdRadioButtonChecked size={18} /> },
  { value: "checkboxes", label: "Checkboxes", icon: <MdCheckBox size={18} /> },
  { value: "drop-down", label: "Drop-down", icon: <MdArrowDropDownCircle size={18} /> },
  { value: "file-upload", label: "File upload", icon: <MdCloudUpload size={18} /> },
  { value: "linear-scale", label: "Linear scale", icon: <MdLinearScale size={18} /> },
  { value: "rating", label: "Rating", icon: <MdStarRate size={18} /> },
  // { value: "multiple-choice-grid", label: "Multiple-choice grid", icon: <MdGridOn size={18} /> },
  // { value: "tick-box-grid", label: "Tick box grid", icon: <BiGridSmall size={18} /> },
  { value: "date", label: "Date", icon: <MdDateRange size={18} /> },
  { value: "time", label: "Time", icon: <MdAccessTime size={18} /> },
];

const QuestionCard = ({
  SaveChanges,
  isPreview = false,
  Questions,
  showPreview = false,
  valueItemClicked,
  insertValue,
}) => {
  const parseQuestions = () => {
    try {
      if (Array.isArray(Questions) && Questions.length > 0) return Questions;
      const stored = localStorage.getItem("questionsData");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [{ id: 1, question: "", type: "", options: [""], asked: false }];
    } catch {
      return [{ id: 1, question: "", type: "", options: [""], asked: false }];
    }
  };

  const [questions, setQuestions] = useState(parseQuestions());
  const prevQuestionsRef = useRef("");
  const quillRefs = useRef({});
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Sync when preview updates
  useEffect(() => {
    if (showPreview && Array.isArray(Questions)) {
      const current = JSON.stringify(Questions);
      if (current !== prevQuestionsRef.current) {
        prevQuestionsRef.current = current;
        setQuestions(Questions);
      }
    }
  }, [showPreview, Questions]);

  // Save to parent + localStorage
  const saveToParent = useCallback(
    (updated) => {
      localStorage.setItem("questionsData", JSON.stringify(updated));
      if (SaveChanges) SaveChanges(updated);
    },
    [SaveChanges]
  );

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
  }, [valueItemClicked, insertValue, activeQuestion]);

  // Handlers
  const handleQuestionChange = (id, value) =>
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, question: value } : q)));

  const handleTypeChange = (id, type) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
            ...q,
            type,
            options:
              ["multiple-choice", "checkboxes", "drop-down"].includes(type) &&
                (!q.options || q.options.length === 0)
                ? ["", "", ""]
                : q.options,
          }
          : q
      )
    );

  const handleOptionChange = (qid, index, value) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? { ...q, options: q.options.map((opt, i) => (i === index ? value : opt)) }
          : q
      )
    );

  const addOption = (qid) =>
    setQuestions((prev) =>
      prev.map((q) => (q.id === qid ? { ...q, options: [...q.options, ""] } : q))
    );

  const removeOption = (qid, index) =>
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid
          ? {
            ...q,
            options: q.options.filter((_, i) => i !== index),
          }
          : q
      )
    );

  const addQuestion = () =>
    setQuestions((prev) => [...prev, { id: Date.now(), question: "", type: "", options: [""], asked: false }]);

  const setActive = (id) => setActiveQuestion(id);

  // ✅ New: Toggle "Asked" (Required) functionality
  const handleAskedToggle = (qid) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qid ? { ...q, asked: !q.asked } : q
      )
    );
  };

  // Render answer area per type (same as before)
  const renderAnswerField = (q) => {
    if (!q.type) return null;
    const isDisabled = isPreview && !showPreview;

    switch (q.type) {
      case "short-answer":
        return (
          <input
            disabled={isDisabled}
            placeholder="Short answer"
            className="border-b border-gray-300 w-full bg-transparent outline-none px-2 py-1"
          />
        );

      case "paragraph":
        return (
          <textarea
            disabled={isDisabled}
            placeholder="Long answer"
            className="border-b border-gray-300 w-full bg-transparent outline-none px-2 py-1"
          />
        );

      case "multiple-choice":
      case "checkboxes":
      case "drop-down":
        return (
          <>
            {q.options?.map((opt, i) => (
              <div key={i} className="flex items-center gap-2">
                {q.type === "multiple-choice" && <input type="radio" disabled />}
                {q.type === "checkboxes" && <input type="checkbox" disabled />}
                {q.type === "drop-down" && <span className="text-gray-500">•</span>}
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(q.id, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="border-b border-gray-300 bg-transparent outline-none px-2 py-1 flex-1"
                  disabled={isDisabled}
                />
                {!isPreview && (
                  <button
                    onClick={() => removeOption(q.id, i)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoMdClose />
                  </button>
                )}
              </div>
            ))}
            {!isPreview && (
              <button
                onClick={() => addOption(q.id)}
                className="flex items-center gap-1 text-blue-500 hover:text-blue-700 mt-1"
              >
                <IoMdAdd /> Add Option
              </button>
            )}
          </>
        );

      case "file-upload":
        return <input type="file" disabled={isDisabled} className="text-gray-600 text-sm" />;

      case "linear-scale":
        return (
          <div className="flex gap-4 items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <label key={i} className="flex flex-col items-center text-sm">
                <input type="radio" name={`scale-${q.id}`} disabled={isDisabled} />
                {i + 1}
              </label>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <MdStarRate key={i} size={22} className="text-yellow-500 cursor-pointer" />
            ))}
          </div>
        );

      case "date":
        return <input type="date" disabled={isDisabled} className="border-b border-gray-300 bg-transparent outline-none px-2 py-1" />;

      case "time":
        return <input type="time" disabled={isDisabled} className="border-b border-gray-300 bg-transparent outline-none px-2 py-1" />;

      default:
        return null;
    }
  };
  const handleDragEnd = (result) => {
    console.log(result)

  console.log("Full result object:", result);

  const { source, destination, draggableId, type } = result;

  // // Case: dropped outside any droppable
  // if (!destination) {
  //   console.warn("⚠️ Drop ignored — no valid destination");
  //   console.groupEnd();
  //   return;
  // }

  console.log("✅ Source index:", source.index);
  console.log("✅ Destination index:", destination.index);
  console.log("✅ Dragged item ID:", draggableId);
  console.log("✅ Drag type:", type);

  // Defensive clone
  const reordered = Array.from(questions);
  const [moved] = reordered.splice(source.index, 1);

  console.log("🧩 Item being moved:", moved);

  reordered.splice(destination.index, 0, moved);

  console.table(
    reordered.map((q, i) => ({
      Order: i,
      id: q.id,
      type: q.type,
      question: q.question?.replace(/<[^>]+>/g, "").slice(0, 30),
    }))
  );

  // Update state
  setQuestions(reordered);
  console.log("✅ Updated state set with reordered array.");
  console.groupEnd();
};

  return (
    <div className="w-[80%] mx-auto flex flex-col gap-6 h-[70%]">
      {/* ✅ Editable (drag-enabled) Mode */}
      {!isPreview && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="question-list" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col gap-6"
              >
                {questions.map((q, index) => (
                  <Draggable
                    key={String(q.id)}
                    draggableId={String(q.id)}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`group relative w-full rounded-[18px] p-4 flex flex-col gap-3 bg-white shadow-md border border-gray-100 transition-all duration-200 
                        ${snapshot.isDragging ? "shadow-2xl scale-[1.02]" : ""}`}
                      >
                        {/* Drag Handle */}
                        <div
                          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          title="Drag to reorder"
                        >
                          <RxDragHandleDots2 size={20} />
                        </div>

                        {/* Question Input */}
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
                                  overflowY: "hidden",
                                }}
                                modules={{ toolbar: false }}
                                ref={(el) => (quillRefs.current[q.id] = el)}
                                onFocus={() => setActive(q.id)}
                              />
                            )}
                          </div>

                          <Select
                            options={questionTypes}
                            placeholder="Type..."
                            value={
                              questionTypes.find((opt) => opt.value === q.type) ||
                              null
                            }
                            onChange={(opt) =>
                              handleTypeChange(q.id, opt.value)
                            }
                            className="w-[200px]"
                            formatOptionLabel={(option) => (
                              <div className="flex items-center gap-2">
                                {option.icon}
                                <span>{option.label}</span>
                              </div>
                            )}
                          />
                        </div>

                        {/* Answer Field */}
                        <div className="mt-1">{renderAnswerField(q)}</div>

                        {/* ✅ Required Toggle */}
                        <div className="flex justify-end items-center gap-3 text-sm mt-2">
                          <button
                            type="button"
                            onClick={() => handleAskedToggle(q.id)}
                            className={`relative inline-flex h-5 w-10 items-center !rounded-full transition-colors duration-300 ${q.asked ? "!bg-blue-400" : "!bg-gray-200"
                              }`}
                              title="Required"
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${q.asked ? "translate-x-5" : "translate-x-1"
                                }`}
                            />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* ✅ Preview Mode (no drag, static cards) */}
      {isPreview && (
        <div className="flex flex-col gap-6">
          {questions.map((q) => (
            <div
              key={q.id}
              className="w-full rounded-[18px] p-4 flex flex-col gap-3 bg-white shadow-md border border-gray-100"
            >
              <div className="flex flex-row items-center gap-4">
                <div className="flex-1">
                  <div
                    className="bg-[#E6F0FF] rounded-[8px] px-3 py-1 text-blue-900 min-h-[2.5rem]"
                    dangerouslySetInnerHTML={{ __html: q.question }}
                  />
                </div>
              </div>
              <div className="mt-1">{renderAnswerField(q)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Add Button */}
      {!isPreview && (
        <div className="flex justify-end">
          <button
            onClick={addQuestion}
            className="flex items-center justify-center rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white shadow-md transition-all w-8 h-8"
          >
            <IoMdAdd />
          </button>
        </div>
      )}
    </div>
  );


};

export default QuestionCard;
