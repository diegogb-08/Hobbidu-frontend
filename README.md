<!-- PROJECT LOGO -->
<br />
<p align="center">
    <img height="200" src="public/website_logo.png" alt="Logo" >

<h4 align="center">Find your Hobby!</h4>

<h4 align="center">Connect with People!</h4>
  <p align="center">
    <a href="https://hobbidu.herokuapp.com/">View Web Application</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#installation">Installation</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#app-overview">Overview</a>
    </li>
    <li><a href="#languages-and-tools">Languages and Tools</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#repositories">Repositories</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Installation

###### Frontend

Install the dependencies and devDependencies for the frontend repository.

```sh
npm i
```

In the project directory, you can run:

```sh
npm start
```

And if you wish, you can run the scss

```sh
npm run scss
```

###### Backend

Install the dependencies and devDependencies for the backend repository.

```sh
npm i
```

In the project directory, you can run:

```sh
npm run start
```

On the other side you will need to add the enviroments to run your own MongoDB database.

<!-- ABOUT THE PROJECT -->

## About The Project

Hobbidu is Full-Stack MERN web application that allows users to connect and meet with other people with a common hobby through events created by themselves. In this application, the users will be able to filter the events by distance to the wanted location. On top of this, they will be able to post and comment their hobbies routine.

The back end of the application was built with [Nodejs](https://nodejs.org/), [Mongoose](https://mongoosejs.com/) and [MongoDB](https://www.mongodb.com/) database. All data fetching was done using [Express](https://expressjs.com/) and [Axios](https://github.com/axios/axios) for declaring JSON structures. For the image handling, the web application is using [Multer](https://www.npmjs.com/package/multer), [fs-extra](https://www.npmjs.com/package/fs-extra) and [AWS S3 Bucket](https://aws.amazon.com/s3/) where we store all the pictures in a safe way.

The front end was created with [Reactjs](https://es.reactjs.org/) and [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) and uses the [Redux](https://es.redux.js.org/) architectural framework for an optimal single-page user-experience.

The backend and the frontend of the project are deployed in [Heroku](https://id.heroku.com/) through the `master` branch.

#### Authentication page

Back-end and front-end user authentication was built from scratch by encrypting user password with [Bcryptjs](https://www.npmjs.com/package/bcryptjs) and creating a unique session token with [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken) for each user on sign up or login. This allows for secure access to one's account on the single-page application which then renders distinct content based on the current user.

#### Future Features:

- Direct messages between users.
- Display all user post at their own profile.
- Posibility to upload videos as well.
- Live Chat
- Create React Native App
- Push Notifications

<a href="https://hobbidu.herokuapp.com/" target="_blank">
    <img src="public/landing.png">
</a>

<!-- OVERVIEW -->

## APP OVERVIEW

###### Registration & Login

<img src="public/gif/register.gif" alt="Register" >

<br>
<br>

###### Login and User profile update

<img src="public/gif/login.gif" alt="Login" >

<br>
<br>

###### Edit hobbies, change email & password and logaout

<img src="public/gif/edit_hobbies.gif" alt="follow users" >

<br>
<br>

###### Follow users

<img src="public/gif/follow.gif" alt="follow users" >

<br>
<br>

###### Filter events by location and distance

<img src="public/gif/event_location.gif" alt="follow users" >

<br>
<br>

###### Create event

<img src="public/gif/create_event.gif" alt="follow users" >

<br>
<br>

###### Create post

<img src="public/gif/create_post.gif" alt="follow users" >

<br>
<br>

---

## Languages and Tools:

<p align="left">
    <a href="https://aws.amazon.com/" target="_blank"> 
        <img src="public/aws-logo.png" alt="Amazon Web Services" width="40" height="40"/>
    </a> 
    <a href="https://sass-lang.com/" target="_blank"> 
        <img src="https://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg" alt="SASS" width="40" height="40"/>
    </a> 
    <a href="https://www.w3schools.com/css/" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>
    </a> 
    <a href="https://expressjs.com" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/>
    </a>
    <a href="https://git-scm.com/" target="_blank">
        <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>
    </a>
    <a href="https://www.w3.org/html/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
    </a>
    <a href="https://www.mongodb.com/" target="_blank"> 
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/>
    </a>
    <a href="https://nodejs.org" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> 
    </a>
    <a href="https://postman.com" target="_blank">
        <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/>
    </a>
    <a href="https://reactjs.org/" target="_blank">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
    </a>
    <a>
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/>
    </a>
    <a>
        <img src="https://i.imgur.com/s59l4lu.png" alt="redux" width="40" height="40"/>
    </a>
    <a>
        <img src="https://i.imgur.com/MD1U1tu.png" alt="redux" width="40" height="40"/>
    </a>
    <a>
        <img src="https://i.imgur.com/0fbJECr.png" alt="redux" width="40" height="40"/>
    </a>
    <a>
        <img src="https://i.imgur.com/lfb9mFw.png" alt="redux" width="40" height="40"/>
    </a>
</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- LINKS TO REPOSITORIES -->

## Repositories

- [Hobbidu-frontend](https://github.com/diegogb-08/Hobbidu-frontend)
- [Hobbidu-backend](https://github.com/diegogb-08/Hobbidu-backend)

<!-- CONTACT -->

## Contact

- Diego García
  - [GitHub](https://github.com/diegogb-08)
  - [LinkedIn](https://www.linkedin.com/in/diego-garcia-brisa/)
