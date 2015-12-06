/**
 * Created by Alex on 2015/10/20.
 */
angular.module("myApp")
    .directive('myDirective',function(){
        return{
            restrict:'E',
            controller:'ModalDemoCtrl',
            templateUrl:'client/links/views/repeatLink.ng.html'
        }
    })
    .directive('myHead', function(){
        return{
            restrict:'E',
            controller:'ModalDemoCtrl',
            templateUrl:'client/links/views/linkHead.ng.html'
        }
    })
    .directive('linkList', function(){
        return{
            restrict:'E',
            controller:'ModalDemoCtrl',
            templateUrl:'client/links/views/linkList.ng.html'
        }

    })

