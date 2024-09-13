import { sequelize } from '../database/connection.js';
import { Card } from './Card.js';
import { CardHasTag } from './CardHasTag.js';
import { List } from './List.js';
import { Tag } from './Tag.js';

List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id',
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id',
});

Card.belongsToMany(Tag, {
    as: 'tags',
    through: CardHasTag,
    foreignKey: 'card_id',
    otherKey: 'tag_id',
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: CardHasTag,
    foreignKey: 'tag_id',
    otherKey: 'card_id',
});

export { Card, List, Tag, sequelize };
