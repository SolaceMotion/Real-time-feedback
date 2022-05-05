import { Logo } from './logo';
import { useState, useEffect } from 'preact/hooks';
import { SocketContext, socket } from './context/socket';
import JoinRoom from './components/JoinRoom';
import Admin from './components/Admin';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom';
import RoomInfo from './components/RoomInfo';
import DarkMode from './components/DarkMode';

export function App(props) {
  
  return (
    <SocketContext.Provider value={socket}>
      <DarkMode />
      <BrowserRouter>
        <Routes>
          <Route path="/join"  element={<JoinRoom />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/rooms/:roomId" element={<RoomInfo />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  );
}
