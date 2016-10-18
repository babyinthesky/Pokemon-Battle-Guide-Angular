'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('MenuCtrl',['findData',function (findData,$scope) {
    var vm = this;
    this.checkedList=[];
    this.show_text="";

    $("#menuList").children().removeClass("active");
    $("#menuHome").addClass("active");

    findData.getTypeName().then(function(response){
      vm.types=response.data;
     });

    this.getAll=function(){
      findData.getMenu().then(function(response){
            vm.items=response.data;
          });
    }
    this.getAll();

    this.filterByType=function(type){
      if(type==='All'){
        this.getAll();
      }
      else{
        findData.getOneType(type).then(function(response){
           vm.items=response.data;
        });
      }
    }

    this.onSearch=function(poke_name){
      if($("#poke_"+poke_name).length===0) {
        alert("The Pokemon You Type is not found!");
      }
      else{
        var start=$("#poke_table").offset().top;
        var offset=$("#poke_"+poke_name).offset().top+$("#poke_table").scrollTop()-start;
        $("#poke_table").animate({scrollTop:offset},600);
      }

    }

    //to be modified
    this.showText=function(){
      this.show_text="Add to cart";
    };

    this.onChecked=function(id){
      for(var item in this.items){
          if((!this.items[item].selected)&&(this.items[item].id===id)){
            this.checkedList.push(id);
            this.items[item].selected=true;

          }
          else if((this.items[item].selected)&&(this.items[item].id===id)){
            var index = this.checkedList.indexOf(id);
            this.checkedList.splice(index,1);
            this.items[item].selected=false;
          }
      }
      findNode.saveCheckedList(this.checkedList);

      this.show_text=this.checkedList;
    };
/*
  //fetch an error reason for get operation
   $.get('/data/node.json').done(function(){alert("success");})
    .fail(function( jqXHR, textStatus, error) {
alert( "Request failed: " + textStatus + " responseText: "+jqXHR.responseText);});*/

  }

] );
