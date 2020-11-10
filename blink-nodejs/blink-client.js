{
  let socket = io('localhost:8000');
  // const socket = io('http://192.168.0.49:8000');

  const ledBlinkButton = document.querySelector('#ledBlink');
  const numBlinksInput = document.querySelector('#ledNumBlink');
  const delayBlinksInput = document.querySelector('#ledBlinkDelay');
  ledBlinkButton.addEventListener('click', () => {
      const blinkData = { 
        blinks: numBlinksInput.value,
        delay: delayBlinksInput.value,
      };
      console.log(`Blinking LED ${blinkData['blinks']} times.`);
      socket.emit('led', blinkData);
  });
}
