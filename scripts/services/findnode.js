'use strict';

/**
 * @ngdoc service
 * @name udaciMealsApp.findNode
 * @description
 * # findNode
 * Service in the udaciMealsApp.
 */
angular.module('udaciMealsApp')
  .service('findData', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.checkedList=[];

    this.getMenu=function(){
      //return $.get("data/pokemon.json");
      return $http.get("php/list");
    };

    this.getBattleType=function(){
      return $http.get("php/listBattle");
    }

    this.getTypeName=function(){
      return $http.get("php/listType");
    }

    this.getOneType=function(type){
      return $http.get("php/list/type/"+type);
    }

    this.getId=function(name){
      return $http.get("php/list/id/"+name);
    }

    this.addToCollection=function(id){
       return id;
    };
    this.saveCheckedList=function(checkedList){
      this.checkedList=checkedList;
    };
    this.getCheckedList=function(){
      return this.checkedList;
    };
  });
