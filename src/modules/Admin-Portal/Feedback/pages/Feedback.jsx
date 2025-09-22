import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./index.css";

import { Link } from "react-router-dom";

import "sweetalert2/src/sweetalert2.scss";

import { IoIosArrowBack } from "react-icons/io";

import {
    BackBtn, Btn, ContentArea, CustomContainer, CustomTable,
    CustomTd, CustomTextField, CustomTh, CustomTr, Description,
    FeedBackNameContainer, FieldContainer, FieldsList, HeaderContainer,
    HeaderTag, MainContainer, MainContainer2, QuestionDiv, SectionTag,
    TabsContainer, TemplateImgContainer, Title, TitleContainer
} from "./StyledFeedback";

const modules = {
    toolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],
    ],
};

const formats = ["bold", "italic", "underline", "list", "bullet", "link"];

const FeedBack = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responses, setresponses] = useState("");

    const [activeTab, setActiveTab] = useState("Questions");
    const [formValues, setFormValues] = useState('');

    useEffect(() => {
        getFeedbacks();
    }, []);

    const getFeedbacks = async () => {
        console.log('this is getting called')
        setLoading(true);
        const url = `http://localhost:3001/feedback/${id}`;
        const options = {
            method: "GET",
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setFormValues(data.record);
            setresponses(data.record.responses);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching submitted feedbacks:", error);
        } finally {
            setLoading(false);
        }
    };

    const GoBack = () => {
        navigate(-1);
    };


    return (
        <MainContainer>
            <HeaderContainer>
                <FeedBackNameContainer>
                    <BackBtn type="button" onClick={GoBack}>
                        <IoIosArrowBack size={30} />
                    </BackBtn>
                    <HeaderTag>{formValues.title}</HeaderTag>
                </FeedBackNameContainer>

                <TabsContainer>
                    <Btn
                        style={{
                            height: "fit-content",
                            margin: "5px 5px 0px 5px",
                            background: "transparent",
                            borderBottom: activeTab === "Questions" ? "2px solid #000" : "",
                            borderRadius: "0px",
                            color: "#000",
                        }}
                        onClick={() => setActiveTab("Questions")}
                    >
                        Questions
                    </Btn>
                    <Btn
                        style={{
                            height: "fit-content",
                            margin: "5px 5px 0px 5px",
                            background: "transparent",
                            borderBottom: activeTab === "Responses" ? "2px solid #000" : "",
                            borderRadius: "0px",
                            color: "#000",
                        }}
                        onClick={() => {
                            getFeedbacks();
                            setActiveTab("Responses");
                        }}
                    >
                        Responses
                    </Btn>
                </TabsContainer>
            </HeaderContainer>

            <MainContainer2>
                {activeTab === "Questions" &&
                    (loading ? (
                        <div className="newtons-cradle">
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                            <div className="newtons-cradle__dot"></div>
                        </div>
                    ) : (
                        <ContentArea>
                            <CustomContainer>
                                <TemplateImgContainer
                                    style={{
                                        background: formValues.image
                                            ? `url(${formValues.image})`
                                            : "#fff",
                                    }}
                                ></TemplateImgContainer>

                                {formValues.sections.map((item, index) => (
                                    <>
                                        {formValues.sections.length > 1 && (
                                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                                <SectionTag>
                                                    Section {index + 1}/{formValues.sections.length}
                                                </SectionTag>
                                            </div>
                                        )}
                                        <TitleContainer
                                            key={item.id}
                                            style={{
                                                marginTop:
                                                    formValues.sections.length <= 1 ? "10px" : "",
                                            }}
                                        >
                                            <Title>
                                                <ReactQuill
                                                    theme="bubble"
                                                    value={item.sectionTitle}
                                                    readOnly
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

                                            <Description>
                                                <ReactQuill
                                                    theme="bubble"
                                                    value={item.sectionDescription}
                                                    readOnly
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
                                                    <QuestionDiv>
                                                        <CustomTextField
                                                            type="text"
                                                            placeholder="Question...?"
                                                            value={each.question}
                                                            readOnly
                                                        />
                                                    </QuestionDiv>
                                                </FieldContainer>
                                            ))}
                                        </FieldsList>
                                    </>
                                ))}
                            </CustomContainer>
                        </ContentArea>
                    ))}

                {activeTab === "Responses" && (
                    <CustomContainer>
                        {loading ? (
                            <div className="loader">
                                <span className="loader-text">loading</span>
                                <span className="load"></span>
                            </div>
                        ) : (
                            <CustomTable>
                                <thead style={{ height: '35px' }}>
                                    <tr>
                                        {responses &&
                                            responses[0] &&
                                            Object.keys(responses[0]).map(
                                                (key) =>
                                                    key !== "answers" && (
                                                        <CustomTh key={key}>{key}</CustomTh>
                                                    )
                                            )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses &&
                                        responses.map((response, index) => (
                                            <CustomTr key={index} style={{ height: '30px' }}>
                                                {Object.keys(response).map(
                                                    (key, valueIndex) =>
                                                        key !== "answers" && (
                                                            <CustomTd key={valueIndex}>
                                                                {key === "userId" ? (
                                                                    <Link
                                                                        to={`/FeedbackResponse/${id}/${response[key]}`}
                                                                    >
                                                                        {response[key]}
                                                                    </Link>
                                                                ) : typeof response[key] === "object" ? (
                                                                    JSON.stringify(response[key])
                                                                ) : (
                                                                    response[key]
                                                                )}
                                                            </CustomTd>
                                                        )
                                                )}
                                            </CustomTr>
                                        ))}
                                </tbody>
                            </CustomTable>
                        )}
                    </CustomContainer>
                )}
            </MainContainer2>
        </MainContainer>
    );
};

export default FeedBack;
