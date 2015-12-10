Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});
angular.module('myApp')
    .controller('ModalDemoCtrl',['$scope','$meteor','$modal','$log','modalService','$window', function ($scope,$meteor,$modal, $log,modalService,$window) {
        $scope.links = $meteor.collection(Links).subscribe('links');
        $scope.order="name";
          //if(Meteor.userId()){
          //    $scope.hide=false;
          //   }else{
          //      $scope.hide=true;
          //    }
        $scope.remove = function(link){
            if(Meteor.userId()&&link.owner===Meteor.userId()){
                var r=confirm("Do you want to delete this link?");
                if (r==true)
                {
                    $scope.links.remove(link);
                }
                else
                {
                    return false;
                };

            }else if(!Meteor.userId()){
                $window.alert("Sorry, You don't have a login, Can't delete any links");
            }else{

                $window.alert("Sorry, You can't delete other users' link");
            }

        };
        $scope.create= function () {
            if(Meteor.userId()){
                modalService.myCreate($scope);
                $scope.pageTitle="Create New Link";
                $scope.button="Create";
                $scope.editable=true;
                $scope.message="Want to create private link? You have to login first.";
                $scope.submit = function (link) {
                    if(document.getElementById('LinkTitle').value&&document.getElementById('ImgUrl').value&&document.getElementById('input4').value) {
                        $meteor.call('addLink', link);
                    }else{
                        $window.alert("Please fill out the complete link information");
                        $scope.open();
                    }
                };
            }else{
              $window.alert("Sorry,You don't have a login system.Can't create link");
            }

            };
        $scope.update=function(link) {
            if(!Meteor.userId()){
                $window.alert("Sorry,You don't have a login system,You can't modify any link");
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

                        $window.alert("Sorry,You can't modify other user's link")
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
        $("#Img img").click((function (link) {
            $scope.custom=true;
            $("#input3 img").attr('src', $(this).attr("src"));
            $("#ImgUrl").attr('value', $(this).attr("src"));
            $scope.link.img=$(this).attr("src");

      }));

    }]);


