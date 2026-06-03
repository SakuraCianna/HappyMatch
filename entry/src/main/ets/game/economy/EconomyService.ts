import { common } from '@kit.AbilityKit';
import { preferences } from '@kit.ArkData';

export type EconomyProductId = 'shuffle' | 'hammer' | 'brush' | 'add_moves' | 'undo' | 'extra_moves';

export interface EconomyProduct {
  id: EconomyProductId;
  title: string;
  price: number;
  extraMoves: number;
}

export interface WalletState {
  coins: number;
  purchases: number;
}

const PRODUCTS: Record<EconomyProductId, EconomyProduct> = {
  shuffle: {
    id: 'shuffle',
    title: '重组',
    price: 8,
    extraMoves: 0
  },
  hammer: {
    id: 'hammer',
    title: '锤子',
    price: 12,
    extraMoves: 0
  },
  brush: {
    id: 'brush',
    title: '刷子',
    price: 10,
    extraMoves: 0
  },
  add_moves: {
    id: 'add_moves',
    title: '+3 步',
    price: 15,
    extraMoves: 3
  },
  undo: {
    id: 'undo',
    title: '回退',
    price: 18,
    extraMoves: 0
  },
  extra_moves: {
    id: 'extra_moves',
    title: '加 5 步',
    price: 20,
    extraMoves: 5
  }
};

const STORE_NAME = 'happy_match_wallet';
const KEY_COINS = 'coins';
const KEY_PURCHASES = 'purchases';
const DEFAULT_COINS = 500;

export class EconomyService {
  private coins: number = DEFAULT_COINS;
  private purchases: number = 0;
  private initialized: boolean = false;
  private hasSavedWallet: boolean = false;
  private store?: preferences.Preferences;

  async init(context: common.Context): Promise<void> {
    if (this.initialized) {
      return;
    }
    try {
      this.store = await preferences.getPreferences(context, STORE_NAME);
      const savedCoins = await this.store.get(KEY_COINS, -1);
      const savedPurchases = await this.store.get(KEY_PURCHASES, 0);
      if (typeof savedCoins === 'number' && savedCoins >= 0) {
        this.coins = Math.floor(savedCoins);
        this.hasSavedWallet = true;
      }
      if (typeof savedPurchases === 'number' && savedPurchases >= 0) {
        this.purchases = Math.floor(savedPurchases);
      }
    } catch (_error) {
      this.store = undefined;
    }
    this.initialized = true;
  }

  getWallet(): WalletState {
    return {
      coins: this.coins,
      purchases: this.purchases
    };
  }

  getProduct(id: EconomyProductId): EconomyProduct {
    return PRODUCTS[id];
  }

  canPurchase(id: EconomyProductId): boolean {
    return this.coins >= PRODUCTS[id].price;
  }

  purchase(id: EconomyProductId): boolean {
    const product = PRODUCTS[id];
    if (this.coins < product.price) {
      return false;
    }
    this.coins -= product.price;
    this.purchases++;
    this.persist();
    return true;
  }

  addCoins(amount: number): void {
    this.coins = Math.max(0, this.coins + amount);
    this.persist();
  }

  syncFromRemote(coins: number): void {
    if (this.hasSavedWallet) {
      return;
    }
    this.coins = Math.max(0, Math.floor(coins));
    this.hasSavedWallet = true;
    this.persist();
  }

  resetForTest(coins: number = 500): void {
    this.coins = coins;
    this.purchases = 0;
    this.initialized = false;
    this.hasSavedWallet = false;
    this.store = undefined;
  }

  private async persist(): Promise<void> {
    if (!this.store) {
      return;
    }
    try {
      await this.store.put(KEY_COINS, this.coins);
      await this.store.put(KEY_PURCHASES, this.purchases);
      await this.store.flush();
      this.hasSavedWallet = true;
    } catch (_error) {
      // Wallet persistence should not interrupt gameplay.
    }
  }
}

export const economyService = new EconomyService();
