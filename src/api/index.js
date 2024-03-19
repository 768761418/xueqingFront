// index.js

import config from '../config/config.js';
import axios from 'axios';

const apiUrl = config.API_BASE_URL;

export function loginq() {
    console.log("12123")
    // axios({
    //     method: method,
    //     url: `${apiUrl}/login`,
    //     data: data
    //   })
    //     .then(response => {
    //       // 调用回调函数，并将响应结果作为参数传递
    //       callback(null, response.data);

    //     })
    //     .catch(error => {
    //       // 调用回调函数，并将错误对象作为参数传递
    //       callback(error, null);
    //       console.log("12123")
    //     });
}

export function getStudentList() {
    axios({
        method: "get",
        url: "/stu/list/1/20"

    }).then(res => {
        return res
    })
}