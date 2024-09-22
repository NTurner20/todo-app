import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface TodoAttributes {
    todo_id?: string;
    user_id: string;
    description: string;
}

class Todo extends Model<TodoAttributes> implements TodoAttributes {
    public todo_id!: string;
    public user_id!: string;
    public description!: string;
};

Todo.init(
    {
        todo_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'todos',
        timestamps: false
    }
);

export default Todo;

