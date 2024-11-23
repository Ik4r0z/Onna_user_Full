#include <SoftwareSerial.h>

#define rxPin 8
#define txPin 9
SoftwareSerial gpsSerial(rxPin,txPin); 

void setup()
{
  //Começa a comunicação serial com Arduino e Arduino IDE (Monitor Serial)
  Serial.begin(9600);
  
  //Começa a comunicação serial com Arduino e SIM800L
  gpsSerial.begin(9600);

  Serial.println("Inicializando...");
  delay(1000);
}

void loop()
{
  while (gpsSerial.available() > 0)
    Serial.write(gpsSerial.read());
}