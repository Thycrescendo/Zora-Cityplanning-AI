import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { COIN_ADDRESS, COIN_ABI } from './constants';
import type { Coin } from '@zoralabs/coins-sdk'; // Import type if available

interface CoinFunctions {
  mintProposal: (name: string, symbol: string, metadataUri: string) => Promise<void>;
  buyTokens: (amount: string, recipient?: string) => Promise<void>;
  sellTokens: (amount: string, recipient?: string) => Promise<void>;
  getBalance: (address: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

export function useCoin(): CoinFunctions {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize contract with signer
  useEffect(() => {
    const initContract = async () => {
      if (!window.ethereum) return;

      try {
        setIsLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const coinContract = new ethers.Contract(COIN_ADDRESS, COIN_ABI, signer);
        setContract(coinContract);
        setError(null);
      } catch (err) {
        setError('Failed to initialize contract');
        console.error('Contract init error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initContract();
  }, []);

  const mintProposal = async (name: string, symbol: string, metadataUri: string) => {
    if (!contract) {
      setError('Contract not initialized');
      return;
    }

    try {
      setIsLoading(true);
      const tx = await contract.createToken(
        name,
        symbol,
        metadataUri, // Store AI metadata
        100, // 1% referral fee (100 basis points)
      );
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Minting failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const buyTokens = async (amount: string, recipient?: string) => {
    if (!contract) {
      setError('Contract not initialized');
      return;
    }

    try {
      setIsLoading(true);
      const signer = await contract.signer.getAddress();
      const tx = await contract.buy(
        recipient || signer, // Default to connected wallet
        ethers.parseEther(amount),
        0, // minAmountOut
        0, // sqrtPriceLimitX96
        '0xYOUR_APP_ADDRESS' // Replace with your referrer address
      );
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Buy failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sellTokens = async (amount: string, recipient?: string) => {
    if (!contract) {
      setError('Contract not initialized');
      return;
    }

    try {
      setIsLoading(true);
      const signer = await contract.signer.getAddress();
      const tx = await contract.sell(
        recipient || signer,
        ethers.parseEther(amount),
        0,
        0,
        '0xYOUR_APP_ADDRESS'
      );
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sell failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getBalance = async (address: string): Promise<string> => {
    if (!contract) {
      setError('Contract not initialized');
      return '0';
    }

    try {
      const balance = await contract.balanceOf(address);
      return ethers.formatEther(balance);
    } catch (err) {
      setError('Failed to fetch balance');
      return '0';
    }
  };

  return {
    mintProposal,
    buyTokens,
    sellTokens,
    getBalance,
    isLoading,
    error
  };
}