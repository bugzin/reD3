'use strict';

// var app = angular.module('app');
angular.module('app', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'app/partials/main.html', controller: MainCtrl});
    $routeProvider.when('/pie', {templateUrl: 'app/partials/pie.html', controller: PieCtrl});
    $routeProvider.when('/line', {templateUrl: 'app/partials/line.html', controller: LineCtrl});
    $routeProvider.when('/bar', {templateUrl: 'app/partials/bar.html', controller: BarCtrl});
    $routeProvider.when('/area', {templateUrl: 'app/partials/area.html', controller: AreaCtrl});
    $routeProvider.when('/heatmap', {templateUrl: 'app/partials/heatmap.html', controller: HeatMapCtrl});
    $routeProvider.when('/bubble', {templateUrl: 'app/partials/bubble.html', controller: BubbleCtrl});
    $routeProvider.when('/stackedarea', {templateUrl: 'app/partials/stackedarea.html', controller: StackedAreaCtrl});
    $routeProvider.when('/treemap', {templateUrl: 'app/partials/treemap.html', controller: TreeMapCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);