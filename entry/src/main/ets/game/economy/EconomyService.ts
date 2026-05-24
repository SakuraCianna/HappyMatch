export type EconomyProductId = 'extra_moves';

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
  extra_moves: {
    id: 'extra_moves',
    title: '加 5 步',
    price: 120,
    extraMoves: 5
  }
};

export class EconomyService {
  private coins: number = 500;
  private purchases: number = 0;

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
    return true;
  }

  addCoins(amount: number): void {
    this.coins = Math.max(0, this.coins + amount);
  }

  resetForTest(coins: number = 500): void {
    this.coins = coins;
    this.purchases = 0;
  }
}

export const economyService = new EconomyService();
