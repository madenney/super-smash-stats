var Ngocr = require('ng-ocr');
var fs = require("fs");
console.log('\n...................Testing....................\n');
Ngocr.decodeFile('../assets/ocrtest.jpg', function(error, data){
  console.log(data);
});
var buffer = fs.readFileSync("../assets/ocrtest.jpg");
Ngocr.decodeBuffer(buffer, function(error, data){
  console.log(data); // Hello World!
});
var stream = fs.createReadStream("../assets/ocrtest.jpg");
Ngocr.decodeStream(stream, function(error, data){
  console.log(data); // Hello World!
});
