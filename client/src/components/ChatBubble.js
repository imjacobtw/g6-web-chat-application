import React from 'react'

export default function ChatBubble({ isOwnUser, message }) {
    const styles =
    'align-items-center d-flex h-auto p-3 my-2 justify-content-start' //rounded-pill
    + ' bg-' + (isOwnUser ? 'primary' : 'light')
    + ' text-' + (isOwnUser ? 'light' : 'dark');
    
    //styles.innerHTML = '#target {color: blueviolet}'

  return (
    <div 
        className={styles}
        style={{width: 'fit-content', 'border-radius': '16px'}}
        //style={{border-radius: 16px}}
    >
        { message }
    </div>
  )
}
