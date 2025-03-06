import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SellItemPage from './components/ItemSelling';
import ItemViewPage from './components/ItemView';
import './index.css';
import {ThemeProvider}from './components/ThemeContext'

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemViewPage />} /> 
            <Route path="/post" element={<SellItemPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;