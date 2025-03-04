import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import SellItemPage from './components/ItemSelling';
import ItemViewPage from './components/ItemView';
import './index.css';

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/item" element={<ItemViewPage/>} />
        <Route path="/post" element={<SellItemPage/>} />
      </Routes>
    </Router>
  )
}

export default App;  