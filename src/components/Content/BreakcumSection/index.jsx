import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import './BreakcumSection.scss';
import { Link } from 'react-router-dom';

BreakcumSection.propTypes = {
    breakcumArr: PropTypes.array
};

BreakcumSection.defaultProps = {
    breakcumArr: [],
}

function BreakcumSection(props) {
    const { breakcumArr } = props;

    return (
        <Breadcrumb className='breakcum-wrapper'>
            <Breadcrumb.Item>
                <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            {
                breakcumArr && breakcumArr.length > 0 && breakcumArr.map((item, index) => {
                    return (
                        <Breadcrumb.Item key={index}>
                            <Link to={`/get-book-by-category-id/${item.id}`}>{item.title}</Link>
                        </Breadcrumb.Item>
                    )
                })
            }
            {/* 
            <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
        </Breadcrumb>
    );
}

export default BreakcumSection;