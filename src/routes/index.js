import * as reviews from '../views';

const routData = [
    {
        id: 'route-001',
        path: '/login',
        component: reviews.Login,
        requiresAuth: true,
    },
    {
        id: 'route-001',
        path: '/signup',
        component: reviews.Signup,
        requiresAuth: true,
    },
    {
        id: 'route-001',
        path: '/user/dashboard/home',
        component: reviews.DashBoard,
        requiresAuth: true,
    },
    {
        id: 'route-001',
        path: '/user/dashboard/uploads',
        component: reviews.Uploads,
        requiresAuth: true,
    }
]

export default routData;
