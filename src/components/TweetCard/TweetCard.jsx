import React from 'react'

import * as style from './TweetCard.module.css'

const fakeData = {
  id: '2464325',
  text: 'Il testo del tweet',
  author: {
    id: '2445651',
    name: 'Dan Caccia',
    username: '@dancaccia'
  }
}


const TweetCard = () => {
  return (
    <div card={style.border= "thin solid #000000"}>
      
      <p style="text-align:left">
      <img src="twitter-logo.jpg" alt="propic"/>
        ${fakeData.author.name}\n${fakeData.author.username}\n${fakeData.author.username}
      
      </p>

    </div>
  )
}

export default TweetCard
