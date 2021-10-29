import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            players: ['monster', 'player'],
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            randomValue: 0,
            logMessages: [],
            gameHistory: []
        }
    },
    mutations,
    actions,
    getters

}