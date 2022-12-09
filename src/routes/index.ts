import { Router } from 'express';
const router = Router();
import AdminRoute from './admin.routes';
import UserRoute from './user.routes';
import TaskRoute from './task.routes';

const defaultRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },
  {
    path: '/task',
    route: TaskRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
