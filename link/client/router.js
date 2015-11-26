angular.module("myApp").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {//当状态改变遇到错误时被触发
            $state.go('links');
        }
    });
}]);

angular.module("myApp").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);//this is Location service initialization, we can get or change the current URL

        $stateProvider
            .state('links',//this is first parameter,the "links" is state's name,It can be arbitrary.
                {
                    url: '/links',//the url is page state,
                    //When the state is "/links", the template will be inserted into the "ui-view" element.
                    templateUrl: 'client/links/views/link.ng.html',
                    controller: 'ModalDemoCtrl'
            })
            .state('linkDetails', {
                url: '/links/:linkId',
                templateUrl: 'client/links/views/link-detail.ng.html',
                controller: 'ModalDetailCtrl',
                resolve: {
                          "currentUser": ["$meteor", function($meteor){
                                          return $meteor.requireUser();
                          }]
                }
            });
        $urlRouterProvider.otherwise("/links");
    }]);