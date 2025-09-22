import WonContext from "../../../../context/WonContext"
import LeftNav from "../../LeftNav/pages/LeftNav"
import { useNavigate } from "react-router-dom";

import { MdOutlineDelete } from "react-icons/md";

import {
    ContentContainer, CustomContainer, MainContainer, Card, CartCards,
    PTag, SampleDiv
} from './StyledComponents'

const Cart = () => {
    const histort = useNavigate()

    const OnClickCartItem = (item) => {
        histort.push({
            pathname: `/user/raise-ticket/${item.ticketNo}`,
            state: {
                ticketNo: item.ticketNo,
                name: item.name,
                onBehalfOf: item.onBehalfOf,
                department: item.department,
                category: item.category,
                subCategory: item.subCategory,
                shortDescription: item.shortDescription,
                description: item.description,
                attachment: item.attachment,
                taskType: item.taskType,
                pricePerUnit: item.pricePerUnit,
                quantity: item.quantity,
                service: item.service,
                status: item.status,
                active: item.active,
                requestedEmail: item.requestedEmail
            }
        })
    }

    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen, cart, setUserCart } = value

                const DeleteCartItem = (ItemId) => {
                    setUserCart(ItemId, 'Remove')
                }

                return (
                    <MainContainer>
                        <CustomContainer>
                            <ContentContainer>
                                <CartCards>
                                    {cart.length !== 0 ? Object.values(cart).map((item) => (
                                        <Card key={item.id} onClick={() => OnClickCartItem(item)}>
                                            <SampleDiv style={{ justifyContent: 'space-between' }}>
                                                <PTag>{item.name}</PTag>
                                                <SampleDiv onClick={() => DeleteCartItem(item.ticketNo)} style={{ borderRadius: '50%', height: '25px', width: '25px', justifyContent: 'center', padding: '0px', background: '#adb5bd' }}><MdOutlineDelete style={{}} size={20} /></SampleDiv>
                                            </SampleDiv>

                                            <PTag>ID: {item.ticketNo}</PTag>
                                            <p>Description: {item.description}</p>
                                            <p>Price: {item.pricePerUnit}</p>
                                            <p>Quantity: {item.Quantity}</p>
                                            <p>Total : {item.pricePerUnit * item.Quantity}</p>
                                        </Card>
                                    )) : <p style={{ color: 'red' }}>Nothing to show</p>}

                                </CartCards>
                            </ContentContainer>
                        </CustomContainer>
                    </MainContainer>
                )
            }}
        </WonContext.Consumer>
    )
}

export default Cart