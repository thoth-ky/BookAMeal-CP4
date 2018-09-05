[![Build Status](https://travis-ci.org/jmutuku95/BookAMeal-CP4.svg?branch=develop)](https://travis-ci.org/jmutuku95/BookAMeal-CP4) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/f03890a4ca3147eb9e782d3a2cc8663b)](https://www.codacy.com/app/jmutuku95/BookAMeal-CP4?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jmutuku95/BookAMeal-CP4&amp;utm_campaign=Badge_Grade) [![Coverage Status](https://coveralls.io/repos/github/jmutuku95/BookAMeal-CP4/badge.svg?branch=develop)](https://coveralls.io/github/jmutuku95/BookAMeal-CP4?branch=develop)

## INTRODUCTION
This is a REACT App build using  `create-react-app` to consume [Book A Meal API](https://bookameal0.herokuapp.com/). A live version of this React App is hosted in Heroku [Book A Meal Front End](https://sheltered-wave-36604.herokuapp.com/). The App is intended to help a restaurant track it's customer's orders and allow customers make orders easily as well as allow caterers add their meals to menus.
The customers are supposed to create accounts which they can use later to view menus or place orders for meals. The Restaurant staff/caterers use priviledged user authorised by a `super user`
accounts which allow them to modify, delete some resources. The restaurant should at least have one super user created who will promote users to admin status.

## PREREQUISITES
This application is build using the following technologies
1. Node.Js
2. ReactJs

## HOW TO INSTALL
1. Ensure you have ```Node.js``` and npm installed
2. Clone this repo 
  ```
  $ git clone https://github.com/jmutuku95/BookAMeal-CP4.git
  ```
3. In your terminal `cd` to the newly created folder `BookAMeal-CP4` and run the following commands
  ```
  $ cd BookAMeal-CP4
  ```
4. Install all dependencies
  ```
  $ npm install
  ```
4. To run the application in your browser use the following command 
  ```
  $ npm start
  ```

## HOW TO TEST
To run unittests for the application, use this command
  ```
  $ npm test
  ``` 
after the tests finish running a coverage report is given.


## UI PREVIEW

### Signup Page
![signup](https://user-images.githubusercontent.com/28805113/45078733-65703d80-b0f9-11e8-9679-0a93d989faa9.png)
### Signin Page
![signin](https://user-images.githubusercontent.com/28805113/45078731-65703d80-b0f9-11e8-8e97-d0c829e890c3.png)
### Menu Page
![menu](https://user-images.githubusercontent.com/28805113/45078730-64d7a700-b0f9-11e8-876d-0038935a39e1.png)
### Meals Page
![meals](https://user-images.githubusercontent.com/28805113/45078727-64d7a700-b0f9-11e8-8dc0-0185afb4266a.png)

### Orders Page
![orders](https://user-images.githubusercontent.com/28805113/45078729-64d7a700-b0f9-11e8-848c-167f92a8651d.png)

## Authors
  * **Joseph Mutuku Kyalo**

## Acknowledgements

Thanks to the following people for their guidance and advice throughout the process of building this application

  * **Elton Maiyo**
  * **Clement Wekesa**
  * **Flavia Nshemerirwe**
  * Everyone I consulted, Peers at Andela Kenya Cohort 27, Online bloggers and the entire Node and React Commmunity

_Feel free to  fork, star orgive suggestions on how to improve the APP more._
