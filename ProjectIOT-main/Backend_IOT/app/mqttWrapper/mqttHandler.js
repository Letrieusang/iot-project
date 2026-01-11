const mqtt = require("mqtt");
const Device = require("../model/device");

class MqttHandler {
    constructor() {
        this.mqttClient = null;

        this.host = "mqtts://69e30d36f3d6471bbc291cc6a6bb7a38.s1.eu.hivemq.cloud:8883";

        this.subscribeTopic = "hust/iot/data";
    }

    connect() {
        this.mqttClient = mqtt.connect(this.host, {
            username: "esp8266",
            password: "Iamspectre16@",

            // Dev/test nhanh để khỏi lỗi TLS cert
            rejectUnauthorized: false,

            keepalive: 60,
            reconnectPeriod: 2000,
            clientId: `backend-${Math.random().toString(16).slice(2)}`
        });

        // Mqtt error callback
        this.mqttClient.on("error", (err) => {
            console.log("MQTT error:", err.message);
            // ❗đừng end() để mqtt.js tự reconnect
        });

        // Connection callback
        this.mqttClient.on("connect", () => {
            console.log("✅ mqtt client connected");
            this.mqttClient.subscribe(this.subscribeTopic, (err) => {
                if (err) console.log("Subscribe error:", err.message);
                else console.log(`📥 Subscribed: ${this.subscribeTopic}`);
            });
        });

        this.mqttClient.on("close", () => {
            console.log("🔌 mqtt client disconnected");
        });

        // ⛔ GIỮ NGUYÊN LOGIC CŨ (chỉ thêm log khi không tìm thấy device)
        this.mqttClient.on("message", async (_subscribeTopic, payload) => {
            try {
                let jsonMessage = JSON.parse(payload.toString());
                console.log("jsonMessage:", jsonMessage);

                let device = await Device.findOne({ embedId: jsonMessage.embedId });
                if (device) {
                    device.connectState = "ON";

                    device.stateHistory =
                        typeof device.stateHistory !== "undefined" && device.stateHistory instanceof Array
                            ? device.stateHistory
                            : [];

                    device.stateHistory.push({
                        at: Date.now(),
                        temperature: jsonMessage.temperature,
                        humidity: jsonMessage.humidity,
                        co2: Math.floor(Math.random() * 20),
                        dust: Math.floor(Math.random() * 70)
                    });

                    await Device.findByIdAndUpdate(device._id, {
                        $set: device
                    });
                } else {
                    // ✅ giúp bạn hiểu vì sao “không hiện”
                    console.log(`⚠️ Device not found in DB for embedId=${jsonMessage.embedId}. Bạn đã Add device này chưa?`);
                }
            } catch (error) {
                console.log("Message handle error:", error.message);
            }
        });
    }

    sendMessage(topic, message) {
        this.mqttClient.publish(topic, message);
    }
}

module.exports = MqttHandler;
