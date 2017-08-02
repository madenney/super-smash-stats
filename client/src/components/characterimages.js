import React from 'react';

function importAll(r) {
    let chara_images = {};
    r.keys().map((item, index) => { chara_images[item.replace('./', '')] = r(item); });
    return chara_images;
}

const chara_images = importAll(require.context('./imgs/characters', false, /\.(gif|png|jpe?g|svg)$/));

// import images from './images';
// <img src={images['landingpage.png']} />
// <img src={images['logo.svg']} />
// <img src={images['ProfilePlaceholder.gif']} />
// <img src={images['SmashBrosSymbol.svg']} />

export default chara_images;
