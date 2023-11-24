import React from 'react';
import {
    Container,
    Row,
} from 'react-bootstrap';

import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

export default function ChatContainer({ globalMessages, users, showUsers, name, setGlobalMessages, socket, room, scrollChat }) {
  return (
    <>
      <div className='w-100'>
        <Container className='vh-100'>
          <Row style={{height: '12%'}}></Row>
          <ChatBox 
            globalMessages={globalMessages}
            users={users}
            showUsers={showUsers} 
            name={name} />
          <ChatInput
            globalMessages={globalMessages}
            name={name}
            setGlobalMessages={setGlobalMessages}
            socket={socket}
            room={room}
            scrollChat={scrollChat}
          />
        </Container>
      </div>
    </>
  );
}
