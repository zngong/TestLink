angular.module("myApp").run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        if (error === 'AUTH_REQUIRED') {//当状态改变遇到错误时被触发
            $state.go('links');
        }
    });
}]);

angular.module("myApp").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
    function ($urlRouterProvider, $stateProvider, $locationProvider) {
   $locationProvider.html5Mode(true);//$location服务初始化,可以获取或者改变当前URL

        $stateProvider
            .state('links', {
                url: '/links',//使用url参数可以实现嵌套的路由，
                //当用户浏览到/links时，该应用将状态改为links同时向主ui-view元素中插入模板
                templateUrl: 'client/links/views/link.ng.html',
                controller: 'ModalDemoCtrl'
            })
            .state('linkDetails', {
                url: '/links/:linkId',
                templateUrl: 'client/links/views/link-detail.ng.html',
                controller: 'ModalDetailCtrl',
                resolve: {//在route（路由）里使用resolve可以让我们在route（路由）被完全加载之前
                          // 获取我们需要加载的数据。当数据被加载成功之后，路由就会改变而页面也会
                          // 呈现给用户；数据没有被加载成功,route就不会改变，
                          "currentUser": ["$meteor", function($meteor){
                                          return $meteor.requireUser();
                                       }]
                }
            });
//在用户提交的路径没有被定义的时候它将重定向到指定的页面
        $urlRouterProvider.otherwise("/links");
    }]);