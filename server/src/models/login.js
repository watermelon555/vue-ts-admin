/*
 * 登录 model
 */
import Sequelize from 'sequelize';

export default function (sequelize, DataTypes) {
    class Login extends Sequelize.Model {}
    Login.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'login',
            tableName: 'login',
        }
    );
    return Login;
}
