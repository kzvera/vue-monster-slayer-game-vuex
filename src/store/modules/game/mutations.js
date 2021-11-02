export default {
    getRandomValue(state, payload) {
        state.randomValue = Math.floor(Math.random() * (payload.max - payload.min)) + payload.min;
    },
    addLogMessage(state, payload) {
        state.logMessages.unshift(payload);
    },
    surrender(state) {
        state.winner = 'monster';
    },
    startNewGame(state, payload) {
        // reset all parameters to default
        state.playerHealth = 100;
        state.monsterHealth = 100;
        state.currentRound = 0;
        state.winner = null;
        state.logMessages = [];

        if (payload == false) {
            state.gameHistory = [];
        }
    },
    attackMonster(state) {
        state.currentRound++;
        state.monsterHealth -= state.randomValue;
    },
    attackPlayer(state) {
        state.playerHealth -= state.randomValue;
    },
    attackMonsterSpecial(state) {
        state.currentRound++;
        state.monsterHealth -= state.randomValue;
    },
    healPlayerHealth(state) {
        state.currentRound++;

        // Increase player health by heal amount (up to 100)
        state.playerHealth = Math.min(state.playerHealth + state.randomValue, 100);
    },
    setWinner(state, payload) {
        state.gameHistory.unshift({
            player: state.winner,
            date: payload
        });
    },
    loadGameHistory(state, payload) {
        if (payload != null) {
            state.gameHistory = payload.winner;
        }
    }
}