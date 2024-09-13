import Joi from 'joi';
import { Card, List } from '../models/associations.js';

const hexadecimalColorSchema = Joi.string()
    .pattern(new RegExp('^#([0-9a-fA-F]{3}){1,2}$'))
    .message(
        '"color" with value "#FF00FFF" failed to match expected format. Please use a valid hexadecimal color.'
    );

const cardController = {
    async index(req, res) {
        const cards = await Card.findAll({
            include: 'tags',
        });

        // Les renvoyer en JSON
        res.json(cards);
    },

    async show(req, res, next) {
        const cardId = parseInt(req.params.id);

        const card = await Card.findByPk(cardId);

        // Si la carte n'existe pas (ID=90000 => null) ==> 404
        if (!card) {
            return next();
        }

        // Envoyer une réponse
        res.json(card);
    },

    async destroy(req, res, next) {
        // Récupérer l'Id de la carte à supprimer
        const cardId = parseInt(req.params.id);

        const card = await Card.findByPk(cardId);

        if (!card) {
            // Si pas entier ou pas existant dans la BDD => 404
            return next();
        }

        await card.destroy();

        // Sinon on supprime et on renvoie une 204 avec un body vide.
        res.status(204).end();
    },

    async store(req, res, next) {
        const createCardSchema = Joi.object({
            content: Joi.string().min(1).required(), // min(1) pour éviter la string vide : ""
            list_id: Joi.number().integer().greater(0).required(),
            position: Joi.number().integer().greater(0),
            color: hexadecimalColorSchema,
        });

        // Récupérer le body
        const { error } = createCardSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { content, list_id, position, color } = req.body;

        // On vérifiera également que la liste dans laquelle on va ajouter la carte EXISTE BIEN !
        // Autrement dit, on vérifie la FOREIGN KEY !
        const list = await List.findByPk(list_id);
        if (!list) {
            return next();
        }

        // On créer la carte
        const createdCard = await Card.create({
            content,
            list_id,
            position, // si position === undefined, alors Sequelize prendra la version par défaut
            color, // pareil
        });

        // On renvoie le status 201 et la carte créée
        res.status(201).json(createdCard);
    },

    async update(req, res, next) {
        // Récupérer l'ID de la carte à update
        const cardId = parseInt(req.params.id);

        // Valider le body
        // - content
        // - position
        // - color
        // - list_id ===> vérifier que la liste existe !
        const updateCardSchema = Joi.object({
            id: Joi.number().integer().greater(0),
            content: Joi.string().min(1),
            position: Joi.number().integer().greater(0),
            list_id: Joi.number().integer().greater(0),
            color: hexadecimalColorSchema,
        })
            .min(1)
            .message(
                "Missing body parameters. Provide at least 'content' or 'position' or 'list_id' or 'color' properties"
            );

        const { error } = updateCardSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { content, position, list_id, color } = req.body;

        // Récupérer la carte en BDD
        const card = await Card.findByPk(cardId);

        // Si elle existe pas => 404
        if (!card) {
            return res.status(404).json({ error: `Card not found` });
        }

        // Si l'utilisateur souhaite changer la carte de liste, vérifions si la nouvelle liste existe
        if (list_id) {
            const list = await List.findByPk(list_id);
            if (!list) {
                return next();
            }
        }

        // On peut faire l'update
        const updatedCard = await card.update({
            content,
            position,
            color,
            list_id,
        });

        // Renvoie la carte updated !
        res.json(updatedCard); // Status 200 par défaut si on met rien
    },

    // async getCardsByListId(req, res) {
    //     const listId = parseInt(req.params.listId);
    //     const cards = await Card.findAll({ 
    //         where: { list_id: listId },
    //         order: [['position', 'ASC']]
    //     });
    //     res.json(cards);
    // },
};

export { cardController };
