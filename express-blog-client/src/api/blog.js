import axios from 'axios';
import config from './const'

const { INTERFACE, BLOG_LIST, BLOG_DETAILS, BLOG_NEW, BLOG_UPDATE, BLOG_DELETE, MOUDLE: { blog } } = config

/**
 * 获取博客列表
 * @param {*} author 
 * @param {*} title 
 */
const getBlogList = (title) => {
    return axios.get(`${INTERFACE}${blog}${BLOG_LIST}`, {
        params: {
            title
        }
    })
}

/**
 * 获取blog详情
 * @param {*} id 
 */
const getBlogDetails = (id) => {
    return axios.get(`${INTERFACE}${blog}${BLOG_DETAILS}`, {
        params: {
            id
        }
    })
}

/**
 * 新增博客
 * @param {*} author 
 * @param {*} title 
 * @param {*} content 
 */
const createBlog = ({ title, content, author = "lisi" }) => {
    return axios.post(`${INTERFACE}${blog}${BLOG_NEW}`, {
        data: {
            author, title, content
        }
    })
}

/**
 * 编辑博客
 * @param {*} id 
 * @param {*} author 
 * @param {*} title 
 * @param {*} content 
 */
const updateBlog = ({ id, author, title, content }) => {
    return axios.post(`${INTERFACE}${blog}${BLOG_UPDATE}`, {
        data: {
            id, author, title, content
        }
    })
}

/**
 * 删除博客
 * @param {*} id 
 */
const deleteBlog = (id) => {
    return axios.post(`${INTERFACE}${blog}${BLOG_DELETE}`, {
        data: {
            id
        }
    })
}

export {
    getBlogList,
    getBlogDetails,
    createBlog,
    updateBlog,
    deleteBlog,
}