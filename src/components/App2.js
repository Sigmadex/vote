import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom';
import Test from './Test'
const AuthContext = createContext(null) // null is the initial value
// export default AuthContext
const AddressContext = createContext(null) // custom provider (usage: <AddressContext.Provider value={value}>)

const App2 = () => {
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={token}>
      <h1>React Router</h1>

      <Navigation token={token} onLogout={handleLogout} />

      <Routes>
        <Route index element={<Home onLogin={handleLogin} />} />
        <Route path="home" element={<Home onLogin={handleLogin} />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="test" element={<Test />} />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const Navigation = ({ token, onLogout }) => {
  return (
    <nav>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>

      {token && (
        <button type="button" onClick={onLogout}>
          Sign Out
        </button>
      )}
    </nav>
  );
};

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const Home = ({ onLogin }) => {
  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>
    </>
  );
};

const Dashboard = () => {
  const token = useContext(AuthContext);

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </>
  );
};

const NoMatch = () => {
  return (
    <>
      <h2>NoMatch (Not Found)</h2>
    </>
  );
};

export default App2;
