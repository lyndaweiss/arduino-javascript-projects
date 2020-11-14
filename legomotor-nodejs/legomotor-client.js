(function () {
  let socket = io("localhost:8000");

  const motorStart = document.querySelectorAll(".btn-start");
  const motorStop = document.querySelectorAll(".btn-stop");
  const motor1Direction = document.querySelectorAll(
    'input[name="motor1-direction"]'
  );
  const motor2Direction = document.querySelectorAll(
    'input[name="motor2-direction"]'
  );
  const motorDirection = [...motor1Direction, ...motor2Direction]; // Array of directions for both motors
  const motorSpeed = document.querySelectorAll(".in-speed");

  let running = [false, false]; // Running status for both motors

  // Helper functions
  function getMotorDirection(motor) {
    // Get the checked button that goes with the motor corresponding to the argument
    const checkedButton = motorDirection.find((current) => {
      return (
        current.checked && current.closest(".container").dataset.motor === motor
      );
    });

    return checkedButton.value;
  }

  function sendMotorCommand(direction, speed, motor) {
    const motorData = {
      direction: direction,
      speed: speed,
      motor: motor,
    };
    socket.emit("motor", motorData);
  }

  // Event Listeners
  motorStart.forEach((startButton) => {
    startButton.addEventListener("click", (event) => {
      const motor = event.target.closest(".container").dataset.motor;
      const direction = getMotorDirection(motor);
      const speed = motorSpeed[motor].value;
      sendMotorCommand(direction, speed, motor);
      running[motor] = true;
    });
  });

  motorStop.forEach((stopButton) => {
    stopButton.addEventListener("click", (event) => {
      const motor = event.target.closest(".container").dataset.motor;
      sendMotorCommand("fwd", 0, motor);
      running[motor] = false;
    });
  });

  // Change motor direction if running
  motorDirection.forEach((directionButton) => {
    directionButton.addEventListener("click", (event) => {
      const motor = event.target.closest(".container").dataset.motor;
      if (running[motor]) {
        const direction = event.target.value;
        const speed = motorSpeed[motor].value;
        sendMotorCommand(direction, speed, motor);
      }
    });
  });

  // Change motor speed if running
  motorSpeed.forEach((speedControl) => {
    speedControl.addEventListener("change", (event) => {
      const motor = event.target.closest(".container").dataset.motor;
      if (running[motor]) {
        const direction = getMotorDirection(motor);
        const speed = event.target.value;
        sendMotorCommand(direction, speed, motor);
      }
    });
  });
})();
