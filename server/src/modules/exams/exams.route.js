import { authenticate, checkUserRoles } from '../../middleware/auth.middleware';
import { USER_ROLE } from '../users/user.model';
import { validateCreateExam, validateUpdateExam } from './exams.validate';
import {
    createExam,
    getExams,
    getMyExams,
    getExamDetail,
    updateExam,
    deleteExam,
} from './exams.controller';

const examRoute = (router) => {
    router.get('/exams', authenticate, getExams);
    router.get('/exams/me', authenticate, getMyExams);
    router.get('/exams/:id', authenticate, getExamDetail);
    router.post(
        '/exams',
        authenticate,
        checkUserRoles([USER_ROLE.TEACHER]),
        validateCreateExam,
        createExam
    );
    router.patch('/exams/:id', authenticate, validateUpdateExam, updateExam);
    router.delete('/exams/:id', authenticate, deleteExam);
};

export default examRoute;
