import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export function useWallet() {
  const [userAddress, setUserAddress] = useState('')

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      setUserAddress(accounts[0])
    } else {
      alert('Install MetaMask!')
    }
  }

  return { userAddress, connect }
}