import { createStore } from 'vuex';

import authModule from './modules/auth/index';
import gameModule from './modules/game/index';

const store = createStore({
    modules: {
        auth: authModule,
        game: gameModule
    }
});

export default store;