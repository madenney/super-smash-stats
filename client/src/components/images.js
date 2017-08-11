import React from 'react';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./imgs', true, /\.(gif|png|jpe?g|svg)$/));

// import images from './images';
// <img src={images['landingpage.png']} />
// <img src={images['logo.svg']} />
// <img src={images['ProfilePlaceholder.gif']} />
// <img src={images['SmashBrosSymbol.svg']} />

export default images;
