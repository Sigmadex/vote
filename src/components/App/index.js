import './App.css';
import Navbar from '../Navbar'
import Vault from '../Vault'
import Vote from '../Vote'
import Footer from '../Footer'
// import Alert from '../Alert'
import { Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    // <div className='App'>
    <div>
      {/* <Alert /> */}
      <Navbar />

      <Routes>
        <Route index element={<h1>Home</h1>} />
        <Route path='/vault' element={<Vault />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
