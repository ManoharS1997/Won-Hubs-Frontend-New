import WonContext from '../../../../context/WonContext';
import ChatBot from '../Chat/Chat';
import LeftNav from '../../LeftNav/pages/LeftNav';
import { FeedbackData as data } from '../../../../DataFile/DefaultDataFile';

import { FcFeedback } from "react-icons/fc";
import { IoIosArrowDropright } from "react-icons/io";
import { BsStarFill, BsStar } from 'react-icons/bs';

import {
    ArrowBtn, Card, CardHead, Cards, CustomContainer,
    Heading, HeaderTag, HomeCon, HomeDashCon, ParaTag,
    SpanTag, StarContainer
} from './StyledComponents'

export default function Feedback() {
    const Star = ({ filled }) =>
        filled ? <BsStarFill style={{ color: '#f5cb5c', margin: '0.9px' }} size={20} /> :
            <BsStar style={{ color: '#6c757d', margin: '0.9px' }} size={20} />

    // Component to display stars based on the rating
    const RatingStars = ({ rating }) => {
        return (
            <div>
                {[...Array(rating)].map((_, index) => (
                    <Star key={index} filled={true} />
                ))}
                {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                    <Star key={index + rating} filled={false} />
                ))}
            </div>
        );
    };

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen } = value

                return (
                    <HomeCon>
                        <CustomContainer>
                            <HomeDashCon>
                                <Heading><FcFeedback size={30} style={{ alignSelf: 'center', marginRight: '10px' }} />Feedback </Heading>

                                <Cards>
                                    {data.map((card, index) => (
                                        <Card key={index}>
                                            <CardHead>
                                                <HeaderTag>{card.id}</HeaderTag>
                                            </CardHead>

                                            <ParaTag><SpanTag>Dept:</SpanTag>{card.department}</ParaTag>
                                            <ParaTag><SpanTag>Feedback:</SpanTag>
                                                {card.feedbackText.length > 50 ? `${card.feedbackText.substring(0, 50)} ...` : card.feedbackText}
                                            </ParaTag>
                                            <StarContainer><SpanTag>rating:</SpanTag><RatingStars rating={card.rating} /></StarContainer>
                                            <ArrowBtn><IoIosArrowDropright style={{ width: '100%', height: '100%' }} /></ArrowBtn>
                                        </Card>
                                    ))}
                                </Cards>
                            </HomeDashCon>
                        </CustomContainer>

                        {isChatBotOpen && <ChatBot />}
                    </HomeCon>
                )
            }}
        </WonContext.Consumer>
    )
}
