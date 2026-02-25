// ============ js/data.js ============
// ============ PRODUCTS WITH MULTIPLE IMAGES ============

const products = [
  { 
    id: 1, 
    name: "Men's Dark Blue Loose Baggy Fit Heavy Washed Jeans Non-Stretchable", 
    price: 299, 
    compare: 999, 
    discount: "-70% OFF", 
    icon: "fa-tshirt",
    images: [
      "images/jeanlstwlyelice-dblue-1.jpg",
      "images/jeanlstwlyelice-dblue-2.jpg",
      "images/jeanlstwlyelice-dblue-3_5d6f5058-8688-4730-92ef-2187faa1afd7.jpg",
      "images/jeanlstwlyelice-dblue-4.jpg",
      "images/jeanlstwlyelice-dblue-5.jpg",
      "images/jeanlstwlyelice-dblue-6_2f3a11ce-6ba2-4236-8993-c9d6f964c577.jpg",
    ],
    description: "Comfortable loose fit ideal for everyday wear.Premium Denim Fabric: Made with non-stretchable 100% cotton denim fabric which is durable and ensures comfort and long-lasting wear.",
    category: "Men's Clothing",
    rating: 4.5,
    reviews: 124,
    stock: 50,
    sizes: ["28", "30", "32", "34","36"],
    hasTimer: true,           // ← Enable timer for this product        // ← 30 minutes timer
  },
  { 
      id: 2, 
        name: "ESCAPE DEER 3 Shirt Combo ED3112 R1 S1", 
        price: 499, 
        compare: 1299, 
        discount: "-65% OFF", 
        icon: "fa-tshirt",
        images: [
          "images/ChatGPT Image Feb 15, 2026, 10_34_00 PM.png",
          "images/A155D876-61F8-4F24-933D-17D75981E460.jpg",
          "images/BFB13D6A-DBC1-4F8C-953D-F84D0677281B.jpg",
          "images/9EFD6312-5AD6-46A9-9E8A-33BFDF87C80D.jpg",
        ],
        description: "FABRIC: Soft Cotton Blend. FIT: Slim Fi. SIZE: Model is wearing a L size",
        category: "Men's Clothing",
        rating: 4.7,
        reviews: 89,
        stock: 35,
        sizes: ["S", "M", "L", "XL"],
        hasTimer: true,           // ← Enable timer for this product        // ← 30 minutes timer
      },
  { 
        id: 3, 
        name: "2-Pack Classic Straight Fit Joggers", 
        price: 299, 
        compare: 999, 
        discount: "-70% OFF", 
        icon: "fa-tshirt",
        images: [
          "images/PebbleBlack_131d91bd-5ef8-4a08-a635-ea370d7a903a.jpg",
          "images/Pebble.jpg",
          "images/Black_5c478d63-060d-43fb-9b26-f00264794692.jpg"
        ],
        description: "Straight Fit Elasticated waist with drawcord Two regular side pocketsBack patch pocket.",
        category: "Men's Clothing",
        rating: 4.6,
        reviews: 156,
        stock: 25,
        sizes: ["28", "30", "32", "34","36"],
        hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
      },
  { 
    id: 4, 
    name: "Classic Caramel Brown Double Cloth Straight-Fit Trousers", 
    price: 249, 
    compare: 599, 
    discount: "-60% OFF", 
    icon: "fa-female",
    images: [
      "images/1_e2010a3d-6b6e-40c2-bb10-c83828d16afb.jpg",
      "images/2_11ccc4c2-7464-43d5-8fbe-d1115e0bbfce.jpg",
      "images/3_af7b8e0a-324a-46a3-9fd0-e0fe0b568992.jpg",
      "images/4_c59cdec3-8580-4e7e-b0c6-ba9f8936fc9f.jpg",
      "images/8_ef1cab86-e889-450c-8139-951f306ce603.jpg",
    ],
    description: "This classic caramel brown double cloth straight-fit trousers are tailored for a refined yet effortless look. Crafted from premium double-layered fabric, it offers enhanced structure, durability, and all-day comfort. Color: Brown Material: 100% Cotton Number of Pockets: 4",
    category: "Men's Clothing",
    rating: 4.8,
    reviews: 203,
    stock: 20,
    sizes: ["28", "30", "32", "34","36"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
  { 
     id: 5, 
        name: "Solid Pure Cotton Polo Shirt", 
        price: 199, 
        compare: 599, 
        discount: "-60% OFF", 
        icon: "fa-female",
        images: [
          "images/1_3ed28cc8-0a43-497e-a70f-4d3d50146f17.jpg",
          "images/2_740d9035-8314-4d59-b757-50b12790a4e5.jpg",
          "images/4_e3d4356e-1ba0-49c9-be4c-bd66f77733d6.jpg",
          "images/8_1c91a8d4-cdad-49cb-a045-9894423945c5.jpg",
        ],
        description: "Story: Slay in style with this slim-fit polo shirt knitted with fine-quality cotton to keep you cool in hot summers.",
        category: "Men's Clothing",
        rating: 4.6,
        reviews: 147,
        stock: 45,
        sizes: ["S", "M", "L", "XL"],
        hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
      },
  { 
    id: 6, 
    name: "Men's Black Loose Fit Washed Jeans Non-Stretchable", 
    price: 269, 
    compare: 999, 
    discount: "-75% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/jeanloose-black-1-AI.png",
      "images/jeanloose-black-2.jpg",
      "images/jeanloose-black-3.jpg",
      "images/jeanloose-black-4_790fe9fa-5ed9-41a1-bcea-bcd21069401e.jpg",
      "images/jeanloose-black-5_70f3c0d3-fdfb-4d97-81a0-baacebdbbcd3.jpg",
      "images/jeanloose-black-6_55609c24-7c9b-4ef8-8b3a-65451f3a4b12.jpg"
    ],
    description: "These men's black loose baggy fit washed jeans are perfect for those who want to turn heads at every occasion. Whether you’re gearing up for a formal gathering or keeping it casual, these pants go effortlessly with both formal shirts and graphic tees.",
    category: "Men's Clothing",
    rating: 4.7,
    reviews: 119,
    stock: 20,
    sizes: ["28", "30", "32", "34","36"],
    hasTimer: true,           // ← Enable timer for this product
          // ← 30 minutes timer
  },
  {
    id: 7, 
    name: "Super Combed Cotton Rib Solid Boxer Brief with Ultrasoft and Durable Waistband - Black/Navy/Charcoal Melange (Pack of 3)", 
    price: 199, 
    compare: 549, 
    discount: "-65% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/8009_BNVCM_0305_S223_JKY_0.jpeg",
      "images/8009_BNVCM_0305_S223_JKY_1.jpeg",
      "images/8009_BNVCM_0305_S223_JKY_14.jpeg",
      "images/8009_BNVCM_0305_S223_JKY_7.jpeg",
    ],
    description: "Super Combed Cotton Ribbed Fabric ,Fabric Composition : CottonFront Open Fly Ultrasoft and Durable Concealed Waistband Engineered to Prevent Ride Up Label Free for All Day ComfortNet Quantity: 3 Piece",
    category: "Men's Clothing",
    rating: 4.7,
    reviews: 111,
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
            // ← 30 minutes timer
  },
    {
    id: 8, 
    name: "Super Combed Cotton Solid Brief with Ultrasoft Waistband - Black (Pack of 2)", 
    price: 129, 
    compare: 399, 
    discount: "-80% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/8037_BLACK_0205_S223_JKY_0.jpeg",
      "images/8037_BLACK_0205_S223_JKY_2.jpeg",
    ],
    description: "Super Combed Cotton Fabric Fabric Composition : Cotton Ultrasoft and Durable Waistband Label Free for All Day Comfort Net Quantity: 2 Piece",
    category: "Men's Clothing",
    rating: 4.7,
    reviews: 99,
    stock: 29,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
           // ← 30 minutes timer
  },
        {
    id: 9, 
    name: "Pack of 3 Super Combed Cotton Elastane Stretch Solid Trunk with Ultrasoft Waistband - Navy, Charcoal Melange & Black", 
    price: 199, 
    compare: 499, 
    discount: "-60% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/US21_BLACK-CHAML-NAVY_S123_0.jpeg",
      "images/US21_BLACK_0105_S123_JKY_1.jpeg",
      "images/US21_CHAML_0105_S123_JKY_6.jpeg",
      "images/US21_NAVY_0105_S123_JKY_6.jpeg",
    ],
    description: "Super Combed Cotton Elastane Stretch Fabric Fabric Composition : Cotton and Elastane Engineered to Prevent Ride-Up Ultrasoft and Durable Waistband Label Free for All Day Comfort Net Quantity: 3 Piece",
    category: "Men's Clothing",
    rating: 4.9,
    reviews: 140,
    stock: 21,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
        {
    id: 10, 
    name: "Super Combed Cotton Elastane Stretch Solid Trunk with Ultrasoft Waistband - Mid Night Navy & Monument (Pack of 2)", 
    price: 149, 
    compare: 399, 
    discount: "-65% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/NY16_MN-MT_0205_S125_JKY_0.jpeg",
      "images/NY16_MN-MT_0205_S125_JKY_1.jpeg",
      "images/NY16_MN-MT_0205_S125_JKY_2.jpeg",
      
    ],
    description: "Super Combed Cotton Elastane Stretch Fabric Fabric Composition : Cotton and Elastane Engineered to Prevent Ride Up Ultrasoft and Durable Waistband Label Free for All Day Comfort Net Quantity: 2 Piece",
    category: "Men's Clothing",
    rating: 4.6,
    reviews: 102,
    stock: 23,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
              {
    id: 11, 
    name: "Super Combed Cotton Rib Trunk with Ultrasoft Waistband - New Black", 
    price: 149, 
    compare: 299, 
    discount: "-50% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/UI22_BLACK_0105_S125_JKY_1_webp.jpeg",
      "images/UI22_BLACK_0105_S125_JKY_2_webp.jpeg",
      "images/UI22_BLACK_0105_S125_JKY_4_webp.jpeg",
       "images/UI22_BLACK_0105_S125_JKY_7_webp.jpeg",
      
    ],
    description: "100% Super Combed Cotton Rib Fabric Fabric Composition : Cotton Engineered to Prevent Ride Up Front Open Fly Ultrasoft and Durable Waistband Label Free for All Day Comfort",
    category: "Men's Clothing",
    rating: 4.9,
    reviews: 192,
    stock: 9,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
                {
    id: 12, 
    name: "Super Combed Cotton Elastane Stretch Printed Trunk with Ultrasoft Waistband - Black Empire Yell", 
    price: 99, 
    compare: 199, 
    discount: "-50% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/FP23_BEY02_0105_S225_JKY_1_webp.jpeg",
      "images/FP23_BEY02_0105_S225_JKY_2_webp.jpeg",
      "images/FP23_BEY02_0105_S225_JKY_7_webp.jpeg",
      
    ],
    description: "Super Combed Cotton Elastane Stretch Fabric Fabric Composition : Cotton and Elastane Engineered to Prevent Ride Up Ultrasoft and Durable Waistband All Over Print Design Label Free for All Day Comfort",
    category: "Men's Clothing",
    rating: 4.8,
    reviews: 150,
    stock: 7,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
                  {
    id: 13, 
    name: "Combo Pack of Mauve (pink tone) and Peach Shirt", 
    price: 399, 
    compare: 999, 
    discount: "-60% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/ChatGPT Image Feb 16, 2026, 12_20_36 AM.png",
      "images/1_25df21cd-9543-466c-9b86-f23c2ae0fea2.jpg",
      "images/1_c310fcbf-78c4-4518-bdae-646f908898e1.jpg",
      "images/4_fb649147-112b-4c0f-ba45-5db4c8f1d77c.jpg",
      "images/4_0df801db-9692-45a2-9602-e15c80b3428e.jpg",
      
    ],
    description: "Elevate your everyday style with this Creamy Peach and mauve pink Subtle Textured Shirts, featuring a delicate textured finish for a refined look. Soft and breathable, it ensures all-day comfort. Perfect for casual or smart-casual occasions 2 pack.",
    category: "Men's Clothing",
    rating: 4.7,
    reviews: 132,
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
           // ← 30 minutes timer
  },
     {
    id: 14, 
    name: "Baby Pink Solid Shirt ", 
    price: 249, 
    compare: 699, 
    discount: "-60% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/1_564875dd-4c51-40a2-88f9-3daf1fe753d9.jpg",
      "images/4_4f9fd9d2-9472-4992-9fee-01f1afb33df6.jpg",
      "images/8_88dae44c-ffd3-4e2f-ac78-1d826515fede.jpg",
      "images/5_e92e87ed-9d9b-4075-a1bd-d50cb5725d14.jpg",
      "images/6_696d1cbf-2fd6-4bf9-a6cf-b1a903f08dd4.jpg",
      
    ],
    description: "Add a touch of subtle elegance with this Baby Pink Solid Shirt, designed for a clean and polished look. Made from soft, breathable fabric, it offers comfort without compromising style. Ideal for both casual outings and semi-formal occasions.",
    category: "Men's Clothing",
    rating: 4.7,
    reviews: 125,
    stock: 3,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
            // ← 30 minutes timer
  },
     {
    id: 15, 
    name: "Cool Ash Grey Doublecloth Textured", 
    price: 199, 
    compare: 599, 
    discount: "-70% OFF", 
    icon: "fa-shoe-prints",
    images: [
      "images/1_4f832d6d-cfd5-4d67-aea7-9c7f288ba8f5.jpg",
      "images/2_0cecfb91-f2ba-47de-84c8-64d643370f41.jpg",
      "images/4_f5515bfe-b274-4cae-bfd7-48b5fa0419b6.jpg",
      "images/6_cff8052b-cf90-4cea-8cd1-51066ee9173b.jpg",
      
    ],
    description: "Add a touch of classic style with this Cool Ash Grey Doublecloth Textured Shirt. Crafted from breathable, soft fabric with a distinctive box checks weave pattern, it combines comfort and subtle texture for everyday wear. The cool ash grey shade offers a versatile, modern look that’s easy to style for work or casual outings.",
    category: "Men's Clothing",
    rating: 4.9,
    reviews: 115,
    stock: 2,
    sizes: ["S", "M", "L", "XL"],
    hasTimer: true,           // ← Enable timer for this product
             // ← 30 minutes timer
  },
];

// Customer testimonials
const testimonials = [
  { 
    name: "Priya Sharma, Mumbai", 
    text: "The dress quality is amazing! Fit perfectly and fabric is so soft. Fast delivery and great customer service." 
  },
  { 
    name: "Rahul Mehta, Pune", 
    text: "Bought jeans and t-shirts. Quality is premium and prices are very reasonable. Definitely my new go-to!" 
  },
  { 
    name: "Anjali Verma, Delhi", 
    text: "Love the collection! The hoodie I ordered is super comfortable and stylish." 
  },
  { 
    name: "Vikram Singh, Bangalore", 
    text: "Great quality shoes and clothing. Fast shipping and easy returns. Highly recommended!" 
  }
];