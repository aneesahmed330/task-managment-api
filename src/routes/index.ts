import { Router } from 'express';
const router = Router();
import UserRoute from './user.routes';

const defaultRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
