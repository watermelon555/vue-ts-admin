import bodyParser from 'body-parser'
import { route, POST, before } from 'awilix-express'
import jwt from 'jsonwebtoken';

@route('/')
export default class LoginApi {
    constructor({ loginService }) {
        this.loginService = loginService;
    }

    @route('login')
    @POST()
    @before([bodyParser.json()])
    async login(req, res) {
        const { success, data, message } = await this.loginService.login(
            req.body
        );
        // Token 数据
        const payload = {
            username: data.username,
            password: data.password,
            admin: true
        };
        // 密钥
        const secretOrKey = 'secret';
        // 签发 Token
        const token = jwt.sign(payload, secretOrKey , { expiresIn: '3600' });
        req.headers.token = token;
        if (success) {
            return res.success(res.json({id_token:token}));
        } else {
            res.statusCode = 400;
            res.fail(null, message, message);
        }
    }

    @route('roles')
    @POST()
    @before([bodyParser.json()])
    async roles(req, res) {
        const { success, data, message } = await this.loginService.roles(
            req.body
        );
        if (success) {
            return res.success(res.json({id_token:token}));
        } else {
            res.statusCode = 400;
            res.fail(null, message, message);
        }
    }

}
