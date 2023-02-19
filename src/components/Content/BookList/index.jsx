import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Menu, Card, Pagination, Rate } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import './BookList.scss';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { getBookList, getBookItemById, getBookListByCategoryId } from '../../../services/bookstore';
import SectionPagination from '../SectionPagination';
import BreakcumSection from '../BreakcumSection';

BookList.propTypes = {
    breakcumArr: PropTypes.array
};

BookList.defaultValue = {
    breakcumArr: [],
}

const { Meta } = Card;

function BookList(props) {
    const [bookList, setBookList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        _limit: 30,
        _page: 1,
        _totalRows: 50,
    });
    // const [breakcumArray, setBreakCumArray] = useState([]);

    let { categoryId } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        async function getBookListViaCategoryId() {
            let getBookByCategoryId = await getBookListByCategoryId(`${categoryId}`, pageInfo._limit, pageInfo._page);

            setBookList(getBookByCategoryId.data);
        }

        async function getBookListFromAPI() {
            let getBookListData = await getBookList(pageInfo._limit, pageInfo._page);

            setBookList(getBookListData.data);
            setPageInfo(getBookListData.pagination);
        }

        if (categoryId) {
            getBookListViaCategoryId();
        } else {
            getBookListFromAPI();
        }
    }, [categoryId])

    const handleRateStar = (item) => {
        console.log(item);
    }

    const handleGetBookItem = (item) => {
        navigate(`/get-book-by-id/${item.id}`);
    }

    return (
        <Col span={20} className="gutter-row" >
            <div className="book-list__container">
                <BreakcumSection breakcumArr={
                    categoryId ? props.breakcumArr : []
                } />
                <Space size="middle" className="book-list__details">
                    {
                        bookList && bookList.map((bookItem) => {
                            return (
                                <Card
                                    hoverable
                                    style={{
                                        width: 237,
                                        padding: 5
                                    }}
                                    key={bookItem.id}
                                    cover={<img style={{
                                        backgroundImage: `url(${bookItem.imageUrl})`,
                                        backgroundPosition: `center`,
                                        backgroundSize: `cover`,
                                        backgroundRepeat: `no-repeat`,
                                        height: "200px",
                                        borderRadius: "3px",
                                    }} />}
                                    onClick={() => handleGetBookItem(bookItem)}
                                >
                                    <Meta title={bookItem.title} description={bookItem.author} />

                                    <div className='book-list__details-rating'>
                                        <span>Rate: </span>
                                        &nbsp;
                                        <Rate defaultValue={2}
                                            onChange={(value) => handleRateStar({ ...bookItem, star: value })}
                                            style={{ fontSize: "14px" }} />
                                    </div>
                                </Card>
                            )
                        })
                    }
                </Space>

                <div className="cross-line cross-line--separate-content"></div>

                <SectionPagination />
            </div>
        </Col>
    );
}

export default BookList;