import angular from 'angular'
import './libs/angular-resource'
import './libs/angular-route'

// normalize
import normalize from 'normalize.css'
import milligram from 'milligram'

// toastr
import toastr from 'toastr'
import 'toastr/build/toastr.css'

// tooltips
import tooltips from 'angular-tooltips'
import 'angular-tooltips/dist/angular-tooltips.css'

import consulService from './services/ConsulService'
import settingsController from './controllers/SettingsController'
import streamController from './controllers/StreamController'
import addController from './controllers/AddController'

const app = angular.module('app', ['ngResource', 'ngRoute', '720kb.tooltips'])
  .config(($routeProvider, tooltipsConfProvider) => {
    $routeProvider.when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsController'
    })
    $routeProvider.when('/stream', {
      templateUrl: 'templates/stream.html',
      controller: 'StreamController'
    })
    $routeProvider.when('/add', {
      templateUrl: 'templates/add.html',
      controller: 'AddController'
    })
    $routeProvider.otherwise({redirectTo: '/stream'})

    tooltipsConfProvider.configure({
      side: 'top',
      size: 'small',
      speed: 'fast',
    })
  })

consulService(app)
settingsController(app)
streamController(app)
addController(app)
