import { Router } from 'express';
const listRouter = Router();
import { listController } from '../controllers/listController.js';
import { catchErrors } from '../middlewares/catchErrors.js';

listRouter.get('/lists', catchErrors(listController.index));

// * avec la regex \d+, on valide la param : ça doit être un entier positif
listRouter.get('/lists/:id(\\d+)', catchErrors(listController.show));

// TODO : mettre en place un middleware validateSchema, pour éviter d'aller embêter le controller si req.body est invalide
listRouter.post(
    '/lists',
    /*validateSchema,*/ catchErrors(listController.store)
);

listRouter.patch('/lists/:id(\\d+)', catchErrors(listController.update));

listRouter.delete('/lists/:id(\\d+)', catchErrors(listController.destroy));

export { listRouter };
