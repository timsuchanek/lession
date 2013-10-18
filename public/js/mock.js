// not used now....
app = angular.module('mean');
app.run(function($httpBackend) {
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
		hourlyRate: 20
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
		hourlyRate: 20
	}];

	$httpBackend.whenGET('/tutors').respond(tutors);
});