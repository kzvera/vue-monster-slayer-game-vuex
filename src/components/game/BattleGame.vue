<template>
    <div>
        <health-bar v-for="player in players" :player-type="player" :key="player"></health-bar>
        <battle-winner v-if="winner"></battle-winner>
        <battle-controls v-else></battle-controls>
        <battle-log></battle-log>
    </div>
</template>

<script>
import HealthBar from './HealthBar.vue';
import BattleLog from './BattleLog.vue';
import BattleControls from './BattleControls.vue';
import BattleWinner from './BattleWinner.vue';

export default {
    components: {
        HealthBar,
        BattleLog,
        BattleControls,
        BattleWinner
    },
    computed: {
        players() {
            return this.$store.getters['game/players'];
        },
        winner() {
            return this.$store.getters['game/winner'];
        },
        playerHealth() {
            return this.$store.getters['game/playerHealth'];
        },
        monsterHealth() {
            return this.$store.getters['game/monsterHealth'];
        }
    }
}
</script>