import { createRouter, createWebHistory } from 'vue-router';

import UserAccount from './components/account/UserAccount';
import BattleGame from './components/game/BattleGame';
import UserAuth from './components/auth/UserAuth';
import store from './store';
// import CoachDetails from './pages/coaches/CoachDetails';
// import CoachesList from './pages/coaches/CoachesList';
// import CoachRegistration from './pages/coaches/CoachRegistration';
// import ContactCoach from './pages/requests/ContactCoach';
// import RequestsReceived from './pages/requests/RequestsReceived';
// import NotFound from './pages/NotFound';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/play' },
        { path: '/account', component: UserAccount, meta: { requiresAuth: true } },
        // { path: '/coaches/:id', component: CoachDetails, props: true, children: [
        //     { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
        // ]},
        { path: '/play', component: BattleGame },
        { path: '/login', component: UserAuth, meta: { requiresUnauth: true } },
        // { path: '/requests', component: RequestsReceived },
        // { path: '/:notFound(.*)', component: NotFound }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/account');
    } else {
        next();
    }
});

export default router;