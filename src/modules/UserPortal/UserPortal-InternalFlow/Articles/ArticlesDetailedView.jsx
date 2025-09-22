
import LeftNav from '../../LeftNav/pages/LeftNav'
import { useParams, useNavigate } from 'react-router-dom'
import { getRecordData } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations'
import { useState, useEffect } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";


import { MainContainer, CustomContainer, ContentContainer1, ItemDetailsContainer, DateContainer, Title, Description, BottomContainer, DateItem } from './ArticlesDetailedStyledComponents'

const ArticlesDetailedView = () => {
    const { id } = useParams()
    const Navigate = useNavigate()

    const [item, setItemDeatails] = useState({})
    const details = async () => {
        const itemDetails = await getRecordData("articles", id)

        setItemDeatails(itemDetails[0])
    }
    useEffect(() => {
        details()
    }, [1])


    return (
        <MainContainer>
            <CustomContainer>
                <LeftNav />
            </CustomContainer>
            <ContentContainer1>




                {
                    (item.id === undefined) ? (
                        <ThreeDots height={80} width={80} />
                    ) : (
                        <ItemDetailsContainer>
                            <IoIosArrowBack type="button" onClick={() => { Navigate(-1) }} size={25}  />

                        <BottomContainer>
                            <Title>{item.name}</Title>
                            <Description>{item.content}</Description>
                            <DateContainer>
                                <p> <DateItem>Date:</DateItem>{item.date}</p>
                                <p><DateItem>Publisher:</DateItem>{item.publisher}</p>

                            </DateContainer>
</BottomContainer>


                        </ItemDetailsContainer>

                    )
                }



            </ContentContainer1>

        </MainContainer>


    )
}


export default ArticlesDetailedView 
