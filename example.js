cv = require('opencv');
cv.readImage('fruits.jpg', function(err, mat){
	mat.gaussianBlur([17,17]);
	var win = new cv.NamedWindow("image");
	win.show(mat);
	win.blockingWaitKey(0);
});
