<template>
    <section id="log" class="container">
        <h2>Battle Log</h2>
        <ul>
        <li v-for="logMessage in logMessages" :key="logMessage">
            <span :class="{'log--player': logMessage.actionBy == 'player', 'log--monster': logMessage.actionBy == 'monster'}">{{ logMessage.actionBy == 'player' ? 'Player' : 'Monster' }}</span>
            <span v-if="logMessage.actionType == 'heal'"> heals himself for <span class="log--heal">{{ logMessage.actionValue }}</span></span>
            <span v-else> attacks and deals <span class="log--damage">{{ logMessage.actionValue }}</span></span>
        </li>
        </ul>
    </section>
</template>

<script>
export default {
    computed: {
      logMessages() {
        return this.$store.getters['game/logMessages'];
      }
    }
}
</script>

<style scoped>
#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}
</style>