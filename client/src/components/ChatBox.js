import React from 'react';
import {
    Col,
    Row,
} from 'react-bootstrap';

import GlobalChat from './GlobalChat';
import UserList from './UserList';

export default function ChatBox({ globalMessages, users, showUsers, name }) {
    return (
        <Row className='overflow-auto' style={{height: '78%', 'max-height': '78%'}}>
            <Col>{showUsers ? <GlobalChat globalMessages={globalMessages} name={name} /> : <UserList users={users}/>}</Col>
        </Row> 
    );
}
