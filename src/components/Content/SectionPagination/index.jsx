import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Menu, Card, Pagination, Rate } from 'antd';
import { FolderOutlined } from '@ant-design/icons';

SectionPagination.propTypes = {

};

function SectionPagination(props) {
    const [pageInfo, setPageInfo] = useState({
        _limit: 30,
        _page: 1,
        _totalRows: 50,
    });

    const handlePagination = (page) => {
        console.log(page);
    }

    return (
        <div className="book-list__pagination">
            <Pagination defaultCurrent={1} total={pageInfo._totalRows} pageSize={pageInfo._limit} onChange={(page) => handlePagination(page)} />
        </div>
    );
}

export default SectionPagination;