import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Add Base Mainnet/Testnet RPC URLs
const BASE_MAINNET_RPC = 'https://mainnet.base.org';
const BASE_TESTNET_RPC = 'https://goerli.base.org';

export function useWallet() {
  const [userAddress, setUserAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check connection status on load
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setUserAddress(accounts[0]);
            setIsConnected(true);
            initProvider();
          }
        } catch (err) {
          setError('Failed to check wallet connection');
        }
      }
    };
    checkConnection();
  }, []);

  // Initialize ethers provider
  const initProvider = () => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    }
  };

  // Connect wallet with Base Network switching
  const connect = async () => {
    if (!window.ethereum) {
      setError('MetaMask not installed');
      alert('Please install MetaMask!');
      return;
    }

    try {
      // Switch to Base Network (Testnet in this example)
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x14A33', // Base Goerli Testnet
          chainName: 'Base Goerli',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: [BASE_TESTNET_RPC],
          blockExplorerUrls: ['https://goerli.basescan.org/']
        }]
      });

      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      setUserAddress(accounts[0]);
      setIsConnected(true);
      initProvider();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      console.error('Wallet connection error:', err);
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setUserAddress('');
    setIsConnected(false);
    setProvider(null);
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setUserAddress(accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return { 
    userAddress, 
    isConnected, 
    connect, 
    disconnect, 
    provider,
    error 
  };
}