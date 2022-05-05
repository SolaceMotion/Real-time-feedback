import { useEffect, useContext, useState } from 'preact/hooks';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { SocketContext } from '../context/socket';

export default function RoomInfo(props) {
  const { roomId } = useParams();
  const socket = useContext(SocketContext);

  const [exists, setExists] = useState(false);

  const [roomData, setRoomData] = useState({
    roomName: null,
    userCount: null,
  });

  const locState = useLocation()
  const navigate = useNavigate();

  const handleLeave = () => {
    socket.emit('leaveRoom');

    navigate('/')
  }

  useEffect(() => {

    //Get state via hook
    console.log(locState.state)

    //Get state via history
    console.log(history.state)

    socket.emit('roomExists?', roomId);

    socket.on('roomExists', (data) => {
      setExists(data.exists);

      //If room exists 
      socket.emit('fetchRoom?', roomId);
    });

    //fetches room data
    socket.on('fetchRoom', (roomData) => {
      setRoomData(roomData);
    });

  }, [socket]);

  return (
    <>
      {/* If there is a key state, url was processed in input and cannot be accessed through URL */}
      {history.state.key ? (
      <>
        <div>
          people in room: 
          {exists ? <h1>{roomData.userCount}</h1> : <div>no</div>}</div>
  
          <button onClick={handleLeave}>Leave room</button>
          </>
      ) : (
        <>
          <h1>You do not have access</h1>
        </>
      )}
    </>
  );
}
