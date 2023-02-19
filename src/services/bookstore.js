import axios from 'axios';

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

const pickRandomCategoryId = () => {
    let listId = data.map((item) => {
        return item.id;
    });
    let randomIndex = Math.floor(Math.random() * data.length);
    return listId[randomIndex];
}

const getBookList = async (limit, page) => {
    let url = `http://js-post-api.herokuapp.com/api/posts?_limit=${limit}?_page=${page}`;

    try {
        let data = await axios.get(url);
        if (data.data.data.length > 0) {
            let dataCopy = [...data.data.data];
            let { pagination } = data.data;

            let dataAddCategoryId = dataCopy.map((data) => {
                return {
                    ...data,
                    categoryId: pickRandomCategoryId()
                }
            })
            return {
                errorCode: 0,
                message: 'OK',
                pagination: pagination,
                data: dataAddCategoryId,
            }
        } else {
            return {
                errorCode: -1,
                message: 'Fetching data failed!',
                data: "",
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const getBookItemById = async (id, limit, page) => {
    if (id) {
        let bookList = await getBookList(limit, page);
        let { data } = bookList;

        let bookItem = data.find((item) => {
            return item.id == id;
        });

        if (bookItem) {
            return {
                errCode: 0,
                message: 'OK',
                data: bookItem
            }
        } else {
            return {
                errCode: -1,
                message: 'Book not found',
                data: '',
            }
        }
    } else {
        return {
            errCode: 1,
            message: 'Missing required parameter BookId',
            data: '',
        }
    }
}

const getBookListByCategoryId = async (categoryId, page, limit) => {
    if (categoryId) {
        let bookList = await getBookList(page, limit);
        let { data } = bookList;
        let bookListFilter = data.filter((item) => {
            return item.categoryId == categoryId;
        });

        if (bookListFilter.length > 0) {
            return {
                errCode: 0,
                message: 'OK',
                data: bookListFilter
            }
        } else {
            return {
                errCode: -1,
                message: 'Data is empty',
                data: '',
            }
        }
    } else {
        return {
            errCode: 1,
            message: 'Missing required parameter categoryId',
            data: '',
        }
    }
}

const getListCategory = () => {
    return {
        errCode: 0,
        message: 'OK',
        data: data
    }
}

const getBreakcumInfo = (param) => {
    let paramSort = param.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    let breakcumArr = [];
    for (let i = 0; i < paramSort.length; i++) {
        let result = data.find((category) => {
            return category.id == paramSort[i];
        });
        breakcumArr.push(result);
    }
    return breakcumArr;
}

export {
    getBookList, getBookItemById, getBookListByCategoryId, getListCategory, getBreakcumInfo
}