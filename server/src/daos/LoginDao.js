import BaseDao from './base';

import {getFindSql} from '../utils/sql';

export default class LoginDao extends BaseDao {
    modelName = 'login';

    // 登录
    async login(item) {
        const query = getFindSql(item);
        return await this.findOne(query);
    }

    async roles(item) {
        const query = getFindSql(item);
        return await this.findOne(query);
    }

}
