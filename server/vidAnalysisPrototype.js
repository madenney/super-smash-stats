/**
 * Created by Matt on 8/7/2017.
 */
console.log("Video Analysis Test");
// const { exec } = require('child_process');
// exec('ffmpeg -version', (err, stdout, stderr) => {
//     if (err) {
//         // node couldn't execute the command
//         return;
//     }
//
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: \n ${stdout}`);
//     //console.log(`stderr: ${stderr}`);
// });


var ocr = require('ocr');

// Set default values.
var params = {
    input: './test/output2.jpg',
    output: './test/ocrtest1.txt',
    format: 'text'
};

// OCR the input image and output result to text file given by params.output
ocr.recognize(params, function(err, document){
    if(err)
        console.error(err);
    else{
        //output the document object:
        console.log(document);
    }
});