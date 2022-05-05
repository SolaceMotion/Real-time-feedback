import { useContext, useEffect, useState } from 'preact/hooks';
import { SocketContext } from '../context/socket';

import { Section, Card, Legend, Input, GlobalStyle, CtaButton } from "./GlobalStyles"
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Admin() {
  const socket = useContext(SocketContext);
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()
  
  useEffect(() => {
    //Admin authorization
    if (searchParams.get("token") !== "admin") {
      navigate("/join")
    }

    console.log(searchParams.get("token"));
    //Get all rooms initially
    socket.emit('fetchRooms');

    socket.on('fetchRooms', (rooms) => {
      setRooms(rooms);
    });

    socket.on('roomCreated', ({ created, message }) => {
      alert(message);
      if (created) return socket.emit('fetchRooms');
    });
  }, [socket]);

  return (
    <>
    <GlobalStyle />
    <Section>
    <Card>
    <Legend>Admin panel</Legend>
      <p>Available rooms</p>
      {/* Entries returns a list of pairs */}
      {Object.entries(rooms).map(([roomName, count]) => (
        <div>
          {roomName}: {count}
        </div>
      ))}

      <Input onChange={(e) => setNewRoom(e.target.value)} type="text" />
      <CtaButton onClick={() => socket.emit('createRoom', newRoom)}>
        Create a room
      </CtaButton>
    </Card>
    </Section>
      </>
   
  );
}
