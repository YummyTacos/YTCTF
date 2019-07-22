/** YTCTF Platform
 * Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
 * See full NOTICE at http://github.com/YummyTacos/YTCTF
 */
import jQuery from "jquery";

let token = null;
const storageTokenKey = 'token';
const baseUrl = 'https://api.ctf.yummytacos.me'; // Change this if you have your own API

function request(httpMethod, apiMethod, options) {
    const data = options.data || {};
    const onSuccess = options.onSuccess || (() => null);
    const onFail = options.onFail || (() => null);
    const headers = token !== null ? {Authorization: `Bearer ${token}`} : {};

    jQuery.ajax(`${baseUrl}/${apiMethod}`, {method: httpMethod, data, headers})
        .done((resp) => onSuccess(resp))
        .fail((xhr) => onFail(xhr.responseJSON || xhr.responseText, {
            status: xhr.status, text: xhr.statusText
        }));
}

export default {
    request,
    get: (method, options) => request('get', method, options),
    post: (method, options) => request('post', method, options),
    patch: (method, options) => request('patch', method, options),
    delete: (method, options) => request('delete', method, options),
    loadToken: () => sessionStorage.getItem(storageTokenKey),
    saveToken(value) {
        token = value;
        sessionStorage.setItem(storageTokenKey, value);
    },
    unloadToken() {
        token = null;
        sessionStorage.removeItem(storageTokenKey);
    },
    method: {
        auth: 'auth',
        register: 'register',
        tasks: 'tasks',
        task: 'task',
        users: 'users',
        user: 'user',
        verify: 'verify',
        recover: 'recover',
        article: 'article',
        articles: 'articles',
        category: 'category',
        categories: 'categories',
        admin: {
            article: 'admin/article',
            category: 'admin/category',
            task: 'admin/task',
            file: 'admin/file'
        },
        docs: 'docs',
        about: 'about'
    },
    baseUrl
};
