angular.module('mean.tutors').controller('TutorsController', ['$scope', '$routeParams', '$location', 'Global', 'Articles',
	function($scope, $routeParams, $location, Global, Tutors) {

		$scope.max = 5;
		$scope.isReadonly = true;

		// defining some mock data
		var now = new Date();
		var twoHours = 2 * 60 * 60 * 1000;
		var tutors = [{
			name: 'Tim Suchanek',
			email: 'tim@timsuchanek.de',
			username: 'vardump1',
			provider: 'Google',
			calendar: [{
				start: now,
				end: new Date(now.getTime() + twoHours),
				freeTime: true
			}, {
				start: new Date(now.getTime() + twoHours),
				end: new Date(now.getTime() + twoHours * 2),
				freeTime: false,
				partner: 'vardump2',
				topics: ['HTML5'],
				isTutor: true
			}],
			google: '',
			teach: [{
				category: 'HTML5',
				verified: false
			}],
			learn: ['Spanish', 'Danish', 'C/C++'],
			documents: ['notenauszug_ws13.pdf', 'lebenslauf.pdf'],
			hourlyRate: 200,
			profilePicture: 'baby.jpg',
			rating: 4
		}, {
			name: 'Hans Peter',
			email: 'tim@timsuchanek2.de',
			username: 'hanspeter',
			provider: 'Google',
			calendar: [{
				start: now,
				end: new Date(now.getTime() + twoHours * 2),
				freeTime: true
			}, {
				start: new Date(now.getTime() + twoHours * 2),
				end: new Date(now.getTime() + twoHours * 3),
				freeTime: false,
				partner: 'vardump1',
				topics: ['HTML5'],
				isTutor: true
			}],
			google: '',
			teach: [{
				category: 'HTML5',
				verified: false
			}],
			learn: ['Spanish', 'Danish', 'C/C++'],
			documents: ['notenauszug_ws13.pdf', 'lebenslauf.pdf'],
			hourlyRate: 20,
			profilePicture: 'polar-bear.jpg',
			rating: 5
		}];
		for (var i = 0; i < 10; i++) {
			tutors.push(tutors[1]);
		};
		$scope.global = Global;
		$scope.find = function(query) {
			// Tutors.query(query, function(tutors) {
			//     $scope.tutors = tutors;
			// });
			$scope.tutors = tutors;
		};
		$scope.gridOptions = {
			data: 'tutors',
			columnDefs: [{
				field: 'name',
				displayName: 'Name'
			}, {
				field: 'profilePicture',
				displayName: 'Avatar',
				cellTemplate: '<img ng-src="/assets/avatars/{{row.getProperty(\'username\')}}/{{row.getProperty(col.field)}}" alt="" />'
			}, {
				field: 'rating',
				displayName: 'Rating',
				cellTemplate: '<rating value="row.getProperty(col.field)" max="max" readonly="isReadonly"></rating>'
			}, {
				field: 'calendar',
				displayName: 'Free Time from Now',
				cellTemplate: '<p>Time left: {{timeLeft(row.getProperty(col.field))|date:\'h:mm:ss\'}}</p>'
			}, {
				field: 'teach',
				displayName: 'Categories',
				cellTemplate: '<ul><li ng-repeat="cat in row.getProperty(col.field)">{{cat.category}}</li></ul>'
			}, {
				field: 'hourlyRate',
				displayName: 'Hourly Rate',
				cellTemplate: '<p>{{row.getProperty(col.field)|currency:\'Euro\'}}</p>'
			}, {
				field: '',
				displayName: 'Call',
				cellTemplate: '<button type="button" class="btn btn-success" ng-click="call(row.getProperty(\'username\'))">Call</button>'
			}],
			rowHeight: 60,
			filterOptions: {
				filterText: ''
			},
			showFilter: true
		}

		$scope.call = function (whom) {

			console.log('calling ' + whom + ' as ' + $scope.global.user.name);
		}

		/**
		 * If a tutor is free, how much time does he still have?
		 * @param  {array} calendar Array of events
		 * @return {number} seconds left
		 */
		$scope.timeLeft = function(calendar) {
			var noww = new Date().getTime();
			for (var i = 0, max = calendar.length; i < max; i += 1) {
				var event = calendar[i];
				if (event.start.getTime() <= noww && noww <= event.end.getTime()) {
					return (event.end.getTime() - noww) / 1000;
				}
			}
			return 0;
		}
	}
]);