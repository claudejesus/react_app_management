#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

// Replace with your network credentials
const char* ssid = "jesus";
const char* password = "1234567890j";

// Replace with your backend server IP address
const char* serverUrl = "http://10.136.190.246:5000/api/sensors/add"; // ← your PC IP

#define DHTPIN D2       // Connect DHT signal pin to D2 (GPIO4)
#define DHTTYPE DHT11   // or DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(100);
  dht.begin();

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    float temp = dht.readTemperature();
    float humid = dht.readHumidity();

    if (isnan(temp) || isnan(humid)) {
      Serial.println("Failed to read from DHT sensor!");
    } else {
      String json = "{\"temperature\":" + String(temp) + ",\"humidity\":" + String(humid) + "}";
      Serial.println("Sending data: " + json);

      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST(json);

      Serial.print("HTTP Response Code: ");
      Serial.println(httpResponseCode);
      http.end();
    }
  } else {
    Serial.println("WiFi not connected");
  }

  delay(60000); // Send every 60 seconds
}
