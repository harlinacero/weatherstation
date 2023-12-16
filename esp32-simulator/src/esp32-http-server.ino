/* ESP32 HTTP IoT Server Example for Wokwi.com

  https://wokwi.com/arduino/projects/320964045035274834

  When running it on Wokwi for VSCode, you can connect to the
  simulated ESP32 server by opening http://localhost:8180
  in your browser. This is configured by wokwi.toml.
*/

#include <WiFi.h>
#include <Wire.h>
#include <HTTPClient.h>
#include <WebServer.h>
#include <uri/UriBraces.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""
// Defining the WiFi channel speeds up the connection:
#define WIFI_CHANNEL 6

Adafruit_BME280 bme; // I2C
// WebServer server(80);

void setup(void)
{
  Serial.begin(9600);

  bool status;
  status = bme.begin(0x68);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD, WIFI_CHANNEL);
  Serial.print("Connecting to WiFi ");
  Serial.print(WIFI_SSID);
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  Serial.println(" Connected!");

  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void loop(void)
{

  if (WiFi.status() == WL_CONNECTED)
  {
    String altitude = String(bme.readAltitude(1));
    String humity = getData(bme.readHumidity(), 0.0, 100.00);
    String presuer = getData(bme.readPressure(), 800.0, 1500.0);
    String temp = getData(bme.readTemperature(), 8.0, 40.0);
    String device = "bme280";
    String servidor = "https://7dlfcbtk-3000.use2.devtunnels.ms/weather";
    String payload = "?temp=" + temp + "&humity=" + humity + "&preasure=" + presuer + "&altitude=" + altitude + "&sensor=" + device;

    String serverPath = servidor + payload;
    Serial.println(serverPath);

    HTTPClient http;
    // http.addHeader("Content-Type", "application/json");
    http.begin(serverPath.c_str());

    int httpResponseCode = http.GET();
    if (httpResponseCode > 0)
    {
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
      String payload = http.getString();
      Serial.println(payload);
    }
    else
    {
      Serial.print("Error code: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }

  // Se repite cada 30 segundos
  delay(30000);
}

String getData(float data, float min, float max)
{
  if (data > 0)
  {
    return String(data);
  }
  else
  {
    return String(random(min, max));
  }
}
