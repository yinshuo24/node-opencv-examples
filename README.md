#node-opencv
##Introduction
[OpenCV](http://opencv.org/)bindings for Nodejs.<br />
For introduction of OpenCV, please visit [its website](http://opencv.org/).<br />
You can access source of **node-opencv** on its [github repo](https://github.com/peterbraden/node-opencv).
##Installation on Linux
####Dependencies
1. OpenCV: newer than 2.3.1 but not 3.x
2. pkg-config: needed to find OpenCV libraries
3. node-gyp: compiler

####Installation
    npm install opencv
We use npm to install node-opencv package. It will download the source and complie automaticly.<br />
##API Reference
####Top Level API
**these are what you get when you require opencv**
* Constants: object, contain some constants in OpenCV
* readImage: function, corresponding to `imread` in OpenCV
* Point: class, corresponding to `Point` class in OpenCV
* Matrix: class, corresponding to `Mat` class in OpenCV
* NamedWindows: class, GUI part of **node-opencv**, slightly different from `Highgui` module
* Contours: class, find contours in a given binary image, corresponding to contours operation in OpenCV
* imgproc: class, contain some image processing method
* calib3d: class, calibrate camera, corresponding to camera calibration part in OpenCV
* VideoCapture: class, corresponding `VideoCapture` class in OpenCV
* StereoBM, SterroSGBM, StereoGC: class, for computing stereo.
* CascadeClassifier: class, function as its name
* TrackedObject: class, function as its name

These below are avaliable with opencv 2.4.x<br />
* BackgroundSubtractor: subtract background from input video
* ImageSimilarity: function,calculate the similarity of two images. use OpenCV's features2d module to achieve this
* FaceRecognizer: object, LBPFaceRecognizer in OpenCV
* LDA: Linear Discriminant Analysis. use cv::subspaceProject to implement

These interface below are defined in opencv.js not compiled from native opencv library<br />
* ImageStream, ImageDataStream, ObjectDetectionStream, VideoStream: inherited from `Stream`
* CASCADES: object, provide cascade data for faces.

####Interface Details
#####Constants
You can view the key and value in Constants using:
```javascript
cv = require('opencv');
console.log(cv.Constants);
```
#####readImage
`readImage` takes two arguments, one is the filename, the other is a callback function describe what you what to do with the image. It has the foramt:
```javascript
cv = require('opencv');
cv.readImage('filename', function(err,mat){
    //things you what to do with mat
    });
```
the first arguments of the callback is error message and the second is an instance of `Matrix` which contains image data.<br />
One simple example:
```javascript
cv = require('opencv');
cv.readImage('fruits.jpg', function(err, mat){mat.save('rename.jpg');});
```
In OpenCV, `imread` function has a flag argument specifying the color type of a loaded image. But in node-opencv, it just use the default argument.
#####Point
2-D point, immutable once set.
```javascript
cv = require('opencv');
var p = new cv.Point(3,4); //create a point
console.log("(x,y): ("+p.x+","+p.y+")");
p.x=4; //This will cause an error
```
#####Matrix
It's basic data structure and is most useful. Image data are contained in `Matrix` structure when loaded.<br />
######constructor
As shown in source file *"Matrix.h"*, `Matrix` has four constructors.
```c++
Matrix();
Matrix(cv::Mat other, cv::Rect roi);
Matrix(int rows, int cols);
Matrix(int rows, int cols, int type);
Matrix(int rows, int cols, int type, Local<Object> scalarObj);
```
######accessing data
```javascript
cv = require('opencv');
var m = cv.Matix.Eye(4,4); //create an identity matrix
m.get(0,0); //1
m.row(0); // 1 0 0 0
m.col(0); // 1 0 0 0
m.set(0,1,4);
m.get(0,1); //4
```
######matrix info
```javascript
var m = new cv.Matrix(4,4,cv.Constants.CV_8UC3);
m.size(); //[4, 4]
m.channels(); //3
m.height(); //4
m.width(); //4
```
######image processing
```javascript
//suppose mat is an image loaded before
//most of these operations are done on input image
//gaussianBlur accepts an array indicating kernel size, the sigma is computed based on kernel size
mat.gaussianBlur([kernelsize_x,kernelsize_y]);
mat.canny(lowThresh, highThresh);
mat.erode(inters);
```
There are also many other methods in `Matrix`. You can dive into its source to find more.