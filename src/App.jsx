import React from 'react';

import Grid from './components/Grid';
import InputGif from './components/InputGif';

import useGif from './hooks/useGif';
import usePhantom from './hooks/usePhantom';

import { AUTHOR, TWITTER_AUTHOR, TWITTER_HANDLE, TWITTER_LINK } from './config/constants';

import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

const App = () => {

  const { connectWallet, walletAddress } = usePhantom();
  const { gifList, createGifAccount, sendGif, addLike } = useGif(walletAddress);

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => gifList === null ?
  (
    <div className="connected-container">
      <button className="cta-button submit-gif-button" onClick={createGifAccount}>
        Do One-Time Initialization For GIF Program Account
      </button>
    </div>
  ) : (

    <div className="connected-container">
      <InputGif sendGif={sendGif} />
      <Grid gifs={gifList} addLike={addLike} walletAddress={walletAddress} />
    </div>
  );

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">InstaGIF 😎</p>
          <p className="sub-text">
            The best GIF collection in the metaverse ✨
          </p>
          {walletAddress
            ?
            renderConnectedContainer()
            :
            renderNotConnectedContainer()
          }
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
          {`by`}
          <a
            className="footer-text"
            href={TWITTER_AUTHOR}
            target="_blank"
            rel="noreferrer"
          >{AUTHOR}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
