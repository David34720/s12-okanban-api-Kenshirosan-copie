import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class Card extends Model {}

Card.init(
    {
        content: DataTypes.TEXT,
        position: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        color: {
            type: DataTypes.TEXT,
            defaultValue: '#ffffff',
        },
        list_id: DataTypes.INTEGER,
    },
    {
        sequelize,
        tableName: 'card',
    }
);

export { Card };
