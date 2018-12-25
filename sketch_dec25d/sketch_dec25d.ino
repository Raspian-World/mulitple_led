void setup()
{
  Serial.begin(115200);
}

void loop()
{
  int data1;
  
    while(!Serial.available());  //wait until a byte was received
    
    data1 = Serial.read();

     while(!Serial.available());
     analogWrite(data1, Serial.read());//output received byte
     Serial.println("hello");    
    
}
