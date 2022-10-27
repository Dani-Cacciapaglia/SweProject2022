import React from 'react'

import * as style from './Header.module.css';

import Logo from '../../assets/twitter-logo.jpg';

export const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.logo}>
        <img src={Logo} alt="Twitter Logo" className={style.imgLogo} />
        <h1>Tweets and sweets</h1>
      </div>
    </header>
  )
}
