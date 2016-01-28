app.factory('AnimalFactory', function() {
	var AnimalFactory = {};
	var animals = [{
		name: 'Trap Giraffe',
		picture: "http://previews.123rf.com/images/tigatelu/tigatelu1302/tigatelu130200011/18047043-Cute-giraffe-cartoon-Stock-Vector-funny.jpg",
		bio: 'Never forgets to skip leg day',
		goals: 'Monster trapezii & gold chains',
		idx:0
		},
		{
		name: 'Get Swole Kangaroo',
		picture: "http://i.dailymail.co.uk/i/pix/2015/07/05/18/2A40A66D00000578-3150202-image-a-21_1436117400705.jpg",
		bio: 'A driven athlete. Tends to have a work hard/play hard attitude',
		goals: 'Better diet & sleep',
		idx:1
		},
		{
		name: 'Hungry Hog',
		picture: "http://previews.123rf.com/images/chudtsankov/chudtsankov1005/chudtsankov100500115/6905369-Chubby-Pink-Pig-Snacking-On-Grass-Stock-Vector-pig-cartoon-animal.jpg",
		bio: 'An appetite for self-improvement',
		goals: 'Slimmer physique',
		idx:2
		},
		
	]
	AnimalFactory.fetchAnimals = function() {
		return animals;
	}
	return AnimalFactory;
})