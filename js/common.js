(function($) {

    $.session = {

        _id: null,

        _cookieCache: undefined,

        _init: function() {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();

            // See if we've changed protcols

            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        window.sessionStorage.setItem(key, this._cookieCache[key]);
                    } catch (e) {};
                }
            }

            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires=' + (new Date((new Date).getTime() + 120000)).toUTCString();

        },

        _generatePrefix: function() {
            return '__session:' + this._id + ':';
        },

        _initCache: function() {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },

        _setFallback: function(key, value, onceOnly) {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 120000)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },

        _getFallback: function(key) {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },

        _clearFallback: function() {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },

        _deleteFallback: function(key) {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },

        get: function(key) {
            return window.sessionStorage.getItem(key) || this._getFallback(key);
        },

        set: function(key, value, onceOnly) {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {}
            this._setFallback(key, value, onceOnly || false);
            return this;
        },

        'delete': function(key) {
            return this.remove(key);
        },

        remove: function(key) {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {};
            this._deleteFallback(key);
            return this;
        },

        _clearSession: function() {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
        },

        clear: function() {
            this._clearSession();
            this._clearFallback();
            return this;
        }

    };

    $.session._init();

})(jQuery);


layer && layer.config({
    extend: ['skin/osa/style.css'], //加载新皮肤
    skin: 'layer-ext-osa' //一旦设定，所有弹层风格都采用此主题。
});

var urlhost = "";
// var urlhost = "http://120.79.157.202";
var userdata = getCookie("userdata");
item = getPath();
if (userdata == null) {    
    if (item[1] != "login") {
        alert("请先登录！")
         if(item[2].split("/").length==3){
            location = 'login.html';
        }else{
            parent.location = '../../login.html';
        }
    }    
}

$(function(){
    var seuserName = $.session.get('userName');
    var couserName = getCookie("userName");    
    if (item[1] != "login"&&couserName!=seuserName) {
        layer.confirm('当前浏览器已登陆其他用户，请退出后再登录！', {
            icon: 4,
            title: '错误提示', //按钮
            btn1:function(){

                if(item[2].split("/").length==3){
                    location = 'login.html';
                }else{
                    parent.location = '../../login.html';
                }
            }
        });
    }
})

function setCookie(name, value, time) {
    // var strsec = getsec(time);
    // var exp = new Date();
    // exp.setTime(exp.getTime() + strsec * 1);
    // document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    document.cookie = name + "=" + escape(value) + ";"
}

//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
function getsec(str) {
    // alert(str);
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}



function getPath() {
    var pathName = document.location.pathname;    
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0, index + 1);
    var result = pathName.substr(0, index + 1);
    var sec_result = pathName.substr(index + 2, 5);
    return [result, sec_result,pathName];
}



function addId(start) { //动态给表格添加序号
    var len = $('table tr').length;
    for (var i = 1; i < len; i++) {
        $('table tr:eq(' + i + ') td:first').text(start++);
    }
}

function formatTemplate(dta, tmpl) {
    var format = {
        name: function(x) {
            return x
        }
    };
    return tmpl.replace(/{(\w+)}/g, function(m1, m2) {
        if (!m2)
            return "";
        return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];
    });
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//得到当前季度
Date.prototype.getQuarter = function() {
    var month = this.getMonth();
    var year = this.getFullYear();
    if (month < 3) {
        return year + '-年-第一季度';
    } else if (month < 6) {
        return year + '-年-第二季度';
    } else if (month < 9) {
        return year + '-年-第三季度';
    } else if (month < 12) {
        return year + '-年-第四季度';
    }
};