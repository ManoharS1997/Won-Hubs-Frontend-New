import { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import ReactPlayer from "react-player";
import { Link } from 'react-router-dom'
import WonContext from "../../../../context/WonContext";
import LeftNav from "../../LeftNav/pages/LeftNav";
import { TfiUpload } from "react-icons/tfi";
import React from "react";
import Modal from "react-modal";
import { IoIosClose } from "react-icons/io";
import { getTableData } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations'


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlay } from "react-icons/fa";

import {
    CustomContainer,
    CustomImg,
    HomeCon,
    HomeContentCon,
    HomeDashCon,
    ScrollVideos,
    SlickItem,

    ModelContainer,

    ArticlesSlickItem,
    ArticlesTitle
} from "./StyledComponents";

const settingsForVideos = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 1,
    slidesToShow: 4,
    slidesToScroll: 2,
    pauseOnHover: true,
    cssEase: "linear",
    rtl: true,
};
const settingsForImagesInFirstRow = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 1,
    slidesToShow: 4,
    slidesToScroll: 2,
    pauseOnHover: true,
    cssEase: "linear",
    rtl: false,
};
const settingsForImagesInSecondRow = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 8000,
    autoplay: true,
    autoplaySpeed: 1,
    slidesToShow: 4,
    slidesToScroll: 2,
    pauseOnHover: true,
    cssEase: "linear",
    rtl: true,
};

const StyledSlider = styled(Slider)`
  width: 93%;
  height: 90%;
  display: flex;
  justify-content: space-between;
  background-color: transperent;
`;

const Home = () => {
    const [modalISOpen, setModalIsOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [ArticlesData, setArticlesData] = useState([])
    const [VideosData, setVideosData] = useState([])

    useEffect(() => {
        getVideosData(),
            getArticlesData()
    }, [])

    const getArticlesData = async () => {
        const Articles = await getTableData("articles")
        setArticlesData(Articles.articles)
    }

    const getVideosData = async () => {
        const videos = await getTableData("videos")
        setVideosData(videos.videos)
    }

    const truncateDescriptionText = (text) => (
        text.length < 40 ? text : text.substring(0, 90) + "......"
    )

    const truncateText = (text) => (
        text.length < 10 ? text : text.substring(0, 20) + '......'
    )
    return (
        <WonContext.Consumer>
            {(value) => {
                const { usersActiveTab, ChangeUserActivetab } = value;

                const openModal = (url) => {
                    setSelectedVideo(url);
                    setModalIsOpen(true);

                };
                const closeModal = () => {
                    setSelectedVideo(null);
                    setModalIsOpen(false);
                };

                return (
                    <HomeCon>
                        <CustomContainer>
                            <HomeDashCon>
                                <HomeContentCon>
                                    <ScrollVideos className="slick-container">
                                        <StyledSlider
                                            {...settingsForVideos}
                                            className="slider-container"
                                        >
                                            {
                                                VideosData?.map((video) => (
                                                    <li
                                                        key={video.id}
                                                        style={{ backgroundImage: video.image_url }}
                                                    >
                                                        <SlickItem>
                                                            <CustomImg src={video.image_url} onClick={() => openModal(video.video_url)} />
                                                            <FaPlay
                                                                onClick={() => openModal(video.video_url)}
                                                                style={{
                                                                    position: "absolute",
                                                                    color: "#fff",
                                                                }}
                                                            />
                                                        </SlickItem>
                                                    </li>
                                                ))}
                                        </StyledSlider>
                                    </ScrollVideos>

                                    <Modal
                                        isOpen={modalISOpen}
                                        onRequestClose={closeModal}
                                        contentLabel="Video Modal"
                                        style={{
                                            content: {
                                                top: "50%",
                                                left: "50%",
                                                right: "auto",
                                                bottom: "auto",
                                                transform: "translate(-50%, -50%)",
                                                width: "80%",
                                                maxWidth: "800px",
                                                height: "600px",
                                            },
                                            overlay: {
                                                backgroundColor: "rgba(0,0,0,0.7)",
                                            },
                                        }}
                                    >
                                        <ModelContainer>
                                            <IoIosClose
                                                style={{
                                                    float: "right",
                                                    height: "30px",
                                                    width: "50px",
                                                }}
                                                onClick={closeModal}
                                            />
                                            {selectedVideo && (
                                                <ReactPlayer
                                                    url={selectedVideo}
                                                    width="100%"
                                                    height="95%"
                                                    controls
                                                    playing
                                                />
                                            )}
                                        </ModelContainer>
                                    </Modal>

                                    <ScrollVideos className="slick-container">
                                        {
                                            ArticlesData?.length > 0 &&
                                            <StyledSlider
                                                {...settingsForImagesInFirstRow}
                                                className="slider-container"
                                            >
                                                {ArticlesData.map(article => (
                                                    <Link to={`user-internal/Articles/${article.id}`} style={{ color: "black" }} key={article.id}>
                                                        <ArticlesSlickItem >
                                                            <ArticlesTitle>{truncateText(article.name)}</ArticlesTitle>
                                                            <p>{truncateDescriptionText(article.content)}</p>
                                                        </ArticlesSlickItem>
                                                    </Link>
                                                ))
                                                }

                                            </StyledSlider>
                                        }
                                    </ScrollVideos>

                                    <ScrollVideos className="slick-container">
                                        <StyledSlider
                                            style={{ width: "93%", height: "90%" }}
                                            {...settingsForImagesInSecondRow}
                                        >
                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095481/WON-Platform-Images/eyzssqjctieiflepho8m.jpg" />
                                            </SlickItem>
                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095481/WON-Platform-Images/p87ku40zxi6ij2qflfzb.jpg" />
                                            </SlickItem>

                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095575/WON-Platform-Images/ikaw5lkqxufw1tzesucf.jpg" />
                                            </SlickItem>

                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095481/WON-Platform-Images/ums4hjb9m3j1p1lazlxa.jpg" />
                                            </SlickItem>
                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095575/WON-Platform-Images/vuo0ttnsvqzhzztumdpt.jpg" />
                                            </SlickItem>
                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095576/WON-Platform-Images/jqlao1qs3bxncvlsm7bk.jpg" />
                                            </SlickItem>
                                            <SlickItem>
                                                <CustomImg src="https://res.cloudinary.com/drtguvwir/image/upload/v1706095575/WON-Platform-Images/jwhpcbnr3kxucykawgtb.jpg" />
                                            </SlickItem>
                                        </StyledSlider>
                                    </ScrollVideos>
                                </HomeContentCon>
                            </HomeDashCon>
                        </CustomContainer>
                    </HomeCon>
                );
            }}
        </WonContext.Consumer>
    );
};

export default Home;
