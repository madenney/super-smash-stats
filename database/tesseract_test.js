/**
 * Created by Matt on 8/7/2017.
 */

var tesseract = require('node-tesseract');
console.log("Testing Tesseract");
// Recognize text of any language in any format
imageLocation = __dirname + '/test/output3.jpg';
console.log(imageLocation);
tesseract.process(imageLocation,function(err, text) {
    if(err) {
        console.log("There was an error: ");
        console.error(err);
    } else {
        console.log(text);
    }
});

// Recognize German text in a single uniform block of text and set the binary path

// var options = {
//     l: 'deu',
//     psm: 6,
//     binary: '/usr/local/bin/tesseract'
// };
//
// tesseract.process(__dirname + '/path/to/image.jpg', options, function(err, text) {
//     if(err) {
//         console.error(err);
//     } else {
//         console.log(text);
//     }
// });