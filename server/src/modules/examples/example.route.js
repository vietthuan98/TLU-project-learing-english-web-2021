import { authenticate } from '../../middleware/auth.middleware';
import {
    validateCreateExample,
    validateUpdateExample,
} from './example.validate';
import {
    createExample,
    getExamples,
    getMyExamples,
    getExampleDetail,
    updateExample,
} from './example.controller';

const exampleRoute = (router) => {
    router.get('/examples', authenticate, getExamples);
    router.get('/examples/me', authenticate, getMyExamples);
    router.get('/examples/:id', authenticate, getExampleDetail);
    router.post(
        '/examples',
        authenticate,
        validateCreateExample,
        createExample
    );
    router.patch(
        '/examples/:id',
        authenticate,
        validateUpdateExample,
        updateExample
    );
};

export default exampleRoute;
