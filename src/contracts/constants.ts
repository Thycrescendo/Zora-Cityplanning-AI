// Zora Coins Protocol Contracts - Base Mainnet
export const COIN_ADDRESS = '0x7cE2A24d38e2Db9f8E0f571dCD6c42BB30ECf0E3'; // Zora's Coin.sol mainnet address

export const COIN_ABI = [
  // Core ERC20 Functions
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function transfer(address recipient, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',

  // Zora-Specific Functions
  'function createToken(string name, string symbol, string metadataUri, uint256 referralFee) external returns (address)',
  'function buy(address recipient, uint256 orderSize, uint256 minAmountOut, uint160 sqrtPriceLimitX96, address tradeReferrer) external payable',
  'function sell(address recipient, uint256 orderSize, uint256 minAmountOut, uint160 sqrtPriceLimitX96, address tradeReferrer) external',
  'function burn(uint256 amount) external',
  
  // Management Functions
  'function setContractURI(string memory newURI) external',
  'function setPayoutRecipient(address newPayoutRecipient) external',
  
  // View Functions
  'function tokenURI() external view returns (string memory)',
  'function platformReferrer() external view returns (address)',
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
  
  // Events
  'event CoinBuy(address indexed buyer, address indexed recipient, address indexed tradeReferrer, uint256 coinsPurchased, address currency, uint256 amountFee, uint256 amountSold)',
  'event CoinSell(address indexed seller, address indexed recipient, address indexed tradeReferrer, uint256 coinsSold, address currency, uint256 amountFee, uint256 amountPurchased)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)'
] as const;

// For testnet (Base Goerli)
export const TESTNET_COIN_ADDRESS = '0x7cE2A24d38e2Db9f8E0f571dCD6c42BB30ECf0E3'; // Same for testnet currently

// Common Constants
export const ZORA_REFERRAL_FEE = 100; // 1% in basis points (100 = 1%)
export const DEFAULT_TRADE_REFERRER = '0xYourAppAddress'; // Replace with your app's wallet address
export const BASE_CHAIN_ID = 8453; // Mainnet
export const BASE_TESTNET_CHAIN_ID = 84531; // Goerli Testnet

// RPC URLs
export const RPC_URLS = {
  [BASE_CHAIN_ID]: 'https://mainnet.base.org',
  [BASE_TESTNET_CHAIN_ID]: 'https://goerli.base.org'
};

// // Coin Metadata
// export const DEFAULT_COIN_METADATA = {
//   description: 'Urban planning proposal token',
//    Your default image
//   external_url: 
// };