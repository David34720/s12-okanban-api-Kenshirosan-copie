import { Router } from 'express';
import { cardController } from '../controllers/cardController.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const cardRouter = Router();

cardRouter.get('/cards', catchErrors(cardController.index));
cardRouter.get('/cards/:id(\\d+)', catchErrors(cardController.show));
// cardRouter.get('/cards/:listId(\\d+)', catchErrors(cardController.getCardsByListId));
cardRouter.post('/cards', catchErrors(cardController.store));
cardRouter.patch('/cards/:id(\\d+)', catchErrors(cardController.update));
cardRouter.delete('/cards/:id(\\d+)', catchErrors(cardController.destroy));

export { cardRouter };
