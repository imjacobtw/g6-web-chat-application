import React from 'react'

import ChatBubble from './ChatBubble';

export default function GlobalChat({ globalMessages, name}) {
  return (
    <div className='h-100 w-100'>
      {
        globalMessages.map(messageObj => (
          <div className={'d-flex flex-column w-100 ' + (messageObj.iSent ? 'align-items-end' : 'align-items-start')}>
            {
              <>
                <ChatBubble isOwnUser={messageObj.iSent} message={messageObj.message}/>
                <div className='text-secondary'>{messageObj.sender}</div>
              </>
            }
          </div>
        ))
      }
    </div>
  )
}
