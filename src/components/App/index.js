import './App.css';
import Navbar from '../Navbar'
import Vault from '../Vault'
import Vote from '../Vote'
import Footer from '../Footer'
// import Alert from '../Alert'

function App() {
  return (
    <div className='App'>
      {/* <Alert /> */}
      <Navbar />
      <Vault />
      <Vote />
      <Footer />
    </div>
  );
}

export default App;
