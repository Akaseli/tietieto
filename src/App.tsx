import React, { useEffect } from 'react';
import { Routes, Route} from "react-router-dom"
import './App.css';
import { AppBar } from './components/AppBar';
import { SideBar } from './components/SideBar';
import { PageNotFoundPage } from './pages/404'
import { Ajoneuvot } from './pages/ajoneuvot';
import { Etusivu } from './pages/etusivu';
import { KeliKamera } from './pages/kelikamera';
import { KeliKamerat } from './pages/kelikamerat';
import { TieSää } from './pages/tiesää';
import { TieSääAsema } from './pages/tiesääasema';

function App() {
  return (
    <div>
      <AppBar />
      <SideBar />
      <div className='content'>
        <Routes>
          <Route path="/" element={<Etusivu/>} />
            <Route path="/tiesaa" element={<TieSää />}/>
              <Route path="/tiesaa/:stationId" element={<TieSääAsema/>}/>
            <Route path="/kelikamerat" element={<KeliKamerat/>}/>
              <Route path="/kelikamerat/:stationId" element={<KeliKamera/>}/>
            <Route path="/ajoneuvot" element={<Ajoneuvot />}/>
            <Route path="*" element={<PageNotFoundPage error='Sivua ei löydetty!'/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
