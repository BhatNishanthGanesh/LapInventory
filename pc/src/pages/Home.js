import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {
  // Placeholder data for laptops
  const initialLaptops = [
    {
      id: 1,
      name: "Dell XPS 13",
      brand: "Dell",
      price: "$1,499",
      rating: 3,
      image:
        "https://rukminim2.flixcart.com/image/850/1000/xif0q/computer/q/i/w/xps-13-thin-and-light-laptop-dell-original-imagpm3cqsu7k7ca.jpeg?q=90&crop=false",
    },
    {
      id: 2,
      name: "MacBook Air (M2, 2022)",
      brand: "Apple",
      price: "$999",
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFTgLX5GU1h-j506THK49-uG1RSHDoo1CwnA&usqp=CAU",
    },
    {
      id: 3,
      name: "HP Spectre x360",
      brand: "HP",
      price: "$1,299",
      rating: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScITkA6A_fXZG1W34251lorSIUIVt979609Q&usqp=CAU",
    },
    {
      id: 4,
      name: "Lenovo ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: "$1,248",
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7yZWMyeN77Gi4t6ZlTIG5onf6ZTA2D0RyKQ&usqp=CAU",
    },
    {
      id: 5,
      name: "Asus ROG Zephyrus G14",
      brand: "Asus",
      price: "$999",
      rating: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCH-027RJmKYCmpjeduaK96GtyYVR-1m277g&usqp=CAU",
    },
    {
      id: 6,
      name: "Microsoft Surface Laptop 4",
      brand: "Microsoft",
      price: "$1,299",
      rating: 4,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxJA5FMDragtG6lbOtt23N2-aWZQ682yHSjQ&usqp=CAU",
    },
    {
      id: 7,
      name: "Acer Swift 3",
      brand: "Acer",
      price: "$549",
      rating: 4,
      image: "https://m.media-amazon.com/images/I/81nN5u1MEuL._SL1500_.jpg",
    },
    {
      id: 8,
      name: "Samsung Galaxy Book Flex 2",
      brand: "Samsung",
      price: "$1,349",
      rating: 5,
      image: "https://m.media-amazon.com/images/I/71zEewEsx6L._SL1500_.jpg",
    },
    {
      id: 9,
      name: "LG Gram 17",
      brand: "LG",
      price: "$1,499",
      rating: 4,
      image: "https://m.media-amazon.com/images/I/51r17oSYqZL._SL1500_.jpg",
    },
    {
      id: 10,
      name: "Razer Blade 15",
      brand: "Razer",
      price: "$1,799",
      rating: 3,
      image:
        "https://m.media-amazon.com/images/I/71kcJxMggRL._AC_UF1000,1000_QL80_.jpg",
    },
  ];
  const [laptops, setLaptops] = useState(initialLaptops);
  const [searchTerm, setSearchTerm] = useState("");
  // const [userName, setUserName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPhone, setUserPhone] = useState("");
  // const [selectedLaptop, setSelectedLaptop] = useState(null);
  const [complaintText, setComplaintText] = useState("");
  const [laptopName, setLaptopName] = useState("");
  const [laptopBrand, setLaptopBrand] = useState("");
  const [laptopPrice, setLaptopPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // const handleSelectLaptop = (laptop) => {
  //   setSelectedLaptop(laptop);
  // };

  // const handleBuyLaptop = () => {
  //   if (selectedLaptop) {
  //     console.log("User Name:", userName);
  //     console.log("User Email:", userEmail);
  //     console.log("User Phone:", userPhone);
  //     console.log("Selected Laptop:", selectedLaptop);

  //     // Reset form fields after submission
  //     setUserName("");
  //     setUserEmail("");
  //     setUserPhone("");
  //     setSelectedLaptop(null);
  //   }
  // };
  // const handleSelectLaptop = (laptop) => {
  //   setSelectedLaptop(laptop);

  //   // Redirect to Google's laptop section (replace the URL with the desired one)
  //   window.location.href = "https://www.google.com/search?q=" + laptop.name + " laptop";
  // };

  // const handleComplaint = () => {
  //   console.log("User Name:", userName);
  //   console.log("User Email:", userEmail);
  //   console.log("User Phone:", userPhone);
  //   console.log("Complaint Text:", complaintText);
  //   console.log("Laptop Name:", laptopName);
  //   console.log("Laptop Brand:", laptopBrand);
  //   console.log("Laptop Price:", laptopPrice);
  //   console.log("Image File:", imageFile);

  //   // Reset form fields after submission
  //   setComplaintText("");
  //   setUserName("");
  //   setUserEmail("");
  //   setUserPhone("");
  //   setLaptopName("");
  //   setLaptopBrand("");
  //   setLaptopPrice("");
  //   setImageFile(null);
  // };
  const handleComplaint = async () => {
    try {
      const formData = new FormData();
      formData.append("complaintText", complaintText);
      formData.append("laptopName", laptopName);
      formData.append("laptopBrand", laptopBrand);
      formData.append("laptopPrice", laptopPrice);
      formData.append("image", imageFile);

      console.log(formData);

      const response = await fetch("http://127.0.0.1:8081/complaints/submit", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

      console.log(
        "Complaint submitted successfully. Complaint ID:",
        responseData.complaintId
      );

      // Reset form fields after successful submission
      setComplaintText("");
      setLaptopName("");
      setLaptopBrand("");
      setLaptopPrice("");
      setImageFile(null);
    } catch (error) {
      console.error("Error submitting complaint:", error);
      // Handle error state or display a user-friendly error message
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="text-3xl text-center font-bold mb-8 dark:text-white">
          Welcome to Laptop Assistance
        </div>

        {/* Search Bar Section */}
        <div className="mb-4 flex items-center justify-center">
          <div className="relative w-56">
            <label htmlFor="search" className="sr-only">
              Search Laptops
            </label>
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                id="search"
                name="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Search for laptops"
              />
              <div className="px-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 21l-6-6"></path>
                  <circle cx="10" cy="10" r="7"></circle>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* List of Laptops */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {laptops
              .filter((laptop) =>
                laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((laptop) => (
                <div
                  key={laptop.id}
                  className="bg-white p-4 rounded-md shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={() =>
                    window.open(
                      `https://www.amazon.com/s?k=${laptop.name} laptop`,
                      "_blank"
                    )
                  }
                >
                  {/* Display the laptop image */}
                  <img
                    src={laptop.image}
                    alt={`${laptop.brand} ${laptop.name}`}
                    className="w-full h-40 object-cover mb-2 rounded-md"
                  />

                  <div className="text-lg font-semibold">{laptop.name}</div>
                  <div className="text-gray-600">{laptop.brand}</div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar
                        key={index}
                        color={index < laptop.rating ? "#FFD700" : "#C4C4C4"}
                        className="mr-1"
                      />
                    ))}
                    {/* <span className="text-blue-500 font-bold ml-1">
                      {laptop.rating}
                    </span> */}
                  </div>
                  <div className="text-blue-500 font-bold">{laptop.price}</div>
                  <div className="text-sm text-blue-500 mt-2">
                    Buy Now on Amazon
                  </div>
                </div>
              ))}
          </div>
        </div>
        {laptops.filter((laptop) =>
          laptop.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <div className="text-center  dark:text-white fw-bold text-3xl mt-8 mb-8">
            No laptops available with the specified name.
          </div>
        )}

        {/* Complaint Section */}
        <div className="text-4xl text-center font-bold dark:text-white mt-20 ">
          Facing issues in laptop?
        </div>
        <div className="flex items-center justify-center mt-10">
          <div className=" bg-gray-100  max-w-prose p-6 rounded-md shadow-md">
            <div className="text-2xl font-bold mb-4 text-gray-800">
              Submit a Complaint
            </div>
            <div className="mb-3">
              <label
                htmlFor="complaint"
                className="block text-sm font-medium text-gray-600"
              >
                Describe your complaint
              </label>
              <textarea
                id="complaint"
                name="complaint"
                rows="4"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Describe your complaint..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="laptopName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Laptop Name
                </label>
                <input
                  type="text"
                  id="laptopName"
                  name="laptopName"
                  value={laptopName}
                  onChange={(e) => setLaptopName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter laptop name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="laptopBrand"
                  className="block text-sm font-medium text-gray-600"
                >
                  Laptop Brand
                </label>
                <input
                  type="text"
                  id="laptopBrand"
                  name="laptopBrand"
                  value={laptopBrand}
                  onChange={(e) => setLaptopBrand(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter laptop brand"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  htmlFor="laptopPrice"
                  className="block text-sm font-medium text-gray-600"
                >
                  Laptop Price
                </label>
                <input
                  type="text"
                  id="laptopPrice"
                  name="laptopPrice"
                  value={laptopPrice}
                  onChange={(e) => setLaptopPrice(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  placeholder="Enter laptop price"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-600"
                >
                  Upload Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
            <button
              onClick={handleComplaint}
              className="mt-4 p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 focus:outline-none focus:ring focus:border-blue-300"
            >
              Submit Complaint
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
