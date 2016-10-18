'use strict';

/**
 * @ngdoc overview
 * @name udaciMealsApp
 * @description
 * # udaciMealsApp
 *
 * Main module of the application.
 */
angular
  .module('udaciMealsApp', ['ngTouch','ui.router'])
  .config(['$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home',{
      url:'/',
      templateUrl:'views/menu.html',
      controller:'MenuCtrl as menu'
    })
    .state('collection',{
      url:'/collection(/:id)',
      templateUrl:'views/collection.html',
      controller:'CollectionCtrl as collection'
    })
    .state('selection',{
      url:'/selection',
      templateUrl:'views/selection.html',
      controller:'SelectionCtrl as selection'
    })
    .state('battle',{
      url:'/battle',
      templateUrl:'views/battle.html',
      controller:'BattleCtrl as battle'
    })
    ;
  }])
  ;
