import { useState } from 'react';
import {
    Button,
    Col,
    Form,
    Row,
} from 'react-bootstrap';

export default function ChatInput({ globalMessages, name, setGlobalMessages, socket, room, scrollChat }) {
    const [textInput, setTextInput] = useState('');

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const onClick = () => {
        socket.emit('send_global_message', {
            message: textInput,
            sender: name,
            room: room,
        });
        setGlobalMessages([
            ...globalMessages,
            {
                message: textInput,
                sender: name,
				iSent: true,
            }
        ]);
        setTextInput('');
        scrollChat();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            socket.emit('send_global_message', {
                message: textInput,
                sender: name,
                room: room,
            });
            setGlobalMessages([
                ...globalMessages,
                {
                    message: textInput,
                    sender: name,
					iSent: true,
                }
            ]);
            setTextInput('');
            scrollChat();
        }
    }

    return (
        <Row style={{height: '10%'}}>
            <Col className='d-flex flex-row'>
                <div className='align-items-center d-flex h-100 justify-content-center w-75'>
                    <Form.Control
                        className='h-75 rounded-pill'
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={textInput}
                    />
                </div>
                <div className='align-items-center d-flex h-100 justify-content-center w-25'>
                    <Button
                        className='h-75 rounded-pill w-75'
                        onClick={onClick}
                        variant='primary'>
                        Send
                    </Button>
                </div>
            </Col>
        </Row> 
    );
}
