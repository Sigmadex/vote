import './App.css';
import Navbar from '../Navbar'
import Vault from '../Vault'
import Vote from '../Vote'
import Test from '../Test'
import StickyFooter from '../StickyFooter'
import Footer from '../Footer'
// import Alert from '../Alert'
import { Routes, Route, Link } from 'react-router-dom'

const Home = () =>
  <>
    <Link to='/vote'>Vote</Link>
    <Link to='/vault'>Vault</Link>
  </>

function App() {
  return (
    // <div className='App'>
    <div>
      {/* <Alert /> */}
      <Navbar />

      <Routes>
        <Route index element={<Home />} />
        <Route path='/vault' element={<Vault />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/test' element={<Test />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>

      <Footer />
      {/* <StickyFooter /> */}
    </div>
  );
}

export default App;
