console.log('Derrick Roccka');
import mojs from 'mo-js';

/* ADD CUSTOM SHAPE SOMEWHERE IN YOUR CODE */
class Heart extends mojs.CustomShape {
	getShape () { return '<path d="M92.5939814,7.35914503 C82.6692916,-2.45304834 66.6322927,-2.45304834 56.7076029,7.35914503 L52.3452392,11.6965095 C51.0327802,12.9714696 48.9328458,12.9839693 47.6203869,11.6715103 L47.6203869,11.6715103 L43.2705228,7.35914503 C33.3833318,-2.45304834 17.3213337,-2.45304834 7.43414268,7.35914503 C-2.47804756,17.1963376 -2.47804756,33.12084 7.43414268,42.9205337 L29.7959439,65.11984 C29.7959439,65.1323396 29.8084435,65.1323396 29.8084435,65.1448392 L43.2580232,78.4819224 C46.9704072,82.1818068 52.9952189,82.1818068 56.7076029,78.4819224 L70.1696822,65.1448392 C70.1696822,65.1448392 70.1696822,65.1323396 70.1821818,65.1323396 L92.5939814,42.9205337 C102.468673,33.12084 102.468673,17.1963376 92.5939814,7.35914503 L92.5939814,7.35914503 Z"></path>'; }
	getLength () { return 200; } // optional
}
mojs.addShape( 'heart', Heart ); // passing name and Bubble class

/* USE CUSTOM SHAPE */
// now it is available on mojs.Shape constructor as usual
const heart = new mojs.Shape({
	shape:    'heart', // <--- shape of heart is now available!
	fill:     'none',
	stroke:   '#E87BAE',
	scale:    { 0 : 1 },
	strokeWidth: { 20 : 0 },
	y:         -20,
	duration:  500,
});

document.getElementById('button').addEventListener( 'click', function (e) {
	console.log('e', e);
	
	heart
		.tune({ x: e.pageX, y: e.pageY })
		.generate()
		.replay();
});