const mongoose = require('mongoose');
require('dotenv').config();
const { Product, Order } = require('./models');

// Using fast Unsplash stock images - Expanded list
const PRODUCTS = [
    {
      name: 'CYBER DIESEL JACKET',
      price: 8500,
      category: 'OUTERWEAR',
      images: [
          'https://images.unsplash.com/photo-1551028919-ac66c5f8b6b0?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1520975661595-dc998dd24d95?auto=format&fit=crop&q=80&w=800',
      ],
      description: 'Distressed Italian denim. 2003 Archive piece. Heavy weight.',
      tags: ['archive', 'y2k', 'outerwear'],
      size: 'L'
    },
    {
      name: 'MATRIX TRENCH',
      price: 12000,
      category: 'OUTERWEAR',
      images: [
          'https://images.unsplash.com/photo-1534349762913-96c87130f6bf?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?auto=format&fit=crop&q=80&w=800',
      ],
      description: 'Floor length leather coating. Waterproof. The One.',
      tags: ['dark', 'matrix', 'leather'],
      size: 'XL'
    },
    {
        name: 'ACID WASH CARGO',
        price: 4500,
        category: 'BOTTOMS',
        images: [
            'https://images.unsplash.com/photo-1624378439575-d8aa19c84bfa?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1584370848010-d7cc6bc76e4f?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Baggy fit multi-pocket cargo pants. Chemical wash treatment.',
        tags: ['streetwear', 'baggy', 'utilitarian'],
        size: '32'
    },
    {
        name: 'VAMP MESH TOP',
        price: 3200,
        category: 'TOPS',
        images: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Sheer tactical mesh with asymmetric cutouts.',
        tags: ['club', 'mesh', 'avant-garde'],
        size: 'M'
    },
    {
        name: 'CHROME HEART NECK',
        price: 15000,
        category: 'ACCESSORIES',
        images: [
            'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800'
        ],
        description: '.925 Silver chunky chain. Industrial aesthetic.',
        tags: ['jewelry', 'silver', 'chrome'],
        size: 'OS'
    },
    {
        name: 'OAKLEY VINTAGE',
        price: 9000,
        category: 'ACCESSORIES',
        images: [
            'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Speed dealer shades. Iridescent lens. Mint condition.',
        tags: ['eyewear', 'sport', 'fast'],
        size: 'OS'
    },
    {
        name: 'DESTROYED KNIT',
        price: 5500,
        category: 'TOPS',
        images: [
            'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Hand distressed mohair blend. Oversized sleeves.',
        tags: ['grunge', 'knit', 'winter'],
        size: 'L'
    },
    {
        name: 'BALENCI RUNNER',
        price: 22000,
        category: 'FOOTWEAR',
        images: [
            'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Heavily used aesthetic. Technical construction.',
        tags: ['shoes', 'designer', 'chunky'],
        size: '43'
    },
    {
        name: 'HEAVY METAL TEE',
        price: 4000,
        category: 'TOPS',
        images: [
            'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Vintage 1999 tour t-shirt. Faded black. Boxy fit.',
        tags: ['vintage', 'band', 'tee'],
        size: 'XL'
    },
    {
        name: 'PATCHWORK DENIM',
        price: 7500,
        category: 'BOTTOMS',
        images: [
            'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Custom reconstructed jeans. Japanese denim patches.',
        tags: ['custom', 'denim', 'pants'],
        size: '30'
    },
    {
        name: 'TACTICAL VEST',
        price: 6000,
        category: 'OUTERWEAR',
        images: [
            'https://images.unsplash.com/photo-1506634572416-48cdfe530110?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Military surplus vest. Multi-pockets. Techwear staple.',
        tags: ['techwear', 'vest', 'military'],
        size: 'M'
    },
    {
        name: 'GOTHIC RINGS',
        price: 3500,
        category: 'ACCESSORIES',
        images: [
            'https://images.unsplash.com/photo-1605100804763-eb2fc960239c?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800'
        ],
        description: 'Set of 3 stainless steel rings. Claw and skull motifs.',
        tags: ['jewelry', 'rings', 'accessories'],
        size: 'OS'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
        
        await Product.deleteMany({});
        await Order.deleteMany({});
        console.log('Cleared DB');

        await Product.insertMany(PRODUCTS);
        console.log('Seeded Products');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();