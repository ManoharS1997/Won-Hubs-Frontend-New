import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import Cookies from 'js-cookie'
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
// import { CustomInput, CustomSelect, CustomLabel } from "./StyledCreateFeedback";
import { TextAreaTag } from "../../Notifications/CreateNotification/StyledComponents";
import { CustomOption } from "../../Notifications/CreateNotification/StyledComponents";
import { CustomInput,CustomLabel, CustomSelect} from "../../Notifications/CreateNotification/StyledComponents";

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
        
    const [topData,setTopData]=useState(JSON.parse(localStorage.getItem("feedbackData")))
    console.log(topData,"TopValues here")

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
        const ItemData={
            ...data,
            ...topData
        }
        const url = "http://localhost:3001/feedback/newFeedback";
        const options = {
            method: "POST",
            headers: {
                authorization: `Bearer ${Cookies.get("accessToken")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ItemData),

        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                console.log("FeedBack Added Successfully!");
                setSubmitPopText("FeedBack Added Successfully!");
                navigate('/All Feedbacks',{replace:true})
                localStorage.clear('feedbackContent')
                localStorage.clear('feedbackData')
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
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

  
    return (
        <MainContainer className="w-full overflow-y-auto">

            {/* Header Section */}
            <div className="flex justify-between mt-[5px]">
                <BackBtn onClick={GoBack}>
                    <IoIosArrowBack size={30} />
                </BackBtn>
                <HeaderTag>{formValues?.formTitle}</HeaderTag>
                <button
                    onClick={() => onsubmit(formValues)}
                    className="!bg-[#04274b] text-white rounded py-2 px-4 flex items-center justify-center border-2"
                >
                    Save
                </button>
            </div>

            {/* Popup (Success / Error) */}
            {ispopTextVisible && (
                <SubmitPopUpText
                    style={{
                        background: submitPopText.includes("Error") ? "red" : "#29bf12",
                    }}
                >
                    {submitPopText}
                </SubmitPopUpText>
            )}

            {/* Form Fields: 3-column layout */}
            <div className="w-full flex flex-col md:flex-row gap-4 p-2  h-[20%]">

                {/* Left Section */}
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="to">To:</CustomLabel>
                        <CustomInput id="to" value={topData?.to?.value} onChange={handleInputChange} />
                    </div>
                    <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="cc">CC:</CustomLabel>
                        <CustomInput id="cc" value={topData?.cc?.value}onChange={handleInputChange} />
                    </div>
                </div>

                {/* Middle Section */}
                <div className="w-full flex flex-col gap-4">
                     <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="name">From:</CustomLabel>
                        <CustomInput id="name" value={topData?.from?.value} onChange={handleInputChange} />
                    </div>
                   

                    <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="name">Title:</CustomLabel>
                        <CustomInput id="name" value={topData?.title?.value} onChange={handleInputChange} />
                    </div>
                   
                </div>

                {/* Right Section */}
                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="type">Type:</CustomLabel>
                        <CustomSelect
                            id="type"
                            value={topData?.type?.value}
                            onChange={(e) =>
                                setFormValues((prev) => ({ ...prev, type: e.target.value }))
                            }
                        >
                            <CustomOption value="global">Global</CustomOption>
                            <CustomOption value="local">Local</CustomOption>
                        </CustomSelect>
                    </div>
                     <div className="flex items-center gap-4">
                        <CustomLabel htmlFor="name">Description:</CustomLabel>
                        <CustomInput id="name" value={topData?.description?.value} onChange={handleInputChange} />
                    </div>
                </div>
            </div>

            {/* Sections with Questions */}
            <SubContainer>
                <CustomContainer>

                    {/* Image Preview */}
                    <TemplateImgContainer
                        style={{
                            background: formValues?.image ? `url(${formValues.image})` : "#fff",
                        }}
                    />

                    {/* Sections Loop */}
                    {formValues?.sections?.map((section, index) => (
                        <div key={section.id} className="mt-[15px] h-fit">

                            {/* Section Header */}
                            {formValues.sections.length > 1 && (
                                <SectionTag>
                                    Section {index + 1}/{formValues.sections.length}
                                </SectionTag>
                            )}

                            {/* Section Title & Description */}
                            <TitleContainer
                                style={{ marginTop: formValues.sections.length <= 1 ? "10px" : "5px" }}
                            >
                                <Title>
                                    <ReactQuill theme="bubble" readOnly value={section.sectionTitle} />
                                </Title>
                                <Description>
                                    <ReactQuill theme="bubble" readOnly value={section.sectionDescription} />
                                </Description>
                            </TitleContainer>

                            {/* Fields Loop */}
                            <FieldsList>
                                {section.content.map((field) => (
                                    <FieldContainer key={field.id}>

                                        {/* Question */}
                                        <QuestionDiv>
                                            <CustomTextField readOnly value={field.question} placeholder="Question...?" />
                                            {field.required && <RequireSpan><GoDotFill /></RequireSpan>}
                                        </QuestionDiv>

                                        {/* Response Types */}
                                        <ResponseDiv>
                                            {field.type.datatype === "Short Text" && (
                                                <CustomTextField
                                                    value={field.type.response}
                                                    placeholder="Enter Short-Answer Text..."
                                                    onChange={(e) =>
                                                        OnChangeInResponse("Short Text", section.id, field.id, e, "")
                                                    }
                                                />
                                            )}

                                            {field.type.datatype === "Paragraph" && (
                                                <CustomTextArea
                                                    value={field.type.response}
                                                    placeholder="Enter Long-Answer Text..."
                                                    onChange={(e) =>
                                                        OnChangeInResponse("Paragraph", section.id, field.id, e, "")
                                                    }
                                                />
                                            )}

                                            {field.type.datatype === "Multiple Choice" && (
                                                <RadioBtnSet>
                                                    {field.type.data.map((option) => (
                                                        <RadioBtnContainer key={option.itemID}>
                                                            <input
                                                                type="radio"
                                                                name={field.id}
                                                                checked={option.isItemChecked}
                                                                onChange={(e) =>
                                                                    OnChangeInResponse("Multiple Choice", section.id, field.id, e, option.itemID)
                                                                }
                                                            />
                                                            <input readOnly type="text" value={option.itemLabel} />
                                                        </RadioBtnContainer>
                                                    ))}
                                                </RadioBtnSet>
                                            )}

                                            {field.type.datatype === "CheckBox" && (
                                                <RadioBtnSet>
                                                    {field.type.data.map((option) => (
                                                        <RadioBtnContainer key={option.itemID}>
                                                            <input
                                                                type="checkbox"
                                                                checked={option.isItemChecked}
                                                                onChange={(e) =>
                                                                    OnChangeInResponse("CheckBox", section.id, field.id, e, option.itemID)
                                                                }
                                                            />
                                                            <input readOnly type="text" value={option.itemLabel} />
                                                        </RadioBtnContainer>
                                                    ))}
                                                </RadioBtnSet>
                                            )}

                                            {field.type.datatype === "Dropdown" && (
                                                <select
                                                    value={field.response}
                                                    onChange={(e) =>
                                                        OnChangeInResponse("Dropdown", section.id, field.id, e, "")
                                                    }
                                                >
                                                    {field.type.data.map((opt) => (
                                                        <option key={opt.id}>{opt.itemLabel}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </ResponseDiv>
                                    </FieldContainer>
                                ))}
                            </FieldsList>
                        </div>
                    ))}
                </CustomContainer>
            </SubContainer>

        </MainContainer>
    );


};

export default PreviewFeedback;