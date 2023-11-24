import {
    Button,
    Container,
    Nav,
    Navbar,
} from 'react-bootstrap';

export default function Header({ name, room, roomCode, showUsers, setShowUsers, setShowNameChangeAlert, showNameChangeAlert, setShowRoomChangeAlert, showRoomChangeAlert, setGlobalMessages, socket }) {
    const handleChangeNameButtonClick = () => {
        setShowNameChangeAlert(!showNameChangeAlert);
    };

    const handleShowUserButtonClick = () => {
        setShowUsers(!showUsers);
        /*
        if (room !== '0000000000') {
            setGlobalMessages([]);
            roomCode('0');
        }
        */
    };

    const handleChatRoomsButtonClick = () => {
        //setIsGlobalChat(false);
        setShowRoomChangeAlert(!showRoomChangeAlert);
    };

    return (
        <Navbar bg='light' fixed='top' expand='lg' variant='light'>
            <Container>
                <Navbar.Brand className='d-flex' href='./'>
                    G6 - Anonymous Web Chat App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto w-100'>
                        <div className='align-items-center d-flex justify-content-center me-2 my-2 ms-lg-auto ms-0'>
                            User: { name } - Room: { room }
                        </div>
                        <Button className='me-2 my-2 rounded-pill' onClick={handleChangeNameButtonClick} variant='secondary'>
                            Change Name
                        </Button>
                        <Button className='me-2 my-2 rounded-pill' onClick={handleShowUserButtonClick} variant='primary'>
                            { showUsers ? 'Show Users' : 'Show Chat' }
                        </Button>
                        <Button className='me-2 my-2 rounded-pill' onClick={handleChatRoomsButtonClick} variant='primary'>
                            Change Room
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}