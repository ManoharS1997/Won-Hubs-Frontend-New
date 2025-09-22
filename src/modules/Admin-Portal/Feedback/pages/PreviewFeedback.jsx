import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";

import "sweetalert2/src/sweetalert2.scss";

//ICON IIMPORTS
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn, CustomContainer, CustomTextArea, CustomTextField, Description,
    FieldContainer, FieldsList, HeaderTag, MainContainer, QuestionDiv,
    RadioBtnContainer, RadioBtnSet, RequireSpan, ResponseDiv, SectionTag,
    SubContainer, SubmitBtn, SubmitPopUpText, TemplateImgContainer, Title,
    TitleContainer
} from "./StyledPreview";

const modules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ],
};

const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

const PreviewFeedback = () => {
    const [formValues, setFormValues] = useState(
        JSON.parse(localStorage.getItem("feedbackContent"))
    );
    const navigate = useNavigate();
    const [submitPopText, setSubmitPopText] = useState("");
    const [ispopTextVisible, setPopTextVisible] = useState(false);

    useEffect(() => {
        if (submitPopText) {
            setPopTextVisible(true);
            const timer = setTimeout(() => {
                setPopTextVisible(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [submitPopText]);

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace("T", " "); // Format: YYYY-MM-DD HH:MM:SS

        setFormValues((prev) => ({
            ...prev,
            dateOfSubmission: formattedDate,
        }));
    }, []);

    const OnChangeInResponse = (
        dataType,
        sectionID,
        contentID,
        e,
        dataItemID
    ) => {
        setFormValues((prevValues) => {
            // Initialize the response value
            let responseValue;

            // Update the form structure
            const updatedSections = prevValues.sections.map((section) => {
                if (section.id === sectionID) {
                    return {
                        ...section,
                        content: section.content.map((content) => {
                            if (content.id === contentID) {
                                switch (dataType) {
                                    case "Short Text":
                                    case "Paragraph": {
                                        responseValue = e.target.value;
                                        return { ...content, response: responseValue };
                                    }
                                    case "Multiple Choice": {
                                        const updatedData = content.type.data.map((i) =>
                                            i.itemID === dataItemID
                                                ? { ...i, isItemChecked: e.target.checked }
                                                : { ...i, isItemChecked: false }
                                        );
                                        const selectedChoice = updatedData.find(
                                            (i) => i.isItemChecked
                                        );
                                        responseValue = selectedChoice ? selectedChoice.value : "";
                                        return {
                                            ...content,
                                            type: { ...content.type, data: updatedData },
                                            response: responseValue,
                                        };
                                    }
                                    case "CheckBox": {
                                        const updatedData = content.type.data.map((i) =>
                                            i.itemID === dataItemID
                                                ? { ...i, isItemChecked: e.target.checked }
                                                : i
                                        );
                                        responseValue = updatedData
                                            .filter((i) => i.isItemChecked)
                                            .map((i) => i.value);
                                        return {
                                            ...content,
                                            type: { ...content.type, data: updatedData },
                                            response: responseValue,
                                        };
                                    }
                                    case "Dropdown": {
                                        responseValue = e.target.value;
                                        return { ...content, response: responseValue };
                                    }
                                    default:
                                        return content;
                                }
                            }
                            return content;
                        }),
                    };
                }
                return section;
            });

            // Find or create the user's response entry
            const userId = "current_user_id"; // Replace with actual current user ID logic
            let userResponse = prevValues.responses.find(
                (resp) => resp.userId === userId
            );

            if (!userResponse) {
                userResponse = {
                    userId,
                    userName: "manas", // Optionally add user name
                    submissionDate: new Date().toISOString(),
                    answers: [],
                };
                prevValues.responses.push(userResponse);
            }

            // Update the specific answer in the user's response
            const existingAnswer = userResponse.answers.find(
                (ans) => ans.sectionId === sectionID && ans.questionId === contentID
            );
            if (existingAnswer) {
                existingAnswer.answer = responseValue;
            } else {
                userResponse.answers.push({
                    sectionId: sectionID,
                    sectionTitle: updatedSections.find((sec) => sec.id === sectionID)
                        .sectionTitle, // Include section title
                    questionId: contentID,
                    question: updatedSections
                        .find((sec) => sec.id === sectionID)
                        .content.find((cont) => cont.id === contentID).question, // Include question text
                    answer: responseValue,
                });
            }

            // Return the updated state
            return {
                ...prevValues,
                sections: updatedSections,
                responses: [...prevValues.responses], // Ensure immutability
            };
        });
    };

    const onsubmit = async (data) => {
        const url = "http://localhost:3001/feedback/newFeedback";
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                console.log("FeedBack Added Successfully!");
                setSubmitPopText("FeedBack Added Successfully!");
            } else {
                console.error("Error adding Feedback:", response.statusText);
                setSubmitPopText("Error adding Feedback:", response.statusText);
            }
        } catch (error) {
            console.log("Error:", error.message);
            setSubmitPopText("Error:", error.message);
        }
    };

    const GoBack = () => {
        navigate(-1)
    };

    return (
        <MainContainer>
            <div style={{ display: 'flex' }}>
                <BackBtn onClick={GoBack}>
                    <IoIosArrowBack size={30} />
                </BackBtn>
                <HeaderTag>{formValues.formTitle}</HeaderTag>
            </div>
            {ispopTextVisible && (
                <SubmitPopUpText
                    style={{
                        background: submitPopText.includes("Error") ? "red" : "#29bf12",
                    }}
                >
                    {submitPopText}
                </SubmitPopUpText>
            )}

            <SubContainer>
                <CustomContainer>
                    <TemplateImgContainer
                        style={{
                            background: formValues.image
                                ? `url(${formValues.image})`
                                : "#fff",
                        }}
                    ></TemplateImgContainer>

                    {formValues.sections.map((item, index) => (
                        <div
                            key={item.id}
                            style={{ marginTop: "15px", height: "fit-content" }}
                        >
                            {formValues.sections.length > 1 && (
                                <SectionTag>
                                    Section {index + 1}/{formValues.sections.length}
                                </SectionTag>
                            )}
                            <TitleContainer
                                key={item.id}
                                style={{
                                    marginTop: formValues.sections.length <= 1 ? "10px" : "5px",
                                    height: "180px",
                                }}
                            >
                                <Title style={{ height: "25%" }}>
                                    <ReactQuill
                                        theme="bubble"
                                        readOnly
                                        value={item.sectionTitle}
                                        modules={modules}
                                        formats={formats}
                                        className="large-text"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            background: "#f5f3f4",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Title>

                                <Description style={{ height: "70%" }}>
                                    <ReactQuill
                                        theme="bubble"
                                        readOnly
                                        value={item.sectionDescription}
                                        modules={modules}
                                        formats={formats}
                                        className="description-text"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            padding: "0px",
                                            background: "#f5f3f4",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </Description>
                            </TitleContainer>

                            <FieldsList>
                                {item.content.map((each) => (
                                    <FieldContainer key={each.id}>
                                        <QuestionDiv
                                            style={{
                                                background: "#f5f3f4",
                                                marginBottom: "5px",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <CustomTextField
                                                style={{ width: "97%", background: "transparent" }}
                                                type="text"
                                                placeholder="Question...?"
                                                readOnly
                                                value={each.question}
                                            />
                                            {each.required ? (
                                                <RequireSpan>
                                                    <GoDotFill />
                                                </RequireSpan>
                                            ) : null}
                                        </QuestionDiv>

                                        <ResponseDiv style={{ width: "100%" }}>
                                            {each.type.datatype === "Short Text" && (
                                                <CustomTextField
                                                    value={each.type.response}
                                                    placeholder="Enter Short-Answer Text..."
                                                    onChange={(e) =>
                                                        OnChangeInResponse(
                                                            "Short Text",
                                                            item.id,
                                                            each.id,
                                                            e,
                                                            ""
                                                        )
                                                    }
                                                    style={{
                                                        width: "90%",
                                                        borderRadius: "0px",
                                                        height: "35px",
                                                        background: "#fff",
                                                        borderBottom: "1px solid #ccc",
                                                    }}
                                                />
                                            )}

                                            {each.type.datatype === "Paragraph" && (
                                                <CustomTextArea
                                                    value={each.type.response}
                                                    placeholder="Enter Long-Answer Text..."
                                                    onChange={(e) =>
                                                        OnChangeInResponse(
                                                            "Paragraph",
                                                            item.id,
                                                            each.id,
                                                            e,
                                                            ""
                                                        )
                                                    }
                                                />
                                            )}

                                            {each.type.datatype === "Multiple Choice" && (
                                                <>
                                                    <RadioBtnSet>
                                                        {each.type.data.map((box) => (
                                                            <RadioBtnContainer key={box.itemID}>
                                                                <input
                                                                    id={box.itemID}
                                                                    name={each.id}
                                                                    type="radio"
                                                                    checked={box.isItemChecked}
                                                                    onChange={(e) =>
                                                                        OnChangeInResponse(
                                                                            "Multiple Choice",
                                                                            item.id,
                                                                            each.id,
                                                                            e,
                                                                            box.itemID
                                                                        )
                                                                    }
                                                                />
                                                                <input
                                                                    readOnly
                                                                    style={{
                                                                        border: "none",
                                                                        borderBottom: "1px solid #000",
                                                                        marginLeft: "5px",
                                                                        outline: "none",
                                                                    }}
                                                                    htmlFor={box.itemID}
                                                                    type="text"
                                                                    value={box.itemLabel}
                                                                />
                                                            </RadioBtnContainer>
                                                        ))}
                                                    </RadioBtnSet>
                                                </>
                                            )}

                                            {each.type.datatype === "CheckBox" && (
                                                <>
                                                    <RadioBtnSet>
                                                        {each.type.data.map((eachBox) => (
                                                            <RadioBtnContainer key={eachBox.itemID}>
                                                                <input
                                                                    id={eachBox.itemID}
                                                                    type="checkbox"
                                                                    checked={eachBox.isItemChecked}
                                                                    onChange={(e) =>
                                                                        OnChangeInResponse(
                                                                            "CheckBox",
                                                                            item.id,
                                                                            each.id,
                                                                            e,
                                                                            eachBox.itemID
                                                                        )
                                                                    }
                                                                />
                                                                <input
                                                                    readOnly
                                                                    type="text"
                                                                    style={{
                                                                        border: "none",
                                                                        borderBottom: "1px solid #000",
                                                                        marginLeft: "5px",
                                                                        outline: "none",
                                                                    }}
                                                                    htmlFor={eachBox.itemID}
                                                                    value={eachBox.itemLabel}
                                                                />
                                                            </RadioBtnContainer>
                                                        ))}
                                                    </RadioBtnSet>
                                                </>
                                            )}

                                            {each.type.datatype === "Dropdown" && (
                                                <>
                                                    <div>
                                                        <select
                                                            style={{ width: "150px" }}
                                                            value={each.response}
                                                            onChange={(e) =>
                                                                OnChangeInResponse(
                                                                    "Dropdown",
                                                                    item.id,
                                                                    each.id,
                                                                    e,
                                                                    ""
                                                                )
                                                            }
                                                        >
                                                            {each.type.data.map((item) => (
                                                                <option key={item.id}>{item.itemLabel}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </>
                                            )}
                                        </ResponseDiv>
                                    </FieldContainer>
                                ))}
                            </FieldsList>
                        </div>
                    ))}
                </CustomContainer>

            </SubContainer>

            <SubmitBtn onClick={() => onsubmit(formValues)} type="button">
                Submit
            </SubmitBtn>

        </MainContainer>
    );
};

export default PreviewFeedback;