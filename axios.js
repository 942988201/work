import axios from 'axios'
import qs from 'qs'

//创建axios实例
let axiosIns = axios.create({});

//根据环境切换baseUrl
if (process.env.NODE_ENV == 'development') {

    axiosIns.defaults.baseURL = '';

} else if (process.env.NODE_ENV == 'production') {

    axiosIns.defaults.baseURL = '';

}

//设置超时时间
axiosIns.defaults.timeout = 5000;

//设置数据类型
axiosIns.defaults.responseType = 'json';

//数据序列化
axiosIns.defaults.transformRequest = [ (data) => {
    
        return qs.stringify(data);

    }
];

axiosIns.defaults.validateStatus = (status) => {

    return true;

};

//发起请求之间的拦截配置
axiosIns.interceptors.request.use( (config) => {

    //配置config
    config.headers.Accept = 'application/json';
    
    return config;

});

//返回数据之前的拦截
axiosIns.interceptors.response.use( (response) => {

    let data = response.data;

    let status = response.status;

    if (status === 200) {

        return Promise.resolve(data);

    } else {

        return Promise.reject(response);

    }
});

//设置方法数组
let ajaxMethod = ['get', 'post'];

let api = {};

ajaxMethod.forEach((method)=> {
    //数组取值的两种方式
    api[method] = function (url, data, config) {

        return new Promise(function (resolve, reject) {

            axiosIns[method](url, data, config).then((response)=> {

                resolve(response);   

            }).catch((response)=> {

                reject(response);

            })
        })
    }
});

export default {
    //获取城市列表
    getCity() {
        return api.post('city/getMarketCity');
    },
    //获取文章列表
    getArtical(page, rows) {
        return api.get('article/getArticlePageList?page=' + page + '&rows=' + rows);
    },
}
