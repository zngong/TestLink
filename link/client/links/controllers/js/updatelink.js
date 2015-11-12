angular.module("myApp")
    .controller("ModalDetailCtrl", ['$scope', '$stateParams', '$meteor','$window',
    function ($scope, $stateParams, $meteor,$window) {
        $scope.link = $meteor.object(Links, $stateParams.linkId,true);
        if(Meteor.userId()&&$scope.link.owner!=Meteor.userId()) {
            $scope.editable = false;
        }else{
            $scope.editable = true;
        }
        $scope.update = function (link) {
            if(Meteor.userId()&&link.owner===Meteor.userId()){
                $meteor.call('setChecked', link._id, !link.checked);
            }else if(!Meteor.userId()){
                $window.alert("Sorry, You don't have a login system, Can't modify any links");
            }else{
                $window.alert("Sorry,You can't modify other users' link");
            }
        }


    }])
.controller('updateHideShow',['$scope',function($scope){
    $scope.custom=true;
    $scope.toggleCustom=function(){
        $scope.custom=$scope.custom===false? true:false;
    };
    $("#Img img").click((function () {
        $scope.custom=true;
        $("#input3 img").attr('src', $(this).attr("src"));
        $scope.link.img=$(this).attr("src");
        $("ImgUrl").attr('value',$(this).attr("src"));
    }));

}]);