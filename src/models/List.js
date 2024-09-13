import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class List extends Model {}

List.init(
    {
        title: {
            type: DataTypes.TEXT,
            // validate: {
            //     len: [8, 150],
            // },
        },
        position: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: 'list',
    }
);

export { List };
