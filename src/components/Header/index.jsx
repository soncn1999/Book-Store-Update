import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import { Link } from "react-router-dom";

Header.propTypes = {

};

function Header(props) {
    return (
        <div className="header">
            <div className="header-content-left">
                <div className="header-content-left__logo"></div>
                <div className="header-content-left__brand">
                    <Link to="/">BookStore</Link>
                </div>
            </div>
            <div className="header-conten-right">
                <div className="header-content-right__avatar">
                    <div className="header-content-right__avatar-img"></div>
                    <div className="header-content-right__avatar-username">
                        StudentName
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;