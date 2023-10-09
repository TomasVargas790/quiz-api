import { Router } from 'express';
import answers from './components/answers/network.js';
import questions from './components/questions/network.js';
import descriptions from './components/descriptions/network.js';
import themes from './components/themes/network.js';

const router = Router();

router.use('/answers', answers);
router.use('/questions', questions);
router.use('/descriptions', descriptions);
router.use('/themes', themes);

export default router;
