import WonContext from '../../../../context/WonContext'
import Chatbot from '../Chat/Chat'
import LeftNav from '../../LeftNav/pages/LeftNav'
import { getTableData } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations'
import { useState, useEffect, useContext } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

import {
    ArticleCon, ArticleContentCon, ContentContainer1, ContentText, CustomContainer,
    DateItem, DatePublisherCon, EachContentCon, FrequentUsedItems, MainContainer,
    PublisherName, LoaderContainer, ArticlesInput, InputContainer
} from './StyledComponents'

const Articles = () => {
    const [ArticlesData, setArticlesData] = useState([])
    const [FilteredData, setFilteredData] = useState([])
    const { searchInputForArticles } = useContext(WonContext)
    const [firstRender, setFirstRender] = useState(true)
    const [SearchInput, setSearchInput] = useState("")
    const [LoaderDisplay, setLoaderDisplay] = useState(true)

    const getData = async () => {
        const Articles = await getTableData("articles")
        // console.log(Articles.articles.length)

        if (Articles.articles.length > 0) {
            setArticlesData(Articles.articles)
            setFilteredData(Articles.articles)
            setLoaderDisplay(false)
            searchInputForArticles !== '' && FilteredArticles(searchInputForArticles)
        }
    }

    const FilteredArticles = (value) => {
        // console.log('filtering...', value)
        const FilteredItems = ArticlesData.filter(article =>
            article.name.toLowerCase().includes(value.toLowerCase()) ||
            article.content.toLowerCase().includes(value.toLowerCase()) ||
            article.date.includes(value.toLowerCase()) ||
            article.publisher.toLowerCase().includes(value.toLowerCase())
        )

        console.log(FilteredItems)
        setFilteredData(FilteredItems)
    }

    useEffect(() => {
        getData()
        setFirstRender(false)
    }, [ArticlesData.length > 0]
    )

    console.log(SearchInput)
    return (
        <WonContext.Consumer>
            {value => {
                const { isChatBotOpen, searchInputForArticles, setSearchInputForArticles } = value

                if (searchInputForArticles !== "" && firstRender === true) {
                    setSearchInput(searchInputForArticles)
                    // FilteredArticles()
                }

                const onInputSearchChange = (e) => {
                    setSearchInputForArticles(e.target.value)
                    setSearchInput(e.target.value)
                    FilteredArticles(e.target.value)
                }

                return (
                    <MainContainer>
                        <CustomContainer>
                            <ContentContainer1>
                                <ArticleCon className='articles-container'>

                                    <ArticleContentCon>
                                        <InputContainer>
                                            <ArticlesInput
                                                type="serach"
                                                value={SearchInput}
                                                onChange={onInputSearchChange}
                                                placeholder={SearchInput !== "" ? SearchInput : "Search For Articles"}
                                            />
                                            <FaSearch style={{ marginTop: "10px", height: "20px", width: "30px" }} />
                                        </InputContainer>

                                        {
                                            LoaderDisplay ? (
                                                <LoaderContainer
                                                >

                                                    <ThreeDots color="black" height={80} width={80} />
                                                </LoaderContainer>) : FilteredData.map((each) => (
                                                    <Link to={`/user-internal/Articles/${each.id}`} key={each.id}>
                                                        <EachContentCon >
                                                            <FrequentUsedItems>{each.name}</FrequentUsedItems>
                                                            <ContentText>{each.content}</ContentText>
                                                            <DatePublisherCon>
                                                                <DateItem>Date: {each.date}</DateItem>
                                                                <PublisherName>Publisher: {each.publisher}</PublisherName>
                                                            </DatePublisherCon>

                                                        </EachContentCon>
                                                    </Link>
                                                ))


                                        }


                                    </ArticleContentCon>

                                    {isChatBotOpen && <Chatbot />
                                    }
                                </ArticleCon>

                            </ContentContainer1>

                        </CustomContainer>
                    </MainContainer>

                )
            }}
        </WonContext.Consumer>
    )
}
export default Articles