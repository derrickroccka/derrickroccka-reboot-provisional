console.log('Derrick Roccka');
import mojs from 'mo-js';

var lastFired, timeout;

/* ADD CUSTOM SHAPE SOMEWHERE IN YOUR CODE */
class Heart extends mojs.CustomShape {
	getShape () { return '<g id="Layer_2" data-name="Layer 2"><g id="Layer_16" data-name="Layer 16"><path class="cls-1" d="M45.68,52.52c-1.37-11.86-17.37-14.06-27-13.92C5.69,38.8-3.95,48.75,1.6,61.88,7,74.64,21.69,78.83,33.92,81.83s30.95,7.8,32,23.2l5.89-.8a77,77,0,0,1-.67-44.59c2.13-7.36,5.65-13.86,9.24-20.56,3-5.63,6-11.71,6.09-18.23C86.67,10.72,79.4,2.95,69.8.72A25.65,25.65,0,0,0,43.42,9.78C35.4,20.08,35,34.48,39,46.47c1.22,3.64,7,2.08,5.79-1.6-4-12-3.41-29.49,9.09-36.51C63.39,3,79.49,6.8,80.45,19.29c.61,7.9-4.47,15.27-8.05,21.9a84.57,84.57,0,0,0-7.9,20.1A82.91,82.91,0,0,0,66,105.83c1,3.09,6.13,2.72,5.89-.8-1.6-23.35-29.13-26.11-46.41-31.72-5.32-1.73-10.69-4.13-14.63-8.23C6.1,60.11,3,50.65,10.42,46.4c4.48-2.59,10.62-2,15.51-1.24,4.27.65,13.12,1.89,13.75,7.36.44,3.79,6.44,3.84,6,0Z"/></g></g>'; }
	getLength () { return 200; } // optional
}
mojs.addShape( 'heart', Heart ); // passing name and Bubble class

/* USE CUSTOM SHAPE */
// now it is available on mojs.Shape constructor as usual
const heart = new mojs.Burst({
	left: 0,
	top: 0,
	shape:    'heart', // <--- shape of heart is now available!
	fill:     {'#e87bae':'none'},
	stroke:   '#e87bae',
	scale:    { 0 : 1 },
	strokeWidth: { 10 : 0 },
	y:         -20,
	duration:  400,
	angle:        { 0: 15}
});

const heartFriends = new mojs.Burst({
	left: 0,
	top: 0,
	shape:    'heart', // <--- shape of heart is now available!
	count: 6,
	children: {
		shape:        'heart',
		stroke:       '#e87bae',
		duration:     500,
		angle:        { 0:  15} ,
		radius:       20
	}
});

const utils = {
	hasClass: function(el, className){
		return el.classList.contains(className);
	},
	addClass: function(el, className){
		if (el.classList)
			el.classList.add(className);
		else
			el.className += ' ' + className;
	},
	removeClass: function(el, className){
		if (el.classList)
			el.classList.remove(className);
		else
			el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	}
};

const toggleFaces = function(checker){
	console.debug(Date.now() - lastFired > 1000);
	const states = {
		happy: document.querySelector('.happy'),
		serious: document.querySelector('.serious')
	};
	if(!utils.hasClass(states['happy'], 'hidden') && !checker){
		lastFired = Date.now();
	}
	else if(utils.hasClass(states['happy'], 'hidden') && !checker){
		utils.removeClass(states['happy'], 'hidden');
		utils.addClass(states['serious'], 'hidden');
		if(!lastFired){
			lastFired = Date.now();
		}
	}
	else if(Date.now() - lastFired > 1000 && !utils.hasClass(states['happy'], 'hidden') && checker){
		console.log('Serious again...', lastFired);
		utils.removeClass(states['serious'], 'hidden');
		utils.addClass(states['happy'], 'hidden');
		clearTimeout(timeout);
	}
	
};


Array.from(document.querySelectorAll('.face img')).forEach(function(element) {
	element.addEventListener('mousedown', function (e) {
		toggleFaces();
		heart
			.tune({ x: e.pageX, y: e.pageY })
			.generate()
			.replay();
		heartFriends
			.tune({ x: e.pageX, y: e.pageY })
			.generate()
			.replay();
	});
	element.addEventListener('mouseup',function(e){
		timeout = setTimeout(function(){
			toggleFaces(true);
			
		}, 1000);
	});
});
