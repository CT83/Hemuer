# Hemuer-AI : Laugh when everyone laughs, smile when everyone smiles!
[![GitHub issues](https://img.shields.io/github/issues/CT83/Hemuer-AI-Expression-Detector)](https://github.com/CT83/Hemuer-AI-Expression-Detector/issues)
[![GitHub forks](https://img.shields.io/github/forks/CT83/Hemuer-AI-Expression-Detector)](https://github.com/CT83/Hemuer-AI-Expression-Detector/network)
[![GitHub stars](https://img.shields.io/github/stars/CT83/Hemuer-AI-Expression-Detector)](https://github.com/CT83/Hemuer-AI-Expression-Detector/stargazers)
[![GitHub license](https://img.shields.io/github/license/CT83/Hemuer-AI-Expression-Detector)](https://github.com/CT83/Hemuer-AI-Expression-Detector/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2FCT83%2FHemuer-AI-Expression-Detector%2Fstyle=social)](https://twitter.com/intent/tweet?text=Check%20out%20https://github.com/CT83/Hemuer-AI-Expression-Detector%20by%20@_Rohan_Sawant_ )

### [View Live Version!](https://hemeur.herokuapp.com/) - https://hemeur.herokuapp.com/



Hemeur is an AI Tool to record facial expressions of users as they watch a video and then visualize the most funny parts of it!

It watches users as they watch a video, and logs when the users smile. 

Insights can be gathered from collected data!

## Architectural Overview

- Frontend - **face-api.js** in **TensorFlow.js**, **JavaScript** and **JQuery**, **BootStrap**
- Backend - **[NodeJS Express](https://expressjs.com/)**, **mongoose** and **amqplib** 
- Database - **[MongoDB](https://www.mongodb.com/)**
- Message Queue - **RabbitMQ** on **CloudAMQP**
- Hosting - **[Heroku](https://www.heroku.com/)** - Free Tier
- Local Development - **[Docker](https://www.docker.com/)** and **[Docker Compose](https://docs.docker.com/compose/)**

![](https://github.com/CT83/Hemuer-AI-Expression-Detector/blob/master/public/images/hemuer-arch-white.png?raw=true)

## Working

### 1. Camera detects the expression of the viewer

​	**face-api.js** with **TensorflowJS** detects the expressions, sends a POST to the backend.

### 2. Write expressions to MQ

​	**NodeJS** writes the expressions to **RabbitMQ**

### 3. Write expressions to the database

​	Data from the **MQ** is now moved over to the database for storage and popped off the queue.

### 4. Insights are generated from the collected data

​	The expressions and their positions in the video are noted down, and visualized in the UI. 

## Features

> Screen **jiggles** when you **giggle**!
>
> Chat Panel, **pops** every time someone laughs (or **talks**)
>
> Links above the messages, **allow to skip** to the **funny bits**

### 1. Privacy First

Facial Recognition is done in the browser itself. No video ever leaves your device.

### 2. Scalable

Hemuer, is powered by **RabbitMQ**, this adds real-time chat support! Transactions go to the MQ first, then are stored in the database.

This keeps things up and running even during high traffic!

### 3. Data Driven

The [**Stats**](https://hemeur.herokuapp.com/stats) page displays Smiles vs their Position in Video.
This can be used to find, seek and skip to the funniest bits of the video.

### 4. Open Source

*This is where I nag you for stars*... 😪
Can I get a [star](https://github.com/CT83/Hemuer-AI-Expression-Detector)?

## Future Scope 

* A **Chrome Extension** for YouTube?
*  A Plugin for Streaming Services to analyze how people react to their content?
* A Tool for **Focus Groups** and **Scientific Studies**?
* *Something creepy straight out of 1984?*

## Getting Started

### Prerequisites

* Docker and Docker Compose needs to be installed on your machine

### How to run?

1. `docker-compose up --build`
2. Visit http://localhost:3000/
3. Smile. 🙂

### Production Deployment

1. Deploy the NodeJS App on Heroku

   This should work right out of the box, if you follow the current repo struct.

2. Create a MQ on CloudAMQP and add the as an environment variable. `AMQ_URL`

3. Create a MongoDB add on for the App

4. Boom! Done

## License

This project is licensed under the Apache License - see the [LICENSE.md](https://github.com/CT83/Hemuer-AI-Expression-Detector/blob/master/LICENSE) file for details

## Credits

* [Vincent Mühler](https://github.com/justadudewhohacks/face-api.js/) for Face Recognition