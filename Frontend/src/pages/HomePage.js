// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>

import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import axios from "axios";
import useWishlist from "./useWishlist";
import "../css/HomePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const { addToWishlist, wishlistLoading } = useWishlist();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(10000);

  // const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [conditionFilter, setConditionFilter] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("");

  const [cityFilter, setCityFilter] = useState("");

  const resetFilters = () => {
    setMinPriceFilter(0);
    setMaxPriceFilter(10000);
    setCategoryFilter("");
    setSubCategoryFilter("");
    setConditionFilter("");
    setProvinceFilter("");
    setCityFilter("");
    setSearch("");
    fetchData();
  };
  // Constants for the filter data
  const provinces = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Quebec",
    "Saskatchewan",
  ];

  const cities = {
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"],
    "British Columbia": ["Vancouver", "Victoria", "Kelowna"],
    Manitoba: ["Winnipeg", "Brandon", "Steinbach"],
    "New Brunswick": ["Bathurst", "Caraquet", "Dalhousie", "Fredericton"],
    "Newfoundland and Labrador": [
      "Labrador City",
      "Placentia",
      "Saint Anthony",
      "St. John's",
      "Wabana",
    ],
    "Nova Scotia": ["Halifax", "Liverpool", "Springhill", "Sydney", "Yarmouth"],
    Ontario: [
      "Guelph",
      "Kitchener",
      "Mississauga",
      "Oshawa",
      "Ottawa",
      "Toronto",
    ],
    Quebec: ["Montreal", "Sainte-Anne-de-Beaupré", "Sept-Îles"],
    Saskatchewan: ["Prince Albert", "Regina", "Saskatoon"],
  };

  const categories = {
    "home-appliance": "Home Appliance",
    electronics: "Electronics",
    vehicle: "Vehicle",
    furniture: "Furniture",
    instruments: "Instruments",
    tools: "Tools",
  };

  const subcategories = {
    "home-appliance": ["Kitchen", "Living Room", "Bedroom", "Bathroom"],
    electronics: [
      "Laptop",
      "Phones",
      "Computer Accessories",
      "Video Games & Consoles",
      "Smart Watch",
    ],
    vehicle: ["Car", "Motorcycle", "Bicycle", "Truck"],
    furniture: ["Table", "Chair", "Cabinet", "Bed"],
    instruments: ["Guitar", "Piano", "Violin", "Drums"],
    tools: ["Hand Tools", "Power Tools", "Gardening Tools", "Automotive Tools"],
  };
  useEffect(() => {
    // Run the token verification logic when the component is loaded
    if (
      localStorage.getItem("authToken") === "" ||
      localStorage.getItem("role") !== "user"
    ) {
      navigate("/user/login");
    }
    const authTokenData = {
      token: localStorage.getItem("authToken"),
    };
    axios
      .post("http://localhost:8080/user/checkTokens", authTokenData)
      .then((response) => {
        const tokenstatus = response.data.status;
        console.log(tokenstatus);
        if (tokenstatus != "true") {
          navigate("/user/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    fetchData();

  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/product/product/getAll")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        console.log("response", response);
        console.log("response data", response.data);
        console.log("response prods", response.data.products);
        console.log("data is ");
        console.log(products);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleProvinceChange = (e) => {
    setProvinceFilter(e.target.value);
    setCityFilter('');
  }


  const applyAllFilter = () => {
    const results = products.filter((product) => {
      return (
        (product.price >= minPriceFilter || !minPriceFilter) &&
        (product.price <= maxPriceFilter || !maxPriceFilter) &&
        (product.category === categoryFilter || !categoryFilter) &&
        (product.subcategory === subCategoryFilter || !subCategoryFilter) &&
        (product.condition === conditionFilter || !conditionFilter) &&
        (product.province === provinceFilter || !provinceFilter) &&
        (product.city === cityFilter || !cityFilter) &&
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredProducts(results);
  };

  useEffect(() => {
    applyAllFilter();
  }, [search]);

  return (
    <div>
      <Navbar />
      <div className="flex sm:py-12">
        {/* Filter Sidebar */}
        <aside className="w-1/4 p-4 border-r-2">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>{" "}
          {/* Added title */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Price</h3>
            <div className="mt-2 mb-4">
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium mb-2"
              >
                From:
              </label>
              <input
                type="number"
                id="minPrice"
                value={minPriceFilter}
                onChange={(e) => setMinPriceFilter(Number(e.target.value))}
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="mt-2 mb-4">
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium mb-2"
              >
                To:
              </label>
              <input
                type="number"
                id="maxPrice"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          {/* Category filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Category</h3>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Categories</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {/* Sub-Category filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Sub-Category</h3>
            <select
              value={subCategoryFilter}
              onChange={(e) => setSubCategoryFilter(e.target.value)}
              className="p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Sub-Categories</option>
              {subcategories[categoryFilter]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Condition</h3>
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Conditions</option>
              <option value="mint">Mint</option>
              <option value="used">Used</option>
              <option value="aged">Aged</option>
            </select>
          </div>
          {/* Province filter */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Province</h3>
            <select
              value={provinceFilter}
              onChange={handleProvinceChange}
              className="p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Provinces</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          {/* City filter based on selected province */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">City</h3>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-200"
            >
              <option value="">All Cities</option>
              {cities[provinceFilter]?.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <button
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 w-full transition duration-200 transform hover:scale-105"
            onClick={applyAllFilter}
          >
            Apply
          </button>
          <button
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 w-full transition duration-200 transform hover:scale-105"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </aside>

        {/* Main All Products Section */}
        <main className="w-3/4 px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              {search ? `Search results for "${search}"` : "All Products"}
            </h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="p-2 border rounded-md"
              style={{ width: "250px" }} // Adjust width based on your preference
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              // ... (rest of the code remains unchanged)
              <div key={product.id}>
                <Card product={product} />
                <Button
                  onClick={() => addToWishlist(product)}
                  variant="contained"
                  startIcon={<AddShoppingCart />}
                  color="primary"
                ></Button>
              </div>
            ))}
          </div>
          <ToastContainer position="bottom-right" />
        </main>
      </div>
      <Footer />
    </div>
  );
}
