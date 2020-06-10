import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from 'vuex-module-decorators'
import {getToken, setToken, removeToken} from '@/utils/cookies'
import {login, getUserInfo} from '@/api/users'
import store from '@/store'

export interface IUserState {
    id_token?: string
    username: string
    password: string
    roles?: string[]
}

@Module({dynamic: true, store, name: 'user'})
class User extends VuexModule implements IUserState {
    public id_token = getToken() || ''
    public username = ''
    public password = ''
    public roles: string[] = []

    @Mutation
    SET_TOKEN(token: string) {
        this.id_token = token
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        this.roles = roles
    }

    @Action
    public ResetToken() {
        removeToken()
        this.SET_TOKEN('')
        location.reload()
    }

    @Action({rawError: true})
    public async Login(params: any) {
        let {username, password, router} = params
        username = username.trim()
        // const {data} = await getUserInfo()
        // console.log('user', data)
        const {data} = await login({username, password});
        console.log(data)
        setToken(`Bearer ${data.idToken}`)
        this.SET_TOKEN(`Bearer ${data.idToken}`)
        router.push({path: '/'});
    }


    @Action
    public async GetUserInfo() {
        if (this.id_token === '') {
            throw Error('GetUserInfo: token is undefined!')
        }
        const {data} = await getUserInfo()
        console.log('user', data)
        if (!data) {
            throw Error('Verification failed, please Login again.')
        }
        const {roles} = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
            throw Error('GetUserInfo: roles must be a non-null array!')
        }
        this.SET_ROLES(roles)
    }
}

export const UserModule = getModule(User)
