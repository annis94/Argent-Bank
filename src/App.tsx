import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

// Configure les futures flags directement dans notre composant
const routerBasename = "/";
const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
};

function App() {
  return (
    <Provider store={store}>
      {/* @ts-ignore - Les futures flags ne sont pas encore dans les types */}
      <Router basename={routerBasename} future={routerFutureConfig}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;