"use client"; // Client-side rendering for products

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

// Define product categories and mock data
const categories = [
  "All Products",
  "Furniture",
  "Utensils",
  "Electronics",
  "Home & Entertainment",
  "Clothing",
  "Toys",
  "Sports",
  "Beauty & Health",
];

const allProducts = [
  {
    id: 61,
    name: "Dining Table",
    category: "Furniture",
    price: 15000,
    image: "/images/Dining Table.jpg",
    description:
      "Material: Wood. Dimensions: 150 x 80 x 75 cm. A stylish dining table for your home.",
  },
  { id: 1, name: "Sofa", category: "Furniture", price: 20000, image: "/images/sofa.jpg", description: "Material: Fabric, Wood. Dimensions: 200 x 90 x 85 cm. Comfortable and stylish sofa for your living room." },
  { id: 2, name: "Dining Table", category: "Furniture", price: 15000, image: "/images/Dining Table.jpg", description: "Material: Wood. Dimensions: 150 x 80 x 75 cm. A stylish dining table for your home." },
  { id: 3, name: "Coffee Table", category: "Furniture", price: 8000, image: "/images/Coffe Table.jpg", description: "Material: Wood, Glass. Dimensions: 120 x 60 x 45 cm. A sleek coffee table perfect for any space." },
  { id: 4, name: "Bookshelf", category: "Furniture", price: 6000, image: "/images/Bookshelf.jpg", description: "Material: Wood. Dimensions: 90 x 30 x 180 cm. A modern bookshelf to organize your books." },
  { id: 5, name: "Armchair", category: "Furniture", price: 7000, image: "/images/Armchair.jpg", description: "Material: Fabric, Wood. Dimensions: 80 x 75 x 90 cm. A cozy armchair for your reading nook." },
  { id: 6, name: "Cabinet", category: "Furniture", price: 12000, image: "/images/Cabinet.jpg", description: "Material: Wood. Dimensions: 100 x 40 x 180 cm. A storage cabinet for your home." },
  { id: 7, name: "Recliner Chair", category: "Furniture", price: 15000, image: "/images/Recliner Chair.jpg", description: "Material: Leather, Metal. Dimensions: 90 x 85 x 110 cm. A reclining chair for ultimate comfort." },
  { id: 8, name: "TV Stand", category: "Furniture", price: 10000, image: "/images/TV Stand.jpg", description: "Material: Wood, Glass. Dimensions: 150 x 45 x 55 cm. A TV stand with ample storage space." },
  { id: 9, name: "Bar Stool", category: "Furniture", price: 4000, image: "/images/Bar Stool.jpg", description: "Material: Wood, Metal. Dimensions: 40 x 40 x 75 cm. A stylish bar stool for your kitchen." },
  { id: 10, name: "Dining Chairs", category: "Furniture", price: 8000, image: "/images/Dining Chairs.jpg", description: "Material: Wood, Fabric. Dimensions: 45 x 45 x 90 cm. Comfortable dining chairs for your home." },

  // Additional products for other categories
  { id: 11, name: "Blender", category: "Utensils", price: 5000, image: "/images/blender.jpg", description: "Power: 500W. Capacity: 1.5L. A powerful blender for your kitchen." },
  { id: 12, name: "Kettle", category: "Utensils", price: 2500, image: "/images/kettle.jpg", description: "Power: 1500W. Capacity: 1.7L. An electric kettle for boiling water quickly." },
  { id: 13, name: "Microwave", category: "Electronics", price: 10000, image: "/images/microwave.jpg", description: "Power: 800W. Capacity: 20L. A microwave for easy cooking." },
  { id: 14, name: "Headphones", category: "Electronics", price: 7000, image: "/images/headphones.jpg", description: "Type: Over-Ear. Connectivity: Wireless. Noise-canceling headphones for an immersive experience." },
  { id: 15, name: "IPHONE 16 PRO MAx", category: "Electronics", price: 30000, image: "/images/smartphone.jpg", description: "RAM: 8GB. ROM: 128GB. Processor:  A18 Bionic chip. CAMERA: 48 MP FRONT CAMERA, 60 MP BACK CAMERA With night view." },
  { id: 16, name: "LENOVO THINKPAD", category: "Electronics", price: 50000, image: "/images/laptop.jpg", description: "RAM: 16GB. ROM: 512GB SSD. Processor: Intel core i7. A powerful laptop for work and play." },
  { id: 17, name: "Nylon T-shirt", category: "Clothing", price: 1500, image: "/images/T-shirt.jpg", description: "Material: Cotton, Nylon. Size: M, L, XL. A comfortable cotton T-shirt." },
  { id: 18, name: "Jacket", category: "Clothing", price: 3000, image: "/images/Jacket.jpg", description: "Material: Wool. Size: M, L, XL. A warm jacket for the cold weather." },
  { id: 19, name: "Toy Car", category: "Toys", price: 1500, image: "/images/Toy Car1.jpg", description: "Material: Plastic. Dimensions: 15 x 7 x 5 cm. A fun toy car for kids to play with." },
  { id: 20, name: "Basketball", category: "Sports", price: 2000, image: "/images/basketball.jpg", description: "Material: Rubber. Size: 7. A durable basketball for outdoor play." },
  { id: 31, name: "Cotton T-shirt", category: "Clothing", price: 1500, image: "/images/cotton.jpg", description: "Material: Cotton. Size: M, L, XL. A comfortable cotton T-shirt." },
  { id: 32, name: "Leather Jacket", category: "Clothing", price: 3000, image: "/images/leather.jpg", description: "Material: Wool. Size: M, L, XL. A warm jacket for the cold weather." },
  { id: 33, name: "Jeans", category: "Clothing", price: 2500, image: "/images/Jeans.jpg", description: "Material: Denim. Size: 30, 32, 34. A pair of stylish jeans for everyday wear." },
  { id: 34, name: "Dress", category: "Clothing", price: 3500, image: "/images/Dress.jpg", description: "Material: Polyester. Size: S, M, L. A chic dress for special occasions." },
  { id: 35, name: "Skirt", category: "Clothing", price: 2800, image: "/images/Skirt.jpg", description: "Material: Cotton. Size: S, M, L. A fashionable skirt for everyday wear." },
  { id: 36, name: "Sweatshirt", category: "Clothing", price: 2500, image: "/images/sweat-shirt.jpg", description: "Material: Cotton, Polyester. Size: M, L, XL. A comfortable sweatshirt for casual wear." },
  { id: 37, name: "Blazer", category: "Clothing", price: 5000, image: "/images/blazer.jpg", description: "Material: Wool. Size: M, L, XL. A formal blazer for professional attire." },
  { id: 38, name: "Shoes", category: "Clothing", price: 4500, image: "/images/shoes.jpg", description: "Material: Leather, Rubber. Size: 39, 40, 41. A pair of comfortable shoes for all-day wear." },
  { id: 39, name: "Hat", category: "Clothing", price: 1200, image: "/images/Hat.jpg", description: "Material: Cotton. Size: One Size. A stylish hat for sun protection." },
  { id: 40, name: "Scarf", category: "Clothing", price: 800, image: "/images/Scarf.jpg", description: "Material: Wool. Size: One Size. A cozy scarf for the cold season." },

  // Additional Toys Products
  { id: 41, name: "Toy Car", category: "Toys", price: 1500, image: "/images/Toy Car.jpg", description: "Material: Plastic. Dimensions: 15 x 7 x 5 cm. A fun toy car for kids to play with." },
  { id: 42, name: "Toy Train", category: "Toys", price: 2000, image: "/images/train.jpg", description: "Material: Wood, Plastic. Dimensions: 30 x 10 x 10 cm. A classic toy train set." },
  { id: 43, name: "Doll", category: "Toys", price: 1200, image: "/images/Doll.jpg", description: "Material: Fabric, Plastic. Dimensions: 30 cm. A soft and cute doll for kids." },
  { id: 44, name: "Action Figure", category: "Toys", price: 1800, image: "/images/Action-figure.jpg", description: "Material: Plastic. Dimensions: 25 cm. A collectible action figure for kids." },
  { id: 45, name: "Building Blocks", category: "Toys", price: 2500, image: "/images/building-blocks.jpg", description: "Material: Plastic. Set of 150 pieces. A set of colorful building blocks for children." },
  { id: 46, name: "Puzzles", category: "Toys", price: 1200, image: "/images/puzzles.jpg", description: "Material: Cardboard. Pieces: 500. Engaging puzzles for kids to solve." },
  { id: 47, name: "Toy Robot", category: "Toys", price: 2200, image: "/images/toy-robot.jpg", description: "Material: Plastic, Metal. Dimensions: 30 x 15 x 10 cm. A remote-controlled toy robot." },
  { id: 48, name: "Toy Dinosaur", category: "Toys", price: 3000, image: "/images/toy-dinosaur.jpg", description: "Material: Plastic. Dimensions: 35 x 20 x 15 cm. A dinosaur figurine for imaginative play." },
  { id: 49, name: "Educational Toy", category: "Toys", price: 3500, image: "/images/educational-toy.jpg", description: "Material: Wood, Plastic. Dimensions: 25 x 25 x 10 cm. A fun and educational toy for young kids." },
  { id: 50, name: "Stuffed Animal", category: "Toys", price: 1500, image: "/images/Animal.jpg", description: "Material: Fabric. Dimensions: 30 x 20 cm. A soft stuffed animal for comfort." },

  // Additional Sports Products
  { id: 51, name: "VolleyBall", category: "Sports", price: 2000, image: "/images/volleyball.jpg", description: "Material: Rubber. Size: 5. A durable volleyball ball for outdoor play." },
  { id: 52, name: "Football", category: "Sports", price: 2200, image: "/images/football.jpg", description: "Material: Rubber. Size: 5. A high-quality football for the game." },
  { id: 53, name: "Baseball Bat", category: "Sports", price: 3000, image: "/images/baseball-bat.jpg", description: "Material: Wood. Length: 32 inches. A strong baseball bat for practice." },
  { id: 54, name: "Tennis Racket", category: "Sports", price: 5000, image: "/images/tennis-racket.jpg", description: "Material: Graphite. String Tension: 50 lbs. A professional tennis racket." },
  { id: 55, name: "Badminton Set", category: "Sports", price: 3500, image: "/images/badminton-set.jpg", description: "Material: Steel, Nylon. Set includes rackets and shuttlecocks." },
  { id: 56, name: "Yoga Mat", category: "Sports", price: 2000, image: "/images/yoga-mat.jpg", description: "Material: PVC. Dimensions: 180 x 60 cm. A comfortable yoga mat for your practice." },
  { id: 57, name: "Swimming Goggles", category: "Sports", price: 1000, image: "/images/swimming-goggles.jpg", description: "Material: Silicone, Plastic. Adjustable Strap. A pair of swimming goggles for clear vision." },
  { id: 58, name: "Jump Rope", category: "Sports", price: 800, image: "/images/jump-rope.jpg", description: "Material: Plastic, Rubber. Length: 3m. A jump rope for cardio exercise." },
  { id: 59, name: "Soccer Ball", category: "Sports", price: 2200, image: "/images/soccer-ball.jpg", description: "Material: Rubber. Size: 5. A professional soccer ball for the game." },
  { id: 60, name: "Dumbbells", category: "Sports", price: 3000, image: "/images/dumbbells.jpg", description: "Material: Iron, Rubber. Weight: 5kg each. A set of dumbbells for weight training." },
  { id: 62, name: "SAYONA SOUNDBAR", category: "Home & Entertainment", price: 13000, image: "/images/sayona.jpg", description: "INPUTS: AUX, USB, BLUETOOTH, SD CARD. Weight: 5kg each." },
  { id: 63, name: "NOBEL NB856", category: "Home & Entertainment", price: 17000, image: "/images/nobel.jpg", description: "INPUTS: AUX, USB, BLUETOOTH, SD CARD: Weight: 6kg." },
  { id: 64, name: "SONY SOUNDBAR", category: "Home & Entertainment", price: 13000, image: "/images/sony.jpg", description: "INPUTS: AUX, USB, BLUETOOTH, SD CARD. Material: Iron, Rubber." },
  { id: 65, name: "STAR X", category: "Home & Entertainment", price: 13000, image: "/images/star.jpg", description: "INPUT: AUX,USB Weight: 4kg .Affordable home entertainment system" },
  { id: 66, name: "ROYAL SOUND SUBWOOFER", category: "Home & Entertainment", price: 13000, image: "/images/royal.jpg", description: "INPUTS: AUX, USB, HDMI. BLUETOOTH. Weight: 5kg" },
  { id: 67, name: "LG HOME STEREO", category: "Home & Entertainment", price: 13000, image: "/images/lg.jpg", description: "INPUTS: AUX, HDMI ARC, OPTICAL CABLE, USB, BLUETHOOTH. OUTPUT: FIVE MID RANGE SPEAKERS AND ONE BASS SPEAKER. WEIGHT: 10KGS" },
  { id: 68, name: "vaseline men", category: "Beauty & Health", price: 400, image: "/images/vaseline.jpg", description: "Moisturizing skin care petroleum jelly" },
  { id: 69, name: "Nivea intensive care", category: "Beauty & Health", price: 12000, image: "/images/nivea.jpg", description: "Healthy glowing skin" },
  { id: 70, name: "Ganier", category: "Beauty & Health", price: 700, image: "/images/ganier.jpg", description: "Gets rid of dark skin and Masks" },
  { id: 71, name: "Nice & Lovely", category: "Beauty & Health", price: 800, image: "/images/nc.jpg", description: "Moisturizing skin care petroleum jelly" },

];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [products, setProducts] = useState(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const { addToCart } = useCart();

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = allProducts;
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    
    <div style={productsPageStyle}>
      {/* Navbar */}
      <div style={navbarStyle}>
        <h1>Products</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />

        {/* Category Navigation */}
        <div style={categoryNavStyle}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={categoryButtonStyle}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products List */}
      <div style={productsListStyle}>
        {currentProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          currentProducts.map((product) => (
            <div key={product.id} style={productCardStyle}>
              <img
                src={product.image}
                alt={product.name}
                style={productImageStyle}
              />
              <div style={productDetailsStyle}>
                <h3>{product.name}</h3>
                <p>KSh {product.price.toLocaleString()}</p>
                <p style={productDescriptionStyle}>{product.description}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={addToCartButtonStyle}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div style={paginationStyle}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          &lt;&lt; Prev
        </button>
        {[...Array(Math.ceil(filteredProducts.length / productsPerPage))].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            style={paginationButtonStyle}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          style={paginationButtonStyle}
        >
          Next &gt;&gt;
        </button>
      </div>
    </div>
  );
}

// Styles
const productsPageStyle = {
  textAlign: "center",
  padding: "10px",
  boxSizing: "border-box",
};

const navbarStyle = {
  marginBottom: "20px",
};

const searchInputStyle = {
  padding: "10px",
  marginTop: "10px",
  marginBottom: "20px",
  width: "300px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const categoryNavStyle = {
  marginBottom: "20px",
};

const categoryButtonStyle = {
  margin: "5px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  cursor: "pointer",
  backgroundColor: "purple",
};

const productsListStyle = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const productCardStyle = {
  width: "200px",
  margin: "15px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  textAlign: "center",
};

const productImageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "5px",
};

const productDetailsStyle = {
  marginTop: "10px",
};

const productDescriptionStyle = {
  fontSize: "12px",
  color: "red",
};

const addToCartButtonStyle = {
  backgroundColor: "#f79c42",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "5px",
  cursor: "pointer",
  border: "none",
  color: "white",
};

const paginationStyle = {
  marginTop: "20px",
  textAlign: "center",
};

const paginationButtonStyle = {
  padding: "10px",
  margin: "0 5px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "pointer",
};