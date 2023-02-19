import React from 'react';
import PropTypes from 'prop-types';
import './BookDetail.scss';
import { Col, Button, Drawer } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookItemById } from '../../../services/bookstore';

BookDetail.propTypes = {

};

function BookDetail(props) {
    const [open, setOpen] = useState(false);
    const [contentBook, setContentBook] = useState({});
    const { id } = useParams();
    const [pageInfo, setPageInfo] = useState({
        _limit: 30,
        _page: 1,
        _totalRows: 50,
    });

    useEffect(() => {
        async function getContentBook(id) {
            let contentBookDetail = await getBookItemById(id, pageInfo._limit, pageInfo._page);

            if (contentBookDetail.errCode === 0) {
                setContentBook(contentBookDetail.data);
            }
        }

        if (id) {
            getContentBook(id);
        }
    }, []);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Col span={20} className="gutter-row">
            {
                contentBook && (
                    <div className="book-detail">
                        <div className="book-detail-info">
                            <div className="book-detail-info__cover" style={{
                                width: "300px",
                                height: "200px",
                                backgroundImage: `url(${contentBook.imageUrl})`,
                                backgroundPosition: "center",
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: "cover",
                            }}></div>
                            <div className="book-detail-info__desc">
                                <div className="book-detail-info__desc-name">
                                    <div>{contentBook.title}</div>
                                    <div className="book-detail-info__toggle-chapter">
                                        <Button type="primary" onClick={showDrawer}>
                                            <UnorderedListOutlined /> Mở mục lục
                                        </Button>
                                        <Drawer title="Mục lục" placement="right" onClose={onClose} open={open}>
                                            <p>Lời mở đầu...</p>
                                            <p>Chương I...</p>
                                            <p>Chương II...</p>
                                        </Drawer>
                                    </div>
                                </div>
                                <div className="book-detail-info__desc-author">Tác giả: {contentBook.author}</div>
                                <div className="book-detail-info__ajust-font-size">

                                </div>
                            </div>
                        </div>

                        <div className="book-detail-content">
                            {
                                contentBook.description
                            }
                        </div>
                    </div>
                )
            }

        </Col>
    );
}

export default BookDetail;