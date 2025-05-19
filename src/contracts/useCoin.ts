import { COIN_ADDRESS, COIN_ABI } from './constants'
import { ethers } from 'ethers'

export function useCoin() {
  const provider = new ethers.BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const coinContract = new ethers.Contract(COIN_ADDRESS, COIN_ABI, signer)

  const mintProposal = async (name: string, symbol: string) => {
    const tx = await coinContract.createToken(name, symbol)
    await tx.wait()
    console.log("Token minted!")
  }

  const buyTokens = async (amount: string) => {
    const tx = await coinContract.buy(
      userAddress,         // Recipient
      ethers.parseEther(amount), // Convert ETH to wei
      0,                  // Min tokens out (slippage)
      0,                  // Price limit
      '0xYOUR_APP_ADDRESS' // Trade referrer (you earn fees!)
    )
    await tx.wait()
  }

  return { mintProposal, buyTokens }
}