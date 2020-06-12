import BaseDao from './base';

import {getFindSql} from '../utils/sql';

export default class LoginDao extends BaseDao {
    modelName = 'login';

    // 登录
    async login(item) {
        console.log(item, item);
        const query = getFindSql(item);
        console.log(query, 'query');
        return await this.findOne(query);
    }

}
