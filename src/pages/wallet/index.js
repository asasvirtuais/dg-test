import Header from '../../components/header';
import Footer from '../../components/footer';
import WalletComponent from '../../components/wallet';
import './index.css';

function Wallet() {
  return (
    <div>
      <div className="header_section">
        <Header />
      </div>
      <WalletComponent />
      <Footer />
    </div>
  );
}

export default Wallet;