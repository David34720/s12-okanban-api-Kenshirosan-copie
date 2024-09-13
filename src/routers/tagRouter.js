import { Router } from 'express';
import { tagController } from '../controllers/tagController.js';
import { catchErrors } from '../middlewares/catchErrors.js';

const tagRouter = Router();

tagRouter.get('/tags', catchErrors(tagController.index));
tagRouter.get('/tags/:id(\\d+)', catchErrors(tagController.show));

tagRouter.post('/tags', catchErrors(tagController.store));
tagRouter.patch('/tags/:id(\\d+)', catchErrors(tagController.update));
tagRouter.delete('/tags/:id(\\d+)', catchErrors(tagController.destroy));

tagRouter.patch(
    '/cards/:cardId(\\d+)/tags/:tagId(\\d+)',
    catchErrors(tagController.assignTagToCard)
);
tagRouter.delete(
    '/cards/:cardId(\\d+)/tags/:tagId(\\d+)',
    catchErrors(tagController.removeTagFromCard)
);

export { tagRouter };
