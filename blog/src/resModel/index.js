// 定义一个基类来响应resData的基本属性
class BaseModal {
    constructor(data, msg) {
        if (typeof data === "String") {
            this.msg = data
            data = null
            msg = null
        }
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }
}

// 扩展成功的时候状态返回0
class SuccessModal extends BaseModal {
    constructor(data, msg) {
        super(data, msg)
        this.state = 0
    }
}

// 扩展失败的时候状态返回-1
class ErrorModal extends BaseModal {
    constructor(data, msg) {
        super(data, msg)
        this.state = -1
    }
}

module.exports = {
    SuccessModal,
    ErrorModal
}