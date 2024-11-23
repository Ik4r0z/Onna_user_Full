#include <SoftwareSerial.h>

#define rxPin 2
#define txPin 3
SoftwareSerial sim800L(rxPin,txPin); 

void setup()
{
  //Começa a comunicação serial com Arduino e Arduino IDE (Monitor Serial)
  Serial.begin(9600);
  
  //Começa a comunicação serial com Arduino e SIM800L
  sim800L.begin(9600);

  Serial.println("Inicializando...");
  delay(1000);
}

void loop()
{
  while(sim800L.available()){
    Serial.println(sim800L.readString());
  }
  while(Serial.available())  {
    sim800L.println(Serial.readString());
  }
}

/*
AT
Verifique se o Sim está pronto ou não
AT+CPIN?
 */
