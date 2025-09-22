import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LeftNav from '../../../LeftNav/pages/LeftNav';

import { BiCategory } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoImageOutline } from "react-icons/io5";

import {
    BackBtn,
    Card,
    CardImg,
    CardImgCon,
    Cards,
    ContentContainer,
    ContentContainer1,
    CustomContainer,
    Heading,
    MainContainer,
    PTag,
    Topcon,
    UploadImageBtn
} from './StyledComponents';

const RaiseTicketDepartment = () => {
    const navigate = useNavigate();
    const [department, setDepartment] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [departmentCardBgImg, setDepartmentCardBgImg] = useState({});
    const [categoryCardImg, setCategoryCardImg] = useState({});
    const [subCategoryCardImg, setSubCategoryCardImg] = useState({});

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {                                    //GETS ALL THE DEPARTMENTS FROM CATALOG TABLE
        setLoading(true);
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/catalogDesigns/departments`
        const options = {
            method: 'GET'
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setDepartments(data.departments || []);
        } catch (error) {
            console.error('Error fetching departments:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async (department) => {                           //GETS ALL THE CATEGORIES FROM THE CATALOGS OF A SPECIFIC DEPARTMENT
        setLoading(true);
        const url = `${import.meta.env.VITE_HOSTED_API_URL}/catalogDesigns/categories/${department}`;
        const options = {
            method: 'GET'
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setCategories(data.categories);

        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchSubCategories = async (department, category) => {              //GETS ALL THE SUBCATEGORIES OF A SPECIFIC CATEGORY OF SPECIFIC DEPARTMENT
        setLoading(true);

        const url = `${import.meta.env.VITE_HOSTED_API_URL}/catalogDesigns/subCategories/${category}/${department}`;
        const options = {
            method: 'GET'
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setSubCategories(data.subCategories);
            console.log('sub category data', data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e, hierarchy, type) => {
        const selectedFile = e.target.files[0];
        const imageUrl = URL.createObjectURL(selectedFile);
        if (type === 'department') {
            setDepartmentCardBgImg((prevState) => ({
                ...prevState,
                [hierarchy]: imageUrl
            }));
        }
        if (type === 'category') {
            setCategoryCardImg((prevState) => ({
                ...prevState,
                [hierarchy]: imageUrl
            }));
        }
        if (type === 'SubCategory') {
            setSubCategoryCardImg((prevState) => ({
                ...prevState,
                [hierarchy]: imageUrl
            }));
        }
    };

    const onClickDepartment = (dept) => {
        setDepartment(dept);
        setCategory('');
        setSubCategory('');
        fetchCategories(dept);
    };

    const onClickCategory = (cat) => {
        setCategory(cat);
        setSubCategory('');
        fetchSubCategories(department, cat);
    };

    const onClickSubCategory = (subCat) => {
        setSubCategory(subCat);
        navigate('/user/raise-ticket/new', {
            state: {
                department: department,
                category: category,
                subCategory: subCat
            }
        });
    };

    return (
        <MainContainer>
            <CustomContainer>
                <ContentContainer1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {department === '' && (
                                <ContentContainer>
                                    <Heading><BiCategory size={30} style={{ marginRight: '8px' }} />Departments</Heading>
                                    <Cards>
                                        {departments && departments.map((dept) => (
                                            <Card key={dept}
                                                onClick={() => onClickDepartment(dept)}
                                                style={{
                                                    backgroundImage: departmentCardBgImg[dept] ? `url(${departmentCardBgImg[dept]})` :
                                                        'none', backgroundSize: 'cover'
                                                }}
                                            >
                                                <PTag>{dept}</PTag>
                                                <CardImgCon onClick={(e) => e.stopPropagation()}>
                                                    <UploadImageBtn onClick={() => document.getElementById(dept).click()}>
                                                        <IoImageOutline />
                                                    </UploadImageBtn>
                                                    <CardImg
                                                        id={dept}
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={(e) => handleImageChange(e, dept, 'department')}
                                                        style={{ display: 'none' }}
                                                    />
                                                </CardImgCon>
                                            </Card>
                                        ))}
                                    </Cards>
                                </ContentContainer>
                            )}

                            {department !== '' && category === '' && (
                                <ContentContainer>
                                    <Topcon>
                                        <BackBtn onClick={() => setDepartment('')}>
                                            <IoIosArrowBack size={26} />
                                        </BackBtn>
                                        <Heading>{department}</Heading>
                                    </Topcon>
                                    <Cards>
                                        {categories.map((cat) => (
                                            <Card key={cat}
                                                onClick={() => onClickCategory(cat)}
                                                style={{
                                                    backgroundImage: categoryCardImg[cat] ? `url(${categoryCardImg[cat]})` :
                                                        'none', backgroundSize: 'cover'
                                                }}
                                            >
                                                <PTag>{cat}</PTag>
                                                <CardImgCon onClick={(e) => e.stopPropagation()}>
                                                    <UploadImageBtn onClick={() => document.getElementById(cat).click()}>
                                                        <IoImageOutline />
                                                    </UploadImageBtn>
                                                    <CardImg
                                                        id={cat}
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={(e) => handleImageChange(e, cat, 'category')}
                                                        style={{ display: 'none' }}
                                                    />
                                                </CardImgCon>
                                            </Card>
                                        ))}
                                    </Cards>
                                </ContentContainer>
                            )}

                            {department !== '' && category !== '' && subCategory === '' && (
                                <ContentContainer>
                                    <Topcon>
                                        <BackBtn onClick={() => setCategory('')}>
                                            <IoIosArrowBack size={26} />
                                        </BackBtn>
                                        <Heading>{department}/{category}</Heading>
                                    </Topcon>
                                    <Cards>
                                        {subCategories.map((subCat) => (
                                            <Card
                                                style={{
                                                    color: '#000', backgroundImage: subCategoryCardImg[subCat] ? `url(${subCategoryCardImg[subCat]})` :
                                                        'none', backgroundSize: 'cover'
                                                }}
                                                key={subCat} onClick={() => onClickSubCategory(subCat)}>
                                                <CardImgCon onClick={(e) => e.stopPropagation()}>
                                                    <UploadImageBtn onClick={() => document.getElementById(subCat).click()}>
                                                        <IoImageOutline />
                                                    </UploadImageBtn>
                                                    <CardImg
                                                        id={subCat}
                                                        type='file'
                                                        accept='image/*'
                                                        onChange={(e) => handleImageChange(e, subCat, 'SubCategory')}
                                                        style={{ display: 'none' }}
                                                    />
                                                </CardImgCon>
                                                <p>{subCat}</p>
                                            </Card>
                                        ))}
                                    </Cards>
                                </ContentContainer>
                            )}
                        </>
                    )}
                </ContentContainer1>
            </CustomContainer>
        </MainContainer>
    );
};

export default RaiseTicketDepartment;
