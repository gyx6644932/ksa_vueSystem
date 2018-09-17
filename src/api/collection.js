import request from '@/utils/request'


export function collectionList(data) {
    return request({
        url: '/api/collectionList',
        method: 'post',
        data
    });
}
export function collectionListd(data) {
    return request({
        url: '/api/collectionListd',
        method: 'post',
        data
    });
}
export function setCollectionListd(data) {
    return request({
        url: '/api/setCollectionListd',
        method: 'post',
        data
    });
}
export function typeList(data) {
    return request({
        url: '/api/typeList',
        method: 'get',
    });
}
export function collectionUrl(data) {
    return request({
        url: '/api/collectionUrl',
        method: 'post',
        data
    });
}

export function collectionUrlAdd(data) {
    return request({
        url: '/api/collectionUrlAdd',
        method: 'post',
        data
    });
}
export function delUser(id) {
    return request({
        url: '/api/collectionUrl/' + id,
        method: 'delete',

    });
}
