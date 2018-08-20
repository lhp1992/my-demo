import Axios from 'axios'

let ajax = {
    api: '/php/Public/?service=',
    get (url, params, cb, errorCb, config = {}) {
        let _params = new FormData()
        for (let key in params) {
            _params.append(key, params[key])
        }
        Axios.get(url, _params, config).then(function (response) {
            cb && cb(response.data)
        }).catch(function (error) {
            ajax.error((errorCb || null), error)
        })
    },
    post (url, params, cb, errorCb, config = {}) {
        let _params = new FormData()
        for (let key in params) {
            _params.append(key, params[key])
        }
        Axios.post(url, _params, config).then(function (response) {
            cb && cb(response.data)
        }).catch(function (error) {
            ajax.error((errorCb || null), error)
        })
    },

    /**
     * 错误处理
     */
    error (callback, err) {
        // todo ...
        if (callback) {
            // 如果传入了自定义的错误提示信息, 那么就调用自定义的错误提示信息
            callback(err)
        } else {
            // 否则, 就显示系统基本的错误提示
            console.error(err)
        }
    }
}

export default ajax
