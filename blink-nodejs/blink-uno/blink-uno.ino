void setup() {
  // Pin 7 is connected to the LED, set it to be an output
  pinMode(7, OUTPUT);

  // Open serial port and set baud rate
  Serial.begin(115200);
}

void loop() {
  // 1. Check serial port to see if there is data to be read.
  if (Serial.available() > 0) {
    // 2. Read serial port data into strings
    // Number of times LED blinks
    int numBlinks = Serial.readStringUntil(':').toInt();
    // Milliseconds between blinks
    int blinkDelay = Serial.readStringUntil(':').toInt();

    // 3. Blink the LED
    for (int i=0;i<numBlinks;i++) {
      digitalWrite(7, HIGH);
      delay(blinkDelay);
      digitalWrite(7, LOW);
      delay(blinkDelay);
    }
  }
}
