angular.module("myApp")
    .controller("ModalDetailCtrl", ['$scope', '$stateParams', '$meteor',
    function ($scope, $stateParams, $meteor) {
        $scope.link = $meteor.object(Links, $stateParams.linkId,true);

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