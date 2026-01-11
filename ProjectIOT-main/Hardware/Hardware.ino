#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"
#include <Adafruit_Sensor.h>
#include <DHT.h>

#define WLAN_SSID "IT Hoc Bach Khoa"
#define WLAN_PASS "chungtalamotgiadinh"

#define SERVER "69e30d36f3d6471bbc291cc6a6bb7a38.s1.eu.hivemq.cloud"
#define SERVERPORT 8883
#define TOPIC "hust/iot/data"

#define MQTT_USERNAME "esp8266"
#define MQTT_PASSWORD "Iamspectre16@"

#define DHTPIN 5
#define DHTTYPE DHT22   

const char* EMBED_ID = "esp8266-001";
const unsigned long PUBLISH_EVERY_MS = 1000; 

WiFiClientSecure client;  
Adafruit_MQTT_Client mqtt(&client, SERVER, SERVERPORT, MQTT_USERNAME, MQTT_PASSWORD);
Adafruit_MQTT_Publish node(&mqtt, TOPIC);

DHT dht(DHTPIN, DHTTYPE);

void MQTT_connect();

void setup() {
  Serial.begin(9600);
  delay(10);

  Serial.println("DHT22 MQTT Publisher (HiveMQ Cloud, mqtts:8883)");
  Serial.print("Connecting to ");
  Serial.println(WLAN_SSID);

  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();

  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  client.setInsecure();

  dht.begin();
  MQTT_connect();
}

void loop() {
  MQTT_connect();

  float h = dht.readHumidity();
  float t = dht.readTemperature();

  if (isnan(h) || isnan(t)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    String message =
      String("{\"embedId\":\"") + EMBED_ID +
      String("\",\"temperature\":") + String(t, 2) +
      String(",\"humidity\":") + String(h, 2) +
      String(",\"ts\":") + String(millis()) +
      String("}");

    Serial.println(message);

    char buffer[message.length() + 1];
    message.toCharArray(buffer, message.length() + 1);

    node.publish(buffer);
  }

  delay(PUBLISH_EVERY_MS); 
}

void MQTT_connect() {
  int8_t ret;

  if (mqtt.connected()) return;

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) {
    Serial.println(mqtt.connectErrorString(ret));
    Serial.println("Retrying MQTT connection in 2 seconds...");
    mqtt.disconnect();
    delay(2000);
    retries--;
    if (retries == 0) {
      while (1) { delay(1000); }
    }
    Serial.print("Connecting to MQTT... ");
  }
  Serial.println("MQTT Connected!");
}
