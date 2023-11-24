import { useState } from 'react';
import {
    Alert,
    Button,
    Form,
} from 'react-bootstrap';

export default function RoomChangeAlert({ room, roomCode, setShowRoomChangeAlert, showRoomChangeAlert, setGlobalMessages, socket }) {
    const [textInput, setTextInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [joiningPrivate, setJoiningPrivate] = useState(false);

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };
    
    const handlePassChange = (event) => {
        setPassInput(event.target.value);
    };

    const onClick = () => {
        if (room !== textInput && textInput !== '') {
            roomCode(textInput, joiningPrivate, passInput);
        }
        console.log('text: ' + textInput);
        setShowRoomChangeAlert(!showRoomChangeAlert);
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (room !== textInput && textInput !== '') {
                roomCode(textInput, joiningPrivate, passInput);
            }
            console.log('text: ' + textInput);
            setShowRoomChangeAlert(!showRoomChangeAlert);
        }
    };
    
    const roomPrivacyToggle = () => {
        setJoiningPrivate(!joiningPrivate);
    };

    return (
        <div
            className='align-items-center d-flex h-100 justify-content-center position-absolute w-100'
            style={{"pointer-events": showRoomChangeAlert ? "auto" : "none"}}
        >
            <Alert show={showRoomChangeAlert} variant='secondary'>
                <Alert.Heading variant='success'>What room would you like to join?</Alert.Heading>
                <div className='mt-3 w-100'>
                    <Button className='me-2 my-2 rounded-pill' onClick={roomPrivacyToggle} variant='primary'>
                                { joiningPrivate ? 'Private' : 'Public' }
                    </Button>
                </div>
                <Form.Control
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder= { textInput === '' ? 'Room Code' : textInput }
                />
                <div>{joiningPrivate ? 
					<Form.Control 
						onChange={handlePassChange} 
						onKeyDown={handleKeyDown} 
						placeholder= { passInput === '' ? 'Room Password' : passInput }/> 
					: <> </> 
				}</div>
                <div className='mt-3 w-100'>
                    <Button className='w-100' onClick={onClick} variant='primary'>Change Room</Button>
                </div>
            </Alert>
        </div>
    );
}
