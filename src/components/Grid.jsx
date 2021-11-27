import React from 'react';

const hasLike = (likes, wallet) => 
  likes.some( publicKey => publicKey.toString() === wallet )

const Grid = ({gifs = [], addLike, walletAddress}) => {
  const handleLike = (gif) => async () => {
    if (!hasLike(gif.likes, walletAddress)) {
      await addLike(gif.id);
    }
  }

  return (
    <div className="gif-grid">
      {gifs.map((gif, index) => (
        <div className="gif-item" key={index}>
          <div className="likes">{`Likes: ${gif.likes.length}`}</div>
          <div className="btn-like" onClick={handleLike(gif)}>
            {hasLike(gif.likes, walletAddress) ? `💜`: `🤍`}
          </div>
          <img src={gif.gifLink} alt={gif.gifLink} />
          <div className="address">{gif.userAddress.toString()}</div>
        </div>
      ))}
    </div>
  )
}

export default Grid;