import React, { useState } from 'react';
import useWallet from '../../hooks/useWallet';

const WalletComponent = () => {
  const { account, balance, isConnected, connectWallet, sendETH } = useWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = () => {
    if (toAddress && amount) {
      sendETH(toAddress, amount);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">ETH Wallet</h2>

              {/* Connection Section */}
              <div className="mb-4">
                <h5>Connection</h5>
                <button 
                  className="btn btn-primary" 
                  onClick={connectWallet}
                  disabled={isConnected}
                >
                  {isConnected ? 'Connected' : 'Connect MetaMask'}
                </button>
              </div>

              {/* Wallet Info */}
              <div className="mb-4">
                <h5>Wallet Info</h5>
                <div className="mb-2">
                  <label>Address:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={account} 
                    readOnly 
                    placeholder="Not connected"
                  />
                </div>
                <div className="mb-2">
                  <label>Balance:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={balance + ' ETH'} 
                    readOnly 
                  />
                </div>
              </div>

              {/* Send ETH Section */}
              <div className="mb-4">
                <h5>Send ETH</h5>
                <div className="mb-2">
                  <label>To Address:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="0x..." 
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label>Amount (ETH):</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="0.01" 
                    step="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <button 
                  className="btn btn-success" 
                  onClick={handleSend}
                  disabled={!isConnected}
                >
                  Send ETH
                </button>
              </div>

              {/* Receive ETH Section */}
              <div className="mb-4">
                <h5>Receive ETH</h5>
                <p>Share your address above to receive ETH payments.</p>
                <button 
                  className="btn btn-info"
                  onClick={() => {
                    navigator.clipboard.writeText(account)
                    alert('Address copied to clipboard!')
                  }}
                  disabled={!isConnected}
                >
                  Copy Address
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletComponent;