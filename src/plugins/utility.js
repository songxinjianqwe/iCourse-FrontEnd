exports.install = function (Vue, options) {
    Vue.prototype.removeUnchangedValue = function (raw, now, necessaryAttr) {
        for (let key in now) {
            if (now[key] === raw[key] && key !== necessaryAttr) {
                delete now[key]
            }
        }
    },
        Vue.prototype.formatDate = function (date, fmt) {
            let o = {
                "M+": date.getMonth() + 1, //月份 
                "d+": date.getDate(), //日 
                "h+": date.getHours(), //小时 
                "m+": date.getMinutes(), //分 
                "s+": date.getSeconds(), //秒 
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
                "S": date.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        Vue.prototype.DEFAULT_DATE_TIME_FORMAT = 'yyyy-MM-dd hh:mm:ss',
        Vue.prototype.DEFAULT_DATE_FORMAT = 'yyyy-MM-dd',
        Vue.prototype.DEFAULE_PER_PAGE = 5,
        Vue.prototype._id = function () {
            let loginResult = localStorage.getItem('loginResult')
            if (loginResult === null) {
                return null
            } else {
                return JSON.parse(loginResult).id
            }
        },
        Vue.prototype._token = function () {
            let loginResult = localStorage.getItem('loginResult')
            if (loginResult === null) {
                return null
            } else {
                return JSON.parse(loginResult).token
            }
        },
        Vue.prototype._username = function () {
            let loginResult = localStorage.getItem('loginResult')
            if (loginResult === null) {
                return null
            } else {
                return JSON.parse(loginResult).username
            }
        },
        Vue.prototype._isLogin = function () {
            return localStorage.getItem('loginResult') !== null
        },
        Vue.prototype._isAdmin = function () {
            let loginResult = localStorage.getItem('loginResult')
            if (loginResult === null) {
                return null
            } else {
                return JSON.parse(loginResult).isAdmin
            }
        }
};