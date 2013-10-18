//Articles service used for articles REST endpoint
angular.module('mean.tutors').factory("Tutors", ['$resource', function($resource) {
    return $resource('users');
}]);