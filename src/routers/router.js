import { Router } from 'express';
import { listRouter } from './listRouter.js';
import { cardRouter } from './cardRouter.js';
import { tagRouter } from './tagRouter.js';
const router = Router();

// * on préfixe le router list, toutes les URL devront commencer par /lists pour accéder à ce router
// router.use('/lists', listRouter);

router.use(listRouter);
router.use(cardRouter);
router.use(tagRouter);

export { router };
