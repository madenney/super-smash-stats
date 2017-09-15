import React from 'react';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

//require.context allows us to create our own context, the parameters are 1) the directory the files are located in,
//2) whether or not we will include subdirectories, and 3) regex to match files against. See: https://webpack.github.io/docs/context.html

const images = importAll(require.context('../imgs', true, /\.(gif|png|jpe?g|svg)$/));

// import images from '../features/img_filter';
// <img src={images['landingpage.png']} />
// <img src={images['logo.svg']} />
// <img src={images['ProfilePlaceholder.gif']} />
// <img src={images['SmashBrosSymbol.svg']} />

export default images;
