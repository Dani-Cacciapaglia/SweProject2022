import React from 'react';

import Logo from '../assets/twitter-logo.jpg';

const Header = () => {
  return (
    <header className="flex flex-row justify-center items-center gap-2 p-4">
      <img src={Logo} alt="Twitter Logo" className="h-12" />
      <h1 className="text-xl font-bold">Tweets and sweets</h1>
    </header>
  );
};

export default Header;
