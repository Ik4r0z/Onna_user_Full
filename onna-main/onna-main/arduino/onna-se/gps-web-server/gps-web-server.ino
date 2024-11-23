#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <AltSoftSerial.h>

#define rxPin 2
#define txPin 3
SoftwareSerial sim800L(rxPin,txPin); 

//Pino RX do módulo GPS para Arduino 9
//Pino TX do módulo GPS para Arduino 8
AltSoftSerial neogps;

TinyGPSPlus gps;

unsigned long previousMillis = 0;
long interval = 60000;


void setup()
{
  //Começa a comunicação serial com Arduino e Arduino IDE (Monitor Serial)
  Serial.begin(9600);

  //Começa a comunicação serial com Arduino e SIM800L
  sim800L.begin(9600);

  //Começa a comunicação serial com Arduino e SIM800L
  neogps.begin(9600);

  Serial.println("Inicializando...");
  //delay(10000);

  //Assim que o teste de handshake for bem-sucedido, ele voltará para OK
  sendATcommand("AT", "OK", 2000);
  sendATcommand("AT+CMGF=1", "OK", 2000);
  //sim800L.print("AT+CMGR=40\r");

}

void loop()
{
  while(sim800L.available()){
    Serial.println(sim800L.readString());
  }
  while(Serial.available())  {
    sim800L.println(Serial.readString());
  }

    unsigned long currentMillis = millis();
    if(currentMillis - previousMillis > interval) {
       previousMillis = currentMillis;
       sendGpsToServer();
    }
}

int sendGpsToServer()
{
    //Pode levar até 60 segundos
    boolean newData = false;
    for (unsigned long start = millis(); millis() - start < 2000;){
      while (neogps.available()){
        if (gps.encode(neogps.read())){
          newData = true;
          break;
        }
      }
    }

    //Se newData for verdadeiro
    if(true){
      newData = false;

      String latitude, longitude;
      float altitude;
      unsigned long date, time, speed, satellites;

      latitude = String(gps.location.lat(), 6); // Latitude em graus (double)
      longitude = String(gps.location.lng(), 6); // Longitude em graus (double)
      altitude = gps.altitude.meters(); // Altitude em metros (double)
      date = gps.date.value(); // Data bruta no formato DDMMAA (u32)
      time = gps.time.value(); // Tempo bruto no formato HHMMSSCC (u32)
      speed = gps.speed.kmph();

      Serial.print("Latitude= "); 
      Serial.print(latitude);
      Serial.print(" Longitude= "); 
      Serial.println(longitude);

      //if (latitude == 0) {return 0;}

      String url, temp;
      url = "http://http://gps-arduino-tracker.free.nf//gpsdata.php?lat=";
      url += latitude;
      url += "&lng=";
      url += longitude;


      Serial.println(url);    
      delay(300);

    sendATcommand("AT+CFUN=1", "OK", 2000);
    //AT+CGATT = 1 O modem Connect está conectado ao GPRS a uma rede. AT+CGATT = 0, o modem não está conectado ao GPRS em uma rede
    sendATcommand("AT+CGATT=1", "OK", 2000);
    //Tipo de conexão: GPRS - perfil de portador 1
    sendATcommand("AT+SAPBR=3,1,\"Contype\",\"GPRS\"", "OK", 2000);
    //define as configurações de APN para seu provedor de rede.
    sendATcommand("AT+SAPBR=3,1,\"APN\",\"internet\"", "OK", 2000);
    //habilita o GPRS - habilite o portador 1
    sendATcommand("AT+SAPBR=1,1", "OK", 2000);
    //Iniciar serviço HTTP
    sendATcommand("AT+HTTPINIT", "OK", 2000); 
    sendATcommand("AT+HTTPPARA=\"CID\",1", "OK", 1000);
    //Define a URL HTTP sim800.print("AT+HTTPPARA="URL","http://http://gps-arduino-tracker.free.nf//gpsdata.php?lat=222&lng=222"\r");
    sim800L.print("AT+HTTPPARA=\"URL\",\"");
    sim800L.print(url);
    sendATcommand("\"", "OK", 1000);
    //Configura a ação HTTP
    sendATcommand("AT+HTTPACTION=0", "0,200", 1000);
    //Encerra o serviço HTTP
    sendATcommand("AT+HTTPTERM", "OK", 1000);
    //Desliga a conexão GPRS. Isso retorna "FECHADO OK".
    sendATcommand("AT+CIPSHUT", "FECHADO OK", 1000);

  }
  return 1;    
}

int8_t sendATcommand(char* ATcommand, char* expected_answer, unsigned int timeout){

    uint8_t x=0,  answer=0;
    char response[100];
    unsigned long previous;

    //Inicializa a string
    memset(response, '\0', 100);
    delay(100);

    //Limpa o buffer de entrada
    while( sim800L.available() > 0) sim800L.read();

    if (ATcommand[0] != '\0'){
      //Envia o comando AT
      sim800L.println(ATcommand);
    }

    x = 0;
    previous = millis();

    //este loop espera pela resposta com tempo limite
    do{
        //se houver dados no buffer de entrada UART, lê-os e verifica a resposta
        if(sim800L.available() != 0){
            response[x] = sim800L.read();
            //Serial.print(response[x]);
            x++;
            //verifica se a resposta desejada (OK) está na resposta do módulo
            if(strstr(response, expected_answer) != NULL){
                answer = 1;
            }
        }
    }while((answer == 0) && ((millis() - previous) < timeout));

  Serial.println(response);
  return answer;
}



//-----------------------------------------------------------------------------------------------------------------------------
//boolean sendATcommand(String expected_answer="OK", unsigned int timeout=2000) //descomentar se houver erro de sintaxe (arduino)
/*
boolean sendATcommand(String ATcommand, String expected_answer, unsigned int timeout) //remova o comentário se houver erro de sintaxe (esp8266)
{
  uint8_t x=0, answer=0;
  String response;
  unsigned long previous;
    
  //Limpe o buffer de entrada
  while( SIM800.available() > 0) SIM800.read();
  sim800L.println(ATcommand);
  
  //NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  previous = millis();
  do{
    //if data in UART INPUT BUFFER, reads it
    if(SIM800.available() != 0){
        char c = SIM800.read();
        response.concat(c);
        x++;
        //checks if the (response == expected_answer)
        if(response.indexOf(expected_answer) > 0){
            answer = 1;
        }
    }
  }while((answer == 0) && ((millis() - previous) < timeout));
  //NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
  
  Serial.println(response);
  return answer;
  
} 
*/
//-----------------------------------------------------------------------------------------------------------------------------

//AT+CFUN=1
//AT+CGATT=1
//AT+SAPBR=3,1,"Contype","GPRS"
//AT+SAPBR=3,1,"APN","internet"
//AT+SAPBR=1,1
