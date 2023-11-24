import React from 'react'

import {
    Button
} from 'react-bootstrap';

export default function UserList({ users }) {
  return (
    <div className='h-100 w-100'>
      {
        users.map(userObj => (
          <div className={'align-items-center d-flex flex-column w-100'}>
            {
              <>
                <Button className='rounded-0 mx-2 mb-2 mt-4 w-75' style={{height: '10%', 'border-radius': '16px'}} variant='success'>
                    {userObj}
                </Button>
              </>
            }
          </div>
        ))
      }
    </div>
  )
}
/*
<div className='h-100 w-100'>
      {
        globalMessages.map(messageObj => (
          <div className={'d-flex flex-column w-100 ' + (messageObj.sender === name ? 'align-items-end' : 'align-items-start')}>
            {
              <>
                <ChatBubble isOwnUser={messageObj.sender === name} message={messageObj.message}/>
                <div className='text-secondary'>{messageObj.sender}</div>
              </>
            }
          </div>
        ))
      }
    </div>

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
   */