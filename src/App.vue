<template>
  <div>
    <h1>Mining Game</h1>
    <MiningArea />
  </div>

  <!-- <div>
    <h1>Gold: {{ player.gold }}</h1>
    <button @click="mineGold">Mine Gold</button>
  </div> -->
</template>





<!-- <script lang="ts">
import { defineComponent } from 'vue'
import { usePlayerStore } from './stores/playerStore'

export default defineComponent({
  setup() {
    const player = usePlayerStore()

    function mineGold() {
      player.addGold(10)
    }

    return { player, mineGold }
  }
})
</script> -->
<script lang="ts">
import { defineComponent } from 'vue'
import MiningArea from './components/MiningArea.vue'

export default defineComponent({
  components: {
    MiningArea
  }
})
</script>


<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
  font-family: sans-serif;
}

h2 {
  color: #111111;
}
</style>
