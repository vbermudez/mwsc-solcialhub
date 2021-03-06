# Google Challenge Scholarship: Mobile Web

## Offline-first Social Hub web application

The goal of this project is to put in practice the Offline-first techniques, as shown in the program of this challenge scholarship, to build a Offline-first social hub. That means, a way to concentrate publications from social networks like Facebook, Twitter, Instagram, Linkedin, etc in one single page.

In order to NOT create any discussion of which frameworks to use, which technologies, etc; I think this should be done using nothing else but HTML5, CSS3 and, of course, ES6!.

The web application should be focused as a client one. Meaning: no server part, nor back-end (except for a basic HTTP server, of course).

The objective isn't to introduce clien or server frameworks/APIs, nor learn how to design or create web sites. The main objective is to create a colaborative project, so we (students) can put in practice what we learned, and help each other to improve and assimilate the concepts.

It would be great to host this project in various Github accounts, in order to form groups, so the project could evolve in various ways and, why not, have some competition between all those groups! (just for fun and improvement).

## Current browser support for ES6 modules and my choices

Because the current support, I prefer to use pure ES6, without any transpiler, browserify, webpack, etc. Just a plain ES6 solution. Let's see their potential for a production environment!

| ![](md-img/es6-may2017.png) |
|:--:|
| _May 2017 - Feel free to update!_ |

## Environment & versions

- NodeJS version 6.0.0 ... But not for any particular reason ... ;)
- Google Chrome 62.0.3202.94 (Official build) (64 bits)

## Serve the app!

Just run:

```shell
npm start
```

## Heroku

Now, the web app is accessible from [Heroku](https://mwsc-socialhub.herokuapp.com/)!

## IndexedDB

Just added a simplistic API for to interact with the native API. I have builded some ES6 classes that demonstrates class inheritance as well as other techniques.

**Have fun!**