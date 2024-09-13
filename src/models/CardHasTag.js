import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

class CardHasTag extends Model {}

CardHasTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        // Si on veut une clé primaire composite au lieu d'un id autoincrémenté : on comment le champ id au dessus, et on décommente primaryKey
        card_id: {
            type: DataTypes.INTEGER,
            // primaryKey: true,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            // primaryKey: true,
        },
    },
    {
        sequelize,
        tableName: 'card_has_tag',
        indexes: [
            {
                unique: true,
                fields: ['card_id', 'tag_id'],
            },
        ],
    }
);

export { CardHasTag };
