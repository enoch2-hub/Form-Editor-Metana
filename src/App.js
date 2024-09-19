import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Welcome from './components/Welcome/Welcome';
import Email from './components/Email/Email';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/welcome" />}/>
        <Route path="/welcome" exact element={<Welcome />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </Router>
  );
}

export default App;
