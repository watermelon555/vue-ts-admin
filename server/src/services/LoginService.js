import BaseService from "./BaseService";

export default class LoginService extends BaseService {
    constructor({ loginDao }) {
        super();
        this.loginDao = loginDao;
    }
    // 登录
    async login(params) {
        const [err, list] = await this.loginDao.login(params);
        if (err || !list) {
            return this.fail('登录失败', err);
        }
        console.log(list, '====login')
        return this.success('登录成功', list || []);
    }

    // 角色
    async roles() {
        const [err, list] = await this.loginDao.roles();
        if (err || !list) {
            return this.fail('登录失败', err);
        }

        return this.success('登录成功', list || []);
    }
}
