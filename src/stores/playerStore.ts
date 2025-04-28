import { defineStore } from "pinia";

export interface InventoryItem {
    name: string;
    quantity: number;
}

export interface Tool {
    name: string;
    durability: number;
    miningPower: number; // affects how fast ores break
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export const usePlayerStore = defineStore('player', {
    state: () => ({
        gold: 0,
        inventory: [] as InventoryItem[],
        tools: [] as Tool[],
        equippedTool: null as Tool | null,
    }),
    actions: {
        addGold(amount: number) {
            this.gold += amount;
        },
        subtractGold(amount: number) {
            this.gold = Math.max(0, this.gold - amount); // Don't allow negative gold
        },
        addItem(itemName: string, quantity: number = 1) {
            const existing = this.inventory.find(i => i.name === itemName);
            if (existing) {
                existing.quantity += quantity;
            } else {
                this.inventory.push({ name: itemName, quantity });
            }
        },
        removeItem(itemName: string, quantity: number = 1) {
            const existing = this.inventory.find(i => i.name === itemName);
            if (existing) {
                existing.quantity -= quantity;
                if (existing.quantity <= 0) {
                    // Remove item from inventory if quantity is 0 or less
                    this.inventory = this.inventory.filter(i => i.name !== itemName);
                }
            }
        },
        addTool(tool: Tool) {
            this.tools.push(tool);
        },
        buyItem(item: string, cost: number): boolean {
            if (this.gold >= cost) {
                this.subtractGold(cost);
                this.addItem(item);
                return true; // success
            }
            return false; // not enough gold
        },
        equipTool(toolName: string) {
            const found = this.tools.find(t => t.name === toolName);
            if (found) {
                this.equippedTool = found;
            }
        },
        unequipTool() {
            this.equippedTool = null;
        }
    }
});
