# Project Name

This project is an application focused on short videos, primarily designed to showcase YouTube Shorts videos. The project consists of several key files and components:

## shortsListData.js

This file contains static data for YouTube Shorts videos, which is used to display the list of short videos within the application. The data provided here is static and does not change.

## DataCollectLayer.js

DataCollectLayer is a context layer that serves as a repository for commonly used data shared throughout the application. Its primary function is to provide the `getShortVideos` method, which leverages the YouTube Data v3 API to fetch data for the Short video list.

## App.js

App.js acts as the main entry point for the application and manages routing. It defines the different pages of the application and the corresponding routing rules.

## FirstPage.js

FirstPage.js is responsible for presenting the visual appearance of the application. It includes a component called `<EmbedShorts>` used to render the list of YouTube Shorts videos.

## EmbedShorts.js

EmbedShorts.js utilizes the `iframe_api` from the YouTube API. It contains logic related to scrolling and rendering data for YouTube Shorts videos.

### How to Use

This project is built using the React framework, and I use Visual Studio Code for development. 

#### Install Dependencies

Before getting started with the project, ensure that you have installed all the necessary dependencies. You can install them using the following command:

```bash
npm install
```
Starting the Application
To launch the application in development mode, use the following command:

npm start

This will open the application in your default web browser, allowing you to explore and interact with it. Enjoy using the YouTube Shorts video app!