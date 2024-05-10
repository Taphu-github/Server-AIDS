import express from "express";
import mqtt from 'mqtt';
import cors from 'cors';
import "express-async-errors";
import analysis from "./routes/analysis.mjs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Animal from "./models/animal.mjs";
import authRoutes from './routes/auth.js';

const animalID={"Bear": 0, "Boar": 1, "Cattle": 2, "Deer": 3, "Elephant": 4, "Horse": 5, "Monkey": 6};
dotenv.config();
const animalIndex=["Bear", "Boar", "Cattle", "Deer", "Elephant", "Horse", "Monkey"];

const app = express();
const port = 5050;


let lastmessage='';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Welcome to my server!');
});

app.use('/auth', authRoutes);

app.get('/mqttdata', (req, res) => {
  // Respond with the last received MQTT message
  res.json({ message: lastmessage });
});

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.use("/analysis", analysis);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(process.env.ATLAS_URI)
.then(() => console.log("Database Connected"))
.catch(err => console.log(err))




var options = {
  host: '34773dcfbaf24a4bba66e5a333c2df9a.s1.eu.hivemq.cloud',
  port: 8883,
  protocol: 'mqtts',
  username: 'ads@rpi',
  password: 'Ads12345678'
}

var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  // called each time a message is received
  //console.log('Received message:', topic, );

  if(topic=="animal"){
    lastmessage=message.toString();
    const byteArray = Buffer.from(message.toString(), 'base64');
    const stringData = message.toString();  // Convert to string before splitting
    const payloadData = stringData.split("####");
    const imgData = Buffer.from(payloadData[0], 'base64');  // Decode Base64 image data
    const dateObject=new Date(payloadData[3]);
    const formattedDate= dateObject.toLocaleDateString();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    const newAnimal= new Animal({
    acid: payloadData[0],
    sid:parseInt(payloadData[1]),
    animalname: animalIndex[payloadData[0]],
    enroachTime: formattedTime,
    enroachDate: formattedDate,
    animalCount: payloadData[2]


    });

    newAnimal.save().then().catch(err=> console.log(err));

  }else if(topic=="animal_description"){
    
  }
});
client.subscribe('animal');

export default app