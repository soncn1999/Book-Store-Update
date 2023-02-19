import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Menu, Card, Pagination, Rate } from 'antd';
import Header from '../components/Header';
import Sidebar from '../components/Content/Sidebar';
import BookList from '../components/Content/BookList';
import './style.scss';
import { getBreakcumInfo } from '../services/bookstore';
import { useParams, useNavigate } from "react-router-dom";

Homepage.propTypes = {

};

function Homepage(props) {
    const [breakcum, setBreakcum] = useState([]);

    const handleGetBreakcum = (data) => {
        let breakcumCheck = getBreakcumInfo(data);
        if (breakcumCheck.length > 0) {
            setBreakcum(breakcumCheck);
        }
    }

    return (
        <div className="container">
            <Header />
            <div className="content">
                <Row gutter={16}>
                    <Sidebar breakcums={handleGetBreakcum} />
                    <BookList breakcumArr={breakcum} />
                </Row>
            </div>
        </div>
    );
}

export default Homepage;