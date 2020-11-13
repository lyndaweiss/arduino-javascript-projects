{
  let socket = io('localhost:8000');
  
  const ledBlinkButton = document.querySelector('#ledBlink');
  const numBlinksInput = document.querySelector('#ledNumBlink');
  const delayBlinksInput = document.querySelector('#ledBlinkDelay');
  ledBlinkButton.addEventListener('click', () => {
      const blinkData = { 
        blinks: numBlinksInput.value,
        delay: delayBlinksInput.value,
      };

      socket.emit('led', blinkData);
  });
}
