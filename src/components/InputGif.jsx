import React, { useState } from 'react';

const InputGif = ({ sendGif }) => {
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
      await sendGif(inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        onChange={onInputChange} 
        placeholder="Enter gif link!" 
        value={inputValue}
      />
      <button type="submit" className="cta-button submit-gif-button">Submit</button>
    </form>
  )
}

export default InputGif;