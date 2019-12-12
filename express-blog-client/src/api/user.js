import axios from 'axios';
import config from './const'

const { INTERFACE, USER_LOGIN, MOUDLE: { user } } = config

/**
 * 登陆
 * @param {*} username 
 * @param {*} password 
 */
const login = ({ username, password }) => {
    return axios.post(`${INTERFACE}${user}${USER_LOGIN}`, {
        data: {
            username, password
        }
    })
}

export default login