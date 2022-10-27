import * as React from "react";

import * as style from './index.module.css';

import { Header } from '../components/Header/Header';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

const IndexPage = () => {
  return (
    <main>
      <Header />
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

