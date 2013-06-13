var win = Ti.UI.createWindow({
  backgroundColor: 'white',
  exitOnClose:true,
  layout: 'vertical'
});

opts = {
  color:'black',
  font:{fontSize:20},
  text:'-',
  top:20, left:10,
  width:300
};
var labelTimestamp = Ti.UI.createLabel(opts);
win.add(labelTimestamp);
var labelx = Ti.UI.createLabel(opts);
win.add(labelx);
var labely = Ti.UI.createLabel(opts);
win.add(labely);
var labelz = Ti.UI.createLabel(opts);
win.add(labelz);
var labelu = Ti.UI.createLabel(opts);
win.add(labelu);
win.open();

var updates = 0;

var accClosure = function () {
	var last = 0;
	return function(e) {
		updates += 1;
	  	labelTimestamp.text = 'Delta time: ' + (e.timestamp - last);
	  	labelx.text = 'x: ' + e.x;
	  	labely.text = 'y: ' + e.y;
	  	labelz.text = 'z: ' + e.z;
	  	last = e.timestamp;
	};
};

setInterval(function () {
	labelu.text = 'Updates per second: ' + updates;
	updates = 0;
}, 1000);

if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1 ){
  alert('Accelerometer does not work on a virtual device');
} else {
  Ti.Accelerometer.addEventListener('update', accClosure());
  if (Ti.Platform.name === 'android'){
    Ti.Android.currentActivity.addEventListener('pause', function(e) {
      Ti.API.info("removing accelerometer callback on pause");
      Ti.Accelerometer.removeEventListener('update', accClosure());
    });
    Ti.Android.currentActivity.addEventListener('resume', function(e) {
      Ti.API.info("adding accelerometer callback on resume");
      Ti.Accelerometer.addEventListener('update', accClosure());
    });
  }
}