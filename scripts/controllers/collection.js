'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:CollectionCtrl
 * @description
 * # CollectionCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('CollectionCtrl',['$stateParams','findNode',
    function ($stateParams,findNode) {
      var vm=this;
      vm.data=findNode.addToCollection($stateParams.id);
  }
]);
