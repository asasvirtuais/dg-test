import { useState } from 'react';
import Web3 from 'web3';

const useWallet = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get balance
        const web3 = new Web3(window.ethereum);
        const wei = await web3.eth.getBalance(accounts[0]);
        // Q. Why wei? A. wei is the smallest unit of Ethereum, like cents for the dollar.
        const eth = web3.utils.fromWei(wei, 'ether');
        setBalance(parseFloat(eth).toFixed(4));
      } catch (error) {
        // Added alert and throwing back the error
        alert('Error Connecting Wallet!');
        console.error('Connection failed:', error);
        throw error
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  // Send ETH
  const sendETH = async (toAddress, amount) => {
    if (!window.ethereum || !account) return;

    try {
      const web3 = new Web3(window.ethereum);
      const amountWei = web3.utils.toWei(amount, 'ether');
      
      await web3.eth.sendTransaction({
        from: account,
        to: toAddress,
        value: amountWei,
      });
      
      // Refresh balance after sending
      const wei = await web3.eth.getBalance(account);
      const eth = web3.utils.fromWei(wei, 'ether');
      setBalance(parseFloat(eth).toFixed(4));
      
      alert('Transaction sent!');
    } catch (error) {
      console.error('Send failed:', error);
      alert('Transaction failed!');
    }
  };

  return {
    account,
    balance,
    isConnected,
    connectWallet,
    sendETH
  };
};

export default useWallet;