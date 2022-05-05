import { useState, useEffect, useContext } from 'preact/hooks';
import { createContext } from 'preact';
import { useNavigate, useLocation, Navigate, useSearchParams } from 'react-router-dom';
import { SocketContext } from '../context/socket';

import { Section, Card, Legend, Input, GlobalStyle, CtaButton } from "./GlobalStyles"

export default function JoinRoom(props) {

  const socket = useContext(SocketContext);
  const [room, setRoom] = useState('');
  const [hasJoined, setHasJoined] = useState(false);

  const navigate = useNavigate();
  const joinRoom = (e) => {
    e.preventDefault()
    if (room === '') return;

    socket.emit('joinRoom?', room);
    //Push state and give it a key to prevent url from being accessed via url, kind of like a post request
    //history.pushState({state: "Test"}, "", `/rooms/${room}`);
    //Navigate to the new url
    //navigate(`/rooms/${room}`);
    //navigate with state
    navigate(`/rooms/${room}`, { state: "JOINED" });
    
  };

  const urlParams = new URLSearchParams(location.search)
  const updateRoom = (e) => {
    setRoom(e.target.value);

    if (e.target.value) {

      history.replaceState(null, "", `/join?room=${e.target.value}`);
    }
    else {
      history.replaceState(null, "", `/join`);
    }
  }

  useEffect(() => {

    //If connection to room failed, show error message
    socket.on('roomNotFound', (error) => {
      alert(error.message);
    });

    socket.on('joinedRoom', (status) => {
      setHasJoined(status.joined);
      console.log(status.joined);
      console.log(`${status.user} successfully joined ${status.room}!`);

    });
  }, [socket]);
  
  return (
    <>
    <GlobalStyle/>
    <Section>
    <Card>
    <form onSubmit={joinRoom}>
      <Legend>Room code</Legend>
      <Input
        value={urlParams.get("room")}
        onChange={updateRoom}
        type="text"
        placeholder="12345"
      />
      <CtaButton>Join</CtaButton>
    </form>
      {/* {hasJoined && (<Navigate state={{test: "FF"}} to={`/rooms/${room}`} />)} */}
    </Card>
    </Section>
    </>
  );
}
