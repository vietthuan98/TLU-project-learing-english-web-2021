import { authenticate } from '../../middleware/auth.middleware';
import { validateCreateExam, validateUpdateExam } from './exams.validate';
import {
    createExam,
    getExams,
    getMyExams,
    getExamDetail,
    updateExam,
} from './exams.controller';

const examRoute = (router) => {
    router.get('/exams', authenticate, getExams);
    router.get('/exams/me', authenticate, getMyExams);
    router.get('/exams/:id', authenticate, getExamDetail);
    router.post('/exams', authenticate, validateCreateExam, createExam);
    router.patch('/exams/:id', authenticate, validateUpdateExam, updateExam);
};

export default examRoute;
