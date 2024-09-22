import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
    user_id?: string;
    user_name: string;
    user_email: string;
    user_password: string
}

class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: string; //UUID is a string
    public user_name!: string;
    public user_email!: string;
    public user_password!: string;

};

User.init(
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        user_password : {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false
    }
);

export default User;