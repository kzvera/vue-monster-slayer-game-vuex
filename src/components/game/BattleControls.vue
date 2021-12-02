<template>
    <section id="controls">
        <button @click="attackMonster">Attack</button>
        <button :disabled="mayUseSpecialAttack" @click="specialAttackMonster">Special Attack</button>
        <button @click="healPlayer">Heal</button>
        <button @click="surrender">Surrender</button>
    </section>
</template>

<script>
export default {
    computed: {
      mayUseSpecialAttack() {
        return this.$store.getters['game/mayUseSpecialAttack'];
      }
    },
    methods: {
      attackMonster() {
        this.$store.dispatch('game/attack', {
          setMinMax: { min: 5, max: 12 }
        });
      },
      specialAttackMonster() {
        this.$store.dispatch('game/specialAttackMonster', {
          setMinMax: { min: 10, max: 25 }
        });
      },
      healPlayer() {
        this.$store.dispatch('game/healPlayer', {
          setMinMax: { min: 8, max: 20 }
        });
      },
      surrender() {
        this.$store.dispatch('game/surrender');
      }
    }
}
</script>

<style scoped>
#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  text-transform: uppercase;
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

@media (max-width: 767px) {
  button {
    font-size: 12px;
    margin: 5px;
    width: 10rem;
  }
}
</style>