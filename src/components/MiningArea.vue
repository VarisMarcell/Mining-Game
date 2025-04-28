<template>
    <div class="mining">
        <h1>Mining Area</h1>

        <div v-if="currentOre">
            <h2>{{ currentOre.name }}</h2>
            <p>Health: {{ currentOre.health }}</p>
            <button @click="hitOre">Mine</button>
            <p v-if="lastDrop">You mined: {{ lastDrop }}</p>
        </div>

        <div>
            <h2>Player Inventory</h2>
            <p v-for="item in player.inventory" :key="item.name">
                {{ item.name }} x{{ item.quantity }}
            </p>
            <p>Gold: {{ player.gold }}</p>
        </div>
    </div>
</template>




<script lang="ts">
import { defineComponent, ref } from 'vue'
import { usePlayerStore } from '@/stores/playerStore'

interface Ore {
    name: string
    health: number
    maxHealth: number
}

export default defineComponent({
    setup() {
        const player = usePlayerStore();

        const ores = [
            { name: 'Iron Ore', maxHealth: 3 },
            { name: 'Gold Ore', maxHealth: 5 },
            { name: 'Diamond Ore', maxHealth: 7 },
            { name: 'Coal', maxHealth: 2 }
        ]

        const currentOre = ref<Ore | null>(generateOre());
        const lastDrop = ref('');

        // COME BACK AND ADD IN WEIGHTS SO CERTAIN ORES SHOW UP LESS

        function generateOre(): Ore {
            const randomIndex = Math.floor(Math.random() * ores.length);
            const selectedOre = ores[randomIndex];
            return {
                name: selectedOre.name,
                health: selectedOre.maxHealth,
                maxHealth: selectedOre.maxHealth
            }
        }

        function hitOre() {
            if (!currentOre.value) return;

            const miningPower = player.equippedTool ? player.equippedTool.miningPower : 1;

            currentOre.value.health -= miningPower;

            if (currentOre.value.health <= 0) {
                // Ore is mined
                const amountOfOreMined = Math.floor(Math.random() * 3) + 1;
                lastDrop.value = `${currentOre.value.name} x${amountOfOreMined}`;

                player.addItem(currentOre.value.name, amountOfOreMined);
                // Generate new ore
                currentOre.value = generateOre();
            }
        }

        return {
            player,
            currentOre,
            hitOre,
            lastDrop
        }
    }
})
</script>


<style scoped>
.mining {
    border: 2px solid #ccc;
    padding: 20px;
    margin: 20px auto;
    width: 300px;
    text-align: center;
    border-radius: 10px;
    background: #f0f8ff;
    color: #111;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 10px;
}
</style>
