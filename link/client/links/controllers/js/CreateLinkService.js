angular.module("myApp")
    .factory('modalService', ['$modal',function($modal){
        var myModalService={};
        myModalService.myCreate=function(scope){

            var modalInstance = $modal.open({
                windowClass: 'modal discontinue-modal',
                templateUrl: 'myModalContent.ng.html',
                controller: 'ModalInstanceCtrl',
                scope: scope
            })
        };
        myModalService.myUpdate=function(scope){
                var modalInstance = $modal.open({
                    windowClass: 'modal discontinue-modal',
                    templateUrl: 'myModalContent.ng.html',
                    controller: 'ModalInstanceCtrl',
                    scope: scope
                })
        };

        return myModalService;
        }
    ])
