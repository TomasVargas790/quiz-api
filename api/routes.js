import { Router } from 'express';
import answers from './components/answers/network';
import questions from './components/questions/network';
import descriptions from './components/descriptions/network';
import themes from './components/themes/network';

const router = Router();

router.use('/answers', answers);
router.use('/questions', questions);
router.use('/descriptions', descriptions);
router.use('/themes', themes);

export default router;
