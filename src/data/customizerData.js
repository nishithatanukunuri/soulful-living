export const customizerData = [
    {
        baseProduct: {
            id: 'chair',
            name: 'Soulful Accent Chair',
            basePrice: 249.99,
            description: 'Design a chair that perfectly matches your space and style.',
            heroImage: '/images/customizer/combo-chair-oak-linen.png'
        },
        options: {
            frame: [
                { id: 'oak', name: 'Reclaimed Oak', priceModifier: 0, thumbnail: '/images/customizer/frame-oak.png' },
                { id: 'walnut', name: 'Solid Walnut', priceModifier: 50, thumbnail: '/images/customizer/frame-walnut.png' },
            ],
            cushion: [
                { id: 'linen', name: 'Organic Linen', priceModifier: 0, thumbnail: '/images/customizer/cushion-linen.png' },
                { id: 'sage', name: 'Sage Green Weave', priceModifier: 20, thumbnail: '/images/customizer/cushion-sage.png' },
            ],
        },
    },
    {
        baseProduct: {
            id: 'sofa',
            name: 'Serenity Sofa',
            basePrice: 899.99,
            description: 'Customize the centerpiece of your living room with sustainable materials.',
            heroImage: '/images/customizer/combo-sofa-oak-linen.png'
        },
        options: {
            base: [
                { id: 'oak', name: 'Oak Base', priceModifier: 0, thumbnail: '/images/customizer/sofa-base-oak.png' },
                { id: 'steel', name: 'Black Steel Base', priceModifier: 100, thumbnail: '/images/customizer/sofa-base-steel.png' },
            ],
            fabric: [
                { id: 'linen', name: 'Organic Linen', priceModifier: 0, thumbnail: '/images/customizer/sofa-cushion-linen.png' },
                { id: 'terracotta', name: 'Terracotta Velvet', priceModifier: 150, thumbnail: '/images/customizer/sofa-cushion-terracotta.png' },
            ],
        },
    },
    {
        baseProduct: {
            id: 'bookshelf',
            name: 'Artisan Bookshelf',
            basePrice: 699.99,
            description: 'A perfect blend of form and function, tailored to your taste.',
            heroImage: '/images/customizer/combo-bookshelf-brass-pine.png'
        },
        options: {
            frame: [
                { id: 'brass', name: 'Brushed Brass', priceModifier: 150, thumbnail: '/images/customizer/bookshelf-frame-brass.png' },
                { id: 'steel', name: 'Matte Black Steel', priceModifier: 0, thumbnail: '/images/customizer/bookshelf-frame-steel.png' },
            ],
            shelves: [
                { id: 'pine', name: 'Reclaimed Pine', priceModifier: 0, thumbnail: '/images/customizer/bookshelf-shelves-pine.png' },
                { id: 'walnut', name: 'Solid Walnut', priceModifier: 200, thumbnail: '/images/customizer/bookshelf-shelves-walnut.png' },
            ],
        },
    },
];