export const COIN_ADDRESS = '0x123...abc' // Replace with actual address

// ABI (from Zora's docs - paste the full ABI here)
export const COIN_ABI = [
  "function buy(address recipient, uint256 orderSize, uint256 minAmountOut, uint160 sqrtPriceLimitX96, address tradeReferrer) external payable",
  "function sell(address recipient, uint256 orderSize, uint256 minAmountOut, uint160 sqrtPriceLimitX96, address tradeReferrer) external",
  // Add other functions you need (mint, metadata, etc.)
] as const