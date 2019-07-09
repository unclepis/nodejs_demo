const sourceDataList = [
    {
        id: 1,
        title: 'vue从入门到放弃',
        author: '尤大大',
        createTime: 1562662202169
    },
    {
        id: 2,
        title: 'React从入门到放弃',
        author: 'Google',
        createTime: 1562662225085
    },
    {
        id: 3,
        title: 'Angular从入门到放弃',
        author: '扫地大佬',
        createTime: 1562662253958
    }
]
const getList = (author, keyword) => {
    // 返回博客列表
    if (!author && !keyword) {
        return sourceDataList
    } else if (!author) {
        return sourceDataList.filter(ele => {
            return ele.title.indexOf(keyword) != -1
        })
    } else {
        return sourceDataList.filter(ele => {
            return ele.author === author
        })
    }
}
const getDetails = (id) => {
    // 返回博客列表
    return sourceDataList.filter(ele => {
        return ele.id === id
    })
}

const deleteBlog = (id) => {
    // 返回博客列表
    return sourceDataList.filter(ele => {
        ele.id !== id
    })
}
const updateBlog = (id, { title, content }) => {
    // 返回博客列表
    let target = sourceDataList.find(ele => {
        ele.id === id
    });
    target.title = title
    target.content = content
}

const createBlog = ({ title, content }) => {
    sourceDataList.unshift({ id: sourceDataList.lenght + 1, title, content })
}

module.exports = {
    getList,
    getDetails,
    deleteBlog,
    updateBlog,
    createBlog
}