Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
angular.module('myApp')
    .controller('ModalDemoCtrl',['$scope','$rootScope','$meteor','$modal','$log','modalService','$window', function ($scope,$rootScope,$meteor,$modal, $log,modalService,$window) {
        $scope.links = $meteor.collection(Links).subscribe('links');
        $scope.order="name";
        $scope.remove = function(link){
            if(Meteor.userId()&&link.owner===Meteor.userId()){
                $scope.links.remove(link);
            }else if(!Meteor.userId()){
                $window.alert("Sorry, You don't have a login, Can't delete any links");
            }else{

                $window.alert("Sorry, You can't delete other users' link");
            }

        };
        $scope.open = function () {
            if(Meteor.userId()){
                modalService.myCreate($scope);
                $scope.pageTitle="Create New Link";
                $scope.button="Create";
                $scope.editable=true;
                $scope.message="Want to create private link? You have to login first.";
                $scope.submit = function (link) {
                    if(link.name&&link.img&&link.url!=null) {
                        $meteor.call('addLink', link);
                    }else{
                        $window.alert("Please fill out the complete link information");
                        $scope.open();
                    }
                };
            }else{
              $window.alert("Sorry,You don't have a login system, Can't create links");
            }

            };
        $scope.update=function(link) {
            if(!Meteor.userId()){
                $window.alert("Sorry,You don't have a login system, Can't modify any link")
            }else{
                modalService.myUpdate($scope);
                $scope.pageTitle = "Update this Link";
                $scope.button = "Update";
                $scope.message = "You can only modify the link you create.";
                if(Meteor.userId()&&link.owner!=Meteor.userId()) {
                    $scope.editable = false;
                }else{
                    $scope.editable = true;
                }
                $scope.submit = function (link) {
                    if(Meteor.userId()&&link.owner!=Meteor.userId()){

                        $window.alert("Sorry,You can't modify other users' link")
                    }else{
                    $meteor.call('setChecked', link._id, !link.checked);
                   }
                }
            }


        }
    }])
.controller('ModalInstanceCtrl', ['$scope', '$modalInstance','$meteor', function ($scope,$modalInstance) {

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
    };
}])
.controller('hideShow',['$scope',function($scope){
        $scope.custom=true;
        $scope.toggleCustom=function(){
            $scope.custom=$scope.custom===false? true:false;
        };
        $("#Img img").click((function () {
            $scope.custom=true;
            $("#input3 img").attr('src', $(this).attr("src"));
            $scope.link.img=$(this).attr("src");


      }));

    }]);


