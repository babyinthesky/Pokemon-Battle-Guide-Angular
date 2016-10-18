'use strict';

/**
 * @ngdoc function
 * @name udaciMealsApp.controller:BattleCtrl
 * @description
 * # BattleCtrl
 * Controller of the udaciMealsApp
 */
angular.module('udaciMealsApp')
  .controller('BattleCtrl',['findData','$scope',function (findData,$scope) {
//.controller('BattleCtrl',function ($scope,$http) {
    var vm = this;
    this.selectedId='';
    //this.battleList=[];
    $scope.hideResult=true;
    $('[data-toggle="tooltip"]').tooltip();

    $("#menuList").children().removeClass("active");
    $("#menuBattle").addClass("active");

    findData.getMenu().then(function(response){
      vm.pokemon=response.data;
    });

    this.onItemClick=function(id){
      $scope.showOK=id;
      //$("#defender").children("div").removeClass("selected");
      $("#d"+id).addClass("selected");
      $("#radio"+id).prop('checked', true);

      var ob = vm.pokemon.find(function(o){return o.id===id;});
      this.selectedName=ob.name;
    }

    this.onAttackerClick=function(attackerId){
      var ob = this.pokemon.find(function(o){return o.name===vm.selectedName;});
      this.defenderImage=ob.img;
      ob = this.pokemon.find(function(o){return o.id===attackerId;});
      this.attackerImage=ob.img;
    }

    this.onSearch=function(name){
      var ob = this.pokemon.find(function(o){return o.name===name;});

      if(typeof ob==='undefined') {
        alert("The Pokemon You Type is not found!");
      }
      else{
        var id = ob.id;
        var start=$("#defender").offset().top;
        var offset=$("#d"+id).offset().top+$("#defender").scrollTop()-start;
        $("#defender").animate({scrollTop:offset},600);
        this.onItemClick(id);
      }

    }

    this.onItemMouseOver=function(id){
      $("#d"+id).addClass("selected");
    }

    this.onItemMouseLeave=function(){
      $("#defender").children("div").removeClass("selected");
    }
    /*this.calPoint=function(aType,dType){

      return vm.typeChart[aType][dType];
    } */

    this.calPoint=function(aType,dType, aMax, dMax){
      var attack=this.typeChart[aType][dType];
      var defense=this.typeChart[dType][aType];
      if(attack>aMax) aMax=attack;
      if(defense>dMax) dMax=defense;
      return {
        'attack_max':aMax,
        'defense_max':dMax
      }
    }

    this.listBest=function(id){
      //verify if radio ic checkedList
      this.battleList=[];
      if(id){
        findData.getBattleType().then(function(response){
          vm.typeChart=response.data[0];
          //console.log(vm.typeChart);
          var defenderType;
          var attackerType;
          //var attack;
          //var defense;
          //var attack_max;
          //var defense_max;

          var result;
          for(var i=0;i<151;i++){
            //attack_max=0;
            //defense_max=0;
            //Check attacker's type1
            attackerType=vm.pokemon[i].type1;

            defenderType=vm.pokemon[parseInt(id)-1].type1;
            result=vm.calPoint(attackerType,defenderType,0,0);
            /*attack=vm.calPoint(attackerType,defenderType);
            if(attack>attack_max) attack_max=attack;
            defense=vm.calPoint(defenderType,attackerType);
            if(defense>defense_max) defense_max=defense; */

            defenderType=vm.pokemon[parseInt(id)-1].type2;
            if(defenderType!=='') {
              /*attack=vm.calPoint(attackerType,defenderType);
              if(attack>attack_max) attack_max=attack;
              defense=vm.calPoint(defenderType,attackerType);
              if(defense>defense_max) defense_max=defense; */
              result=vm.calPoint(attackerType,defenderType,result.attack_max,result.defense_max);
            }
            //Check attacker's type2
            attackerType=vm.pokemon[i].type2;

            if(attackerType!=='') {
              defenderType=vm.pokemon[parseInt(id)-1].type1;
              /*attack=vm.calPoint(attackerType,defenderType);
              if(attack>attack_max) attack_max=attack;
              defense=vm.calPoint(defenderType,attackerType);
              if(defense>defense_max) defense_max=defense; */
              result=vm.calPoint(attackerType,defenderType,result.attack_max,result.defense_max);

              defenderType=vm.pokemon[parseInt(id)-1].type2;
              if(defenderType!=='') {
                /*attack=vm.calPoint(attackerType,defenderType);
                if(attack>attack_max) attack_max=attack;
                defense=vm.calPoint(defenderType,attackerType);
                if(defense>defense_max) defense_max=defense;*/
                result=vm.calPoint(attackerType,defenderType,result.attack_max,result.defense_max);
              }
            }
            if(result.defense_max>0){
              result.defense_max=(1/result.defense_max);
            }
            else
              result.defense_max=3;

            vm.battleList.push(
              { id:vm.pokemon[i].id,
                name:vm.pokemon[i].name,
                img:vm.pokemon[i].img,
                type1:vm.pokemon[i].type1,
                type2:vm.pokemon[i].type2,
                Points:result.attack_max+result.defense_max,
                aPoint:result.attack_max,
                dPoint:result.defense_max}
            );
          }
//          var maxPoints=Math.max.apply(Math,vm.battleList.map(function(o){return o.Points;}));
          var ordered=vm.battleList.map(function(o){return o;});
          ordered.sort(function(a,b){return b.Points-a.Points;});

          vm.orderType=[];
          var typeHistory=[];
          var ob;
          var type;
          for(var i in ordered){
            if(ordered[i].type2===''){
              type=ordered[i].type1;
            }
            else {
              type=ordered[i].type1+'/'+ordered[i].type2;
            }
            if(typeHistory.indexOf(type)<0){
              ob={};
              ob.type=type;
              ob.Points=ordered[i].Points;
              vm.orderType.push(ob);
              typeHistory.push(ob.type);
            }
          }
          //vm.bestCandidate = vm.battleList.find(function(o){return o.Points===maxPoints;})
          $scope.hideResult=false;

        })
      }
      else{
        alert("Please choose one Pokemon which is the Gym defender!")
      }
    }

    this.scrollTo=function(type){
      if(type.indexOf('/')>=0) type=type.replace('/','');
      var start=$("#result_panel").offset().top;
      var offset=$("."+type).offset().top+$("#result_panel").scrollTop()-start;
      $("#result_panel").animate({scrollTop:offset},500);
    }
/*
  //fetch an error reason for get operation
   $.get('/data/node.json').done(function(){alert("success");})
    .fail(function( jqXHR, textStatus, error) {
alert( "Request failed: " + textStatus + " responseText: "+jqXHR.responseText);});*/

  } ]

)
.directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});
