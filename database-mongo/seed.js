const mongoose = require('mongoose');
const db = require('./index.js');
const { Cafe, Location } = require('./data.js');

const cafeData = [];
const starbucks = {
    name: 'Starbucks',
    address: '299 Fremont St, San Francisco, CA 94105',
    description: 'Seattle-based nationwide coffee franchise. Currently the #1 selling coffee in America.',
    logo: 'https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2011/02/Starbucks-New-Logo_thumb.png',
    menu: []
}

starbucks.menu.push({
    item: 'Caffe Americano',
    price: '$4.00',
    image: 'https://globalassets.starbucks.com/assets/f12bc8af498d45ed92c5d6f1dac64062.jpg?impolicy=1by1_wide_1242'
});

starbucks.menu.push({
    item: 'Cappuccino',
    price: '$4.75',
    image: 'https://globalassets.starbucks.com/assets/5c515339667943ce84dc56effdf5fc1b.jpg?impolicy=1by1_wide_1242'
});

starbucks.menu.push({
    item: 'Espresso',
    price: '$5.00',
    image: 'https://globalassets.starbucks.com/assets/ec519dd5642c41629194192cce582135.jpg?impolicy=1by1_wide_1242'
});

starbucks.menu.push({
    item: 'White Chocolate Mocha',
    price: '$5.50',
    image: 'https://globalassets.starbucks.com/assets/4b621e63f6ba4c19a8618055284eca8d.jpg?impolicy=1by1_wide_1242'
});

const peets = {
    name: "Peet's Coffee",
    address: '405 Howard St, San Francisco, CA 94105',
    description: 'Berkeley-born chain featuring signature coffee, tea & blended drinks alongside baked goods.',
    logo: 'https://www.nrn.com/sites/nrn.com/files/styles/article_featured_standard/public/peets-coffee-logo-promo_0.png?itok=ZYKYuo6I',
    menu: []
};

peets.menu.push({
    item: 'Coffee of the Day',
    price: '$3.50',
    image: 'https://d3mrtwiv4dr09z.cloudfront.net/media/catalog/product/cache/2/medium_image/640x640/9df78eab33525d08d6e5fb8d27136e95/1/8/18beverage_Hot_Coffee_375x375.jpg',
});

peets.menu.push({
    item: 'Oak Milk Horchata Latte',
    price: '$4.25',
    image: 'https://d3mrtwiv4dr09z.cloudfront.net/media/catalog/product/cache/2/medium_image/640x640/9df78eab33525d08d6e5fb8d27136e95/1/8/18brd_bevweb_holidayspicedlatte_fa375_1.jpg'
});

peets.menu.push({
    item: 'Cold Brew Iced Coffee',
    price: '$4.00',
    image: 'https://d3mrtwiv4dr09z.cloudfront.net/media/catalog/product/cache/2/medium_image/640x640/9df78eab33525d08d6e5fb8d27136e95/1/8/18beverage_Cold_Brew_Ice_Coffee_375x375.jpg'
});

peets.menu.push({
    item: 'Iced Vanilla Cinnamon Latte',
    price: '$5.00',
    image: 'https://d3mrtwiv4dr09z.cloudfront.net/media/catalog/product/cache/2/medium_image/640x640/9df78eab33525d08d6e5fb8d27136e95/1/8/18beverage_iced_caffe_latte_375x375_1_1.jpg'
});

const bluebottle = {
    name: 'Blue Bottle Coffee',
    address: '168 2nd St, San Francisco, CA 94105',
    description: 'Trendy cafe chain offering upscale coffee drinks & pastries, plus beans & brewing equipment.',
    logo: 'https://bluebottlecoffee.com/assets/fb-og-image-default-b0bce82fbf6759deaa8fb9b4b848783f6108edc78c42af454c1f82e7e999e093.png',
    menu: []
};

bluebottle.menu.push({
    item: 'Espresso',
    price: '$3.00',
    image: 'https://bluebottlecoffee.com/assets/fb-og-image-default-b0bce82fbf6759deaa8fb9b4b848783f6108edc78c42af454c1f82e7e999e093.png'
});

bluebottle.menu.push({
    item: 'Macchiato',
    price: '$3.25',
    image: 'https://bluebottlecoffee.com/assets/fb-og-image-default-b0bce82fbf6759deaa8fb9b4b848783f6108edc78c42af454c1f82e7e999e093.png'
});

bluebottle.menu.push({
    item: 'Cappuccino',
    price: '$3.75',
    image: 'https://bluebottlecoffee.com/assets/fb-og-image-default-b0bce82fbf6759deaa8fb9b4b848783f6108edc78c42af454c1f82e7e999e093.png'
});

bluebottle.menu.push({
    item: 'New Orleans',
    price: '$4.00',
    image: 'https://bluebottlecoffee.com/assets/fb-og-image-default-b0bce82fbf6759deaa8fb9b4b848783f6108edc78c42af454c1f82e7e999e093.png'
});

const philz = {
    name: 'Philz Coffee',
    address: '300 Folsom St, San Francisco, CA 94105',
    description: 'Laid-back local chain specializes in custom-blended coffees, plus teas, specialty drinks & pastries.',
    logo: 'https://i.pinimg.com/originals/52/21/8d/52218db46840be8727b9f3182ce22ef4.jpg',
    menu: []
}

philz.menu.push({
    item: 'Tesora',
    price: '$4.50',
    image: 'https://i.pinimg.com/originals/52/21/8d/52218db46840be8727b9f3182ce22ef4.jpg'
});

philz.menu.push({
    item: "Jacob's Wonderbar",
    price: '$4.50',
    image: 'https://i.pinimg.com/originals/52/21/8d/52218db46840be8727b9f3182ce22ef4.jpg'
});

philz.menu.push({
    item: 'Sooo Good',
    price: '$4.50',
    image: 'https://i.pinimg.com/originals/52/21/8d/52218db46840be8727b9f3182ce22ef4.jpg'
});

philz.menu.push({
    item: 'Colombia Darker Roast',
    price: '$4.50',
    image: 'https://i.pinimg.com/originals/52/21/8d/52218db46840be8727b9f3182ce22ef4.jpg'
});

cafeData.push(starbucks);
cafeData.push(peets);
cafeData.push(bluebottle);
cafeData.push(philz);

const locationData = [];
const hackreactor = {
    address: '44 Tehama St, San Francisco, CA 94105',
    name: 'Hack Reactor',
    nearbyCafes: []
}

locationData.push(hackreactor);

const insertCafes = function() {
    Cafe.create(cafeData)
    .then(() => console.log('Cafes seeded'))
    .then(() => {
        insertLocation()
    })
    .catch(err => {
        console.log(err)
    })
}

const insertLocation = function() {
    Location.create(locationData)
    .then(() => console.log('Locations seeded'))
    .catch(err => {
        console.log(err)
    })
}

insertCafes();