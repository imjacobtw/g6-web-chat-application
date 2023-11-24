import React from 'react'
import {
    Button
} from 'react-bootstrap';

export default function ChatRooms() {
  return (
    <div className='d-flex flex-row h-100 w-100'>
        <div className='align-items-center bg-dark d-flex flex-column h-100 w-25'>
            <Button className='rounded-0 mx-2 mb-2 mt-4 w-75' style={{height: '10%'}} variant='success'>
                Create Room
            </Button>
            <Button className='rounded-0 mx-2 mb-2 w-75' style={{height: '10%'}} variant='secondary'>
                Join Room
            </Button>
        </div>
        <div className='h-100 w-75'>

        </div>
    </div>
  )
}
