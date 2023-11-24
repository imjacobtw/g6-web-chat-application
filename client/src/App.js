import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatContainer from './components/ChatContainer';
import Header from './components/Header';
import NameChangeAlert from './components/NameChangeAlert';
import RoomChangeAlert from './components/RoomChangeAlert';
import ANIMALS from './data/animals';


const socket = io.connect('http://localhost:8081');

export default function App() {
    const [name, setName] = useState('Anonymous ' + ANIMALS[Math.floor(Math.random() * ANIMALS.length)]);
    const [showNameChangeAlert, setShowNameChangeAlert] = useState(false);
    const [room, setRoom] = useState('0000000000');
    const [showRoomChangeAlert, setShowRoomChangeAlert] = useState(false);
    const [globalMessages, setGlobalMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState([]);

    function setNameFunc(newName) {
        if (newName !== name) {
            let tempName = newName.slice(0, 32);
            socket.emit('set_username', tempName);
            setName(tempName);
        }
    }
	
    function statusMessage(messageText) {
        setGlobalMessages([
                ...globalMessages,
                {
                    message: messageText,
                    sender: ''
                }
            ]);
        scrollChat();
    }
    
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    
    async function scrollChat() {
        await delay(5);
        const scrollbar = document.querySelectorAll('div.overflow-auto.row');
        scrollbar[0].scrollTo(0, scrollbar[0].scrollHeight);
    }
    
    async function privateErase(msg) {
        await delay(5);
        console.log(msg);
        setGlobalMessages([{
                    message: msg.message,
                    sender: '',
                }]);
    }
    
    function roomCode(code, privateBool, passInput) {
        let newCode = '';
        for (let i = 0; i < 10; i++) {
            if (i < code.length) {
                let codeChar = code.charCodeAt(code.length - 1 - i);
                if (!(codeChar > 47 && codeChar < 58) && // numeric (0-9)
                    !(codeChar > 64 && codeChar < 91) && // upper alpha (A-Z)
                    !(codeChar > 96 && codeChar < 123)) { // lower alpha (a-z)
                    newCode = '0'.concat(newCode);
                }
                else {
                    newCode = code.charAt(code.length - 1 - i).concat(newCode);
                }
            }
            else {
                newCode = '0'.concat(newCode);
            }
        }
        if (privateBool) {
            return privateRoom(newCode, passInput);
        }
        
        if (newCode !== room && code !== '') {
            setGlobalMessages([]);
            socket.emit('leave_room', room);
            setRoom(newCode);
            socket.emit('join_room', newCode);
        }
    }

    function privateRoom(code, passInput) {
        if (passInput.length < 1 || code.length < 1) {
            return;
        }
        if (passInput.length > 32) {
            statusMessage('Password limit is 32 characters');
            return;
        }
        for (let i = 0; i < passInput.length; i++) {
            if (passInput.charCodeAt(i) < 32 || passInput.charCodeAt(i) > 126) {
                statusMessage('Invalid character in password');
                return;
            }
        }
        socket.emit('join_private_room', {
            pass: passInput,
            room: code,
        });
    }

    useEffect(() => {
        document.title = 'G6 : ' + room + ' - ' + name;
		
		socket.on('connect', () => {
            statusMessage('You have connected');
			socket.emit('set_username_quiet', name);
            socket.emit('join_room', room);
		});
        
        socket.on('enter_private_room', (data) => {
            setRoom(data.room);
            privateErase(data);
        });
        
        socket.on('deny_private_room', () => {
            statusMessage('Room occupied / Incorrect password');
        });
        
        socket.on('recieve_room_users', (data) => {
            setUsers(data);
        });
        
        
        socket.on('receive_global_message', (data) => {
            setGlobalMessages([
                ...globalMessages,
                {
                    message: data.message,
                    sender: data.sender
                }
            ]);
            scrollChat();
        });
		
		socket.on('connect_error', () => {
			setTimeout(() => socket.connect(), 5000);
		});
		
		socket.on('disconnect', () => {
            statusMessage('You have been disconnected');
		});
    });

    console.log(globalMessages);

    return ( 
    <div className = 'd-flex flex-column min-vh-100 overflow-auto vh-100' >
        <Header 
            name = {name}
            room = {room}
            roomCode = {roomCode}
            showUsers = {showUsers}
            setShowUsers = {setShowUsers}
            setShowNameChangeAlert = {setShowNameChangeAlert}
            showNameChangeAlert = {showNameChangeAlert}
            setShowRoomChangeAlert = {setShowRoomChangeAlert}
            showRoomChangeAlert = {showRoomChangeAlert}
            setGlobalMessages = {setGlobalMessages}
            socket = {socket}
        /> 
        <ChatContainer 
            globalMessages = {globalMessages}
            users = {users}
            showUsers = {showUsers}
            name = {name}
            setGlobalMessages = {setGlobalMessages}
            socket = {socket}
            room = {room}
            scrollChat = {scrollChat}
        />
        <NameChangeAlert 
            setNameFunc = {setNameFunc}
            setShowNameChangeAlert = {setShowNameChangeAlert}
            showNameChangeAlert = {showNameChangeAlert}
        /> 
        <RoomChangeAlert 
            room = {room}
            roomCode = {roomCode}
            setShowRoomChangeAlert = {setShowRoomChangeAlert}
            showRoomChangeAlert = {showRoomChangeAlert}
            setGlobalMessages = {setGlobalMessages}
            socket = {socket}
        /> 
        </div>
    );
}