# NIPPOLS

NIPPOLS - NIPPO Less Stress

NIPPOLS aims to be the only management tool your team needs by bringing the things you need in one place: 
tasks, communication, files, notes, calendar and more

This project was built using the following technologies:
 - Sails.js (Node.js Backend Web Framework)
 - React.js (JavaScript Frontend UI Framework)
 - react-admin (React.js Framework for building admin applications)
 - material-ui (React components that implement Google's Material Design)

## Getting Started

Pre-requisite: node.js and npm must already be installed in your system

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
See deployment for notes on how to deploy the project on a live system.

### Install and Deploy!

Clone this repository

```
$ git clone https://github.com/nitoygo/nippols.git
$ cd nippols
```

Install node modules for backend, and start the service
```
$ cd backend
$ npm install
$ sails lift

```

See https://sailsjs.com documentation for details on configuring sails app for production env.

Install node modules for frontend, and start
```
$ cd frontend
$ npm install
$ npm start
```

By default, you should be able to access your UI in port 3000, e.g.:
```
http://localhost:3000
```

To optimize frontend UI, you can build the files and then serve
```
$ npm build
$ npm install -g serve
$ serve -s build
```

By default, the built static files are served in port 5000:
```
http://localhost:5000
```


## Authors

* **Nitoy Go** - *Initial work* - https://github.com/nitoygo
* **Hazel Dimay** - *Initial work* - https://github.com/hazelanne

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
