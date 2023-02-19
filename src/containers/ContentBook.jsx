import PropTypes from 'prop-types';
import { Col, Row, Space, Menu, Card, Pagination, Rate } from 'antd';
import Header from '../components/Header';
import Sidebar from '../components/Content/Sidebar';
import BookList from '../components/Content/BookList';
import BookDetail from '../components/Content/BookDetail';
import './style.scss';

ContentBook.propTypes = {

};

function ContentBook(props) {
    return (
        <div className="container">
            <Header />
            <div className="content">
                <Row gutter={16}>
                    <Sidebar />
                    <BookDetail />
                </Row>
            </div>
        </div>
    );
}

export default ContentBook;