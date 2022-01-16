import React from 'react';
import { Routes, Route, Link } from "react-router-dom"
import './App.css';
import { AppBar } from './components/AppBar';
import { PageNotFoundPage } from './pages/404'
import { TieSää } from './pages/tiesää';
import { TieSääAsema } from './pages/tiesääasema';

function App() {
  return (
    <div>
      <AppBar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<p>Sisältö</p>} />
            <Route path="/tiesaa" element={<TieSää />}/>
              <Route path="/tiesaa/:stationId" element={<TieSääAsema/>}/>
            <Route path="*" element={<PageNotFoundPage error='Sivua ei löydetty!'/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
