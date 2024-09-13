import { List } from '../models/associations.js';
// renomme l'import
import sanitize from 'sanitize-html';
import Joi from 'joi';

const listController = {
    async index(req, res) {
        const lists = await List.findAll({
            include: {
                association: 'cards',
                include: 'tags',
                order: [
                    ['position', 'ASC'], // Trie les cartes par position
                ],
            },
            order: [
                ['position', 'ASC'], // Trie les listes par position
                ['created_at', 'DESC'],
            ],
        });
    
        res.json(lists);
    },
    async show(req, res, next) {
        const { id } = req.params;

        const list = await List.findByPk(id, {
            include: { association: 'cards', include: 'tags' },
        });

        if (!list) {
            // * un 404 : next va aller chercher le middleware suivant : notFound
            return next();
        }

        return res.json(list);
    },

    async store(req, res, next) {
        const { title, position } = req.body;

        const schema = Joi.object({
            title: Joi.string().min(3).required().messages({
                'string.empty': 'Le champ title ne doit pas être vide.',
                'string.min':
                    'Le title doit contenir au moins {#limit} caractères.',
                'any.required': 'Le champ title est obligatoire.',
            }),
            position: Joi.number().integer().greater(0),
        });

        const { error } = schema.validate({ title, position });

        if (error) {
            // ! quand on appelle next en lui passant un argument : express lève une erreur, quand express lève une erreur, le middleware qui s'exécute, c'est le prochain middleware d'erreur
            return next(error);
        }

        const list = await List.create({ title: sanitize(title), position });

        res.status(201).json(list);
    },

    async update(req, res, next) {
        const { title, position } = req.body;
        const { id } = req.params;

        const schema = Joi.object({
            title: Joi.string().min(3),
            position: Joi.number().integer().greater(0),
        });

        const { error } = schema.validate({ title, position });

        if (error) {
            return next(error);
        }

        const listToUpdate = await List.findByPk(id);

        if (!listToUpdate) {
            return next();
        }

        const updatedList = await listToUpdate.update({
            title: title || listToUpdate.title,
            position: position || listToUpdate.position,
        });

        return res.json(updatedList);
    },

    async destroy(req, res, next) {
        const { id } = req.params;

        const list = await List.findByPk(id);

        if (!list) {
            return next();
        }

        await list.destroy();

        return res.sendStatus(204);
    },
};

export { listController };
