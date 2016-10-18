'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:SelectionCtrl
 * @description
 * # SelectionCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('SelectionCtrl', ['findNode',function (findNode) {
      this.checkedList=findNode.getCheckedList();
      
  }]
);
