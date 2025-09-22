import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';


import 'sweetalert2/src/sweetalert2.scss';

//ICON IMPORTS
import { GoDotFill } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";

import { 
    BackBtn, 
    CustomContainer, 
    HeaderTag, 
    RequireSpan, 
    SubContainer 
} from './StyledPreview';

import {
    CustomTextField,
    Description,
    FieldContainer,
    FieldsList,
    MainContainer,
    QuestionDiv,
    ResponseDiv,
    SectionTag,
    TemplateImgContainer,
    Title,
    TitleContainer
} from './StyledCreateFeedback';


const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link'],
        ['clean']
    ]
};

const formats = [
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link'
];

const FeedbackDetailedView = () => {
    const { feedbackId,responseId } = useParams();
    const [formValues, setFormValues] = useState('')
    const navigate = useNavigate()
    const [submitPopText, setSubmitPopText] = useState('')
    const [ispopTextVisible, setPopTextVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {                                       //GET'S THE DATA OF A FEEDBACK FROM THE FEEDBACK TABLE BY ITS ID
        const getFeedbacks = async () => {
            const url = `http://localhost:3001/feedback/${feedbackId}`
            const options = {
                method: 'GET'
            }

            try {
                const response = await fetch(url, options)
                const data = await response.json()
                setFormValues(data.record)
                console.log('GOT THE FEEDBACK DATA SUCCESSFULLY')

            } catch (error) {
                console.error('Error fetching submitted feedbacks:', error);
            } finally {
                setLoading(false);
            }
        }

        getFeedbacks()
    }, [])


    useEffect(() => {
        if (submitPopText) {
            setPopTextVisible(true)
            const timer = setTimeout(() => {
                setPopTextVisible(false)
            }, 2000);

            return () => clearTimeout(timer)
        }
    }, [submitPopText])

    useEffect(() => {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS

        setFormValues(prev => ({
            ...prev,
            dateOfSubmission: formattedDate
        }));
    }, []);


    const GoBack = () => {
        navigate(-1)
    }

    const image = formValues && URL.createObjectURL(new Blob([formValues.image]))



    return (
        <MainContainer>

            <SubContainer>
                <BackBtn onClick={GoBack}><IoIosArrowBack size={30} /></BackBtn>
                <HeaderTag>{formValues.title}</HeaderTag>

                <CustomContainer style={{ height: 'fit-content' }}>

                    <TemplateImgContainer style={{ background: image ? `url(${image})` : '#fff', }}></TemplateImgContainer>


                    {formValues.responses && formValues.responses
                        .filter(response => response.userId === responseId ) // Filter responses based on User id
                        .map((response, index) => (
                            <div key={response.userId} style={{ marginTop: '15px', height: 'fit-content' }}>
                                {formValues.sections.length > 1 && (
                                    <SectionTag>
                                        User {index + 1}: {response.userName} - Submitted on: {new Date(response.submissionDate).toLocaleDateString()}
                                    </SectionTag>
                                )}
                                {formValues.sections.map((section) => (
                                    <div key={section.id} style={{ marginBottom: '20px' }}>
                                        <TitleContainer style={{ marginTop: formValues.sections.length <= 1 ? '10px' : '5px', height: '180px' }}>
                                            <Title style={{ height: '25%' }}>
                                                <ReactQuill
                                                    theme="bubble"
                                                    readOnly
                                                    value={section.sectionTitle}
                                                    className="large-text"
                                                    style={{ width: '100%', height: '100%', background: '#f5f3f4', borderRadius: '8px' }}
                                                />
                                            </Title>

                                            <Description style={{ height: '70%' }}>
                                                <ReactQuill
                                                    theme="bubble"
                                                    readOnly
                                                    value={section.sectionDescription}
                                                    modules={modules}
                                                    formats={formats}
                                                    className='description-text'
                                                    style={{ width: '100%', height: '100%', padding: '0px', background: '#f5f3f4', borderRadius: '8px' }}
                                                />
                                            </Description>
                                        </TitleContainer>

                                        <FieldsList>
                                            {response.answers.filter(answer => answer.sectionId === section.id).map((answer, answerIndex) => (
                                                <FieldContainer key={answerIndex}>
                                                    <QuestionDiv style={{ background: '#f5f3f4', marginBottom: '5px', borderRadius: '10px', position: 'relative' }}>
                                                        <CustomTextField
                                                            style={{ width: '97%', background: 'transparent' }}
                                                            type="text"
                                                            placeholder="Question...?"
                                                            readOnly
                                                            value={answer.question}
                                                        />
                                                        {answer.required && (
                                                            <RequireSpan>
                                                                <GoDotFill />
                                                            </RequireSpan>
                                                        )}
                                                    </QuestionDiv>
                                                    <ResponseDiv style={{ width: '100%' }}>
                                                        <CustomTextField
                                                            type="text"
                                                            value={answer.answer || ''}
                                                            placeholder="Enter Short-Answer Text..."
                                                            style={{ width: '90%', borderRadius: '0px', height: '35px', background: '#fff', borderBottom: '1px solid #ccc' }}
                                                        />
                                                    </ResponseDiv>
                                                </FieldContainer>
                                            ))}
                                        </FieldsList>
                                    </div>
                                ))}
                            </div>
                        ))}


                </CustomContainer>

            </SubContainer>


        </MainContainer>
    )
}

export default FeedbackDetailedView