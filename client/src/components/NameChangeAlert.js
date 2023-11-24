import { useState } from 'react';
import {
    Alert,
    Button,
    Form,
} from 'react-bootstrap';

export default function NameChangeAlert({ setNameFunc, setShowNameChangeAlert, showNameChangeAlert }) {
    const [textInput, setTextInput] = useState('');

    const handleInputChange = (event) => {
            setTextInput(event.target.value);
    };

    const onClick = () => {
        setShowNameChangeAlert(!showNameChangeAlert);
        if (textInput !== '') {
            setNameFunc(textInput);
        }
    };
    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setShowNameChangeAlert(!showNameChangeAlert);
            if (textInput !== '') {
                setNameFunc(textInput);
            }
        }
    }

    return (
        <div
            className='align-items-center d-flex h-100 justify-content-center position-absolute w-100'
            style={{"pointer-events": showNameChangeAlert ? "auto" : "none"}}
        >
            <Alert show={showNameChangeAlert} variant='secondary'>
                <Alert.Heading variant='success'>What would you like your name to be?</Alert.Heading>
                <Form.Control
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <div className='mt-3 w-100'>
                    <Button className='w-100' onClick={onClick} variant='primary'>Change Name</Button>
                </div>
            </Alert>
        </div>
    );
}
