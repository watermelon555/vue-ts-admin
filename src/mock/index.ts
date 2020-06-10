import Mock from 'mockjs';
//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/v1/users/current', 'POST', require('./user'));
Mock.mock('/api/v1/authenticate', 'GET', require('./authenticate'));
