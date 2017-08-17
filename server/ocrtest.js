var ocr = require('ocr');

console.log('testing...');

// Set default values.
var params = {
    input: './test/output1.jpg',
    output: './test/out.txt',
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