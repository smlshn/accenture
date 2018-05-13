[![Build Status](https://travis-ci.org/mpalourdio/SpringBootAngularHTML5.svg?branch=master)](https://travis-ci.org/mpalourdio/SpringBootAngularHTML5)

NB: Older Spring Boot and Angular versions are available in [branches](https://github.com/mpalourdio/SpringBootAngularHTML5/branches).

Spring Boot 2.x and Angular 5.x with HTML 5 router
====================================================

This project provides an example of an Angular single page application, served by ``Tomcat``,
configured with the ``html5 router``.

The [Application](src/main/java/com/bilalismail/config/Application.java) starts the application. It will use 8080 port on your localhost.

To run angular application you should run ``yarn start`` under [front](front) directory. Http requests will be correctly proxyfied to your backend. 