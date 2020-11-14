// Lego Power Functions IR protocol library, written by Roland Wiersma
#include <legopowerfunctions.h>

#define NUM_SPEEDS 8

// Object for communicating with IR transmitter, connect to pin 7
LEGOPowerFunctions legoRemote(7);

void setup() {
  Serial.begin(115200);
}

void loop() {
  // 1. Check serial port to see if there is data to be read.
  if (Serial.available() > 0) {
    // 2. Read serial port data into strings
    // Direction - values are 'fwd' or 'rev'
    String direction = Serial.readStringUntil(':');
    // Speed - values are 1, 2, 3, 4, 5, 6, or 7
    int speed = Serial.readStringUntil(':').toInt();
    // Motor - values are 0 or 1
    int motor = Serial.readStringUntil(':').toInt();

    // Derive step argument needed by legoRemote object method SingleOutput() 
    // step values:
    //  0: stop
    //  1-7: forward, the higher the number, the higher the speed
    //  15-9: reverse, the lower the number, the higher the speed
    // Add offset if direction is reverse to get step value
    int offset = 0;
    if (direction.equals("rev")) {
      offset = (NUM_SPEEDS - speed)*2;
    }
    int step = speed + offset;

    // 3. Send motor command - arguments are mode, step, output, channel
    legoRemote.SingleOutput(PWM, step, motor, CH2);
  }
}
