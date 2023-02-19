import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Space, Menu, Card, Pagination, Rate } from 'antd';
import { FolderOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Sidebar.scss';

Sidebar.propTypes = {
    breakcums: PropTypes.func
};

Sidebar.defaultProps = {
    breakcums: [],
}

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const data = [
    {
        id: 1,
        parentId: null,
        title: 'Ẩm thực - Nấu ăn',
    },
    {
        id: 2,
        parentId: 1,
        title: 'Cơm gà'
    },
    {
        id: 3,
        parentId: 1,
        title: 'Cơm vịt'
    },
    {
        id: 4,
        parentId: 1,
        title: 'Cơm rang'
    },
    {
        id: 5,
        parentId: null,
        title: 'Công Nghệ Thông Tin'
    },
    {
        id: 6,
        parentId: 5,
        title: 'Lập trình C/C++'
    },
    {
        id: 7,
        parentId: 5,
        title: 'Lập trình PHP'
    },
    {
        id: 8,
        parentId: 5,
        title: 'Lập trình Java Web, Spring boot'
    },
    {
        id: 9,
        parentId: null,
        title: 'Học Ngoại Ngữ',
    },
    {
        id: 10,
        parentId: 9,
        title: 'Tiếng Anh'
    },
    {
        id: 11,
        parentId: 9,
        title: 'Tiếng Hàn'
    },
    {
        id: 12,
        parentId: 9,
        title: 'Tiếng Trung'
    },
    {
        id: 13,
        parentId: 9,
        title: 'Tiếng Nga'
    },
];

function Sidebar(props) {
    const [categories, setCategories] = useState([]);

    let navigate = useNavigate();

    let { categoryId } = useParams();

    useEffect(() => {
        let parentCategory = data.filter((category) => {
            return category.parentId == null;
        });

        let listCategory = parentCategory.map((parent) => {
            return {
                ...parent,
                childrent: checkParent(parent)
            }
        });

        handleRenderItems(listCategory);
    }, []);

    const onClick = (e) => {
        let { breakcums } = props;
        navigate(`/get-book-by-category-id/${e.key}`);
        breakcums(e.keyPath);
    };

    const checkParent = (parent) => {
        const result = data.filter((item) => {
            return item.parentId === parent.id
        });
        return result;
    }

    const listChildrent = (listChildrent) => {
        let listChildrentResult = listChildrent.map((childrent) => {
            return getItem(childrent.title, childrent.id);
        });
        return listChildrentResult;
    }

    const handleRenderItems = (listCategory) => {
        if (listCategory.length > 0) {
            let items = listCategory.map((category) => {
                return (getItem(category.title, category.id, <FolderOutlined />, listChildrent(category.childrent)))
            });
            setCategories(items);
        }
    }

    return (
        <Col span={4} className="gutter-row">
            <div className="sidebar">
                <Menu
                    onClick={onClick}
                    style={{
                        width: 237,
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['1']}
                    mode="inline"
                    items={categories}
                />
            </div>
        </Col>
    );
}

export default Sidebar;