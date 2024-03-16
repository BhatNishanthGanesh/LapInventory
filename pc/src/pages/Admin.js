import React, { useEffect, useState } from "react";
import CustomNavbar from "../components/navbar";
import Footer from "../components/footer";

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8081/complaints/user");
        if (response.ok) {
          const data = await response.json();
          console.log("Received Data:", data);
          setComplaints(data);
        } else {
          setError("Failed to fetch complaints");
        }
      } catch (error) {
        setError(`Error fetching complaints: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Log the state after it has been updated
  useEffect(() => {
    console.log("State after update:", complaints);
  }, [complaints]);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Render error state
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <CustomNavbar />
      <div className="flex flex-col items-center justify-center dark:bg-dark min-h-screen p-8">
        <h1 className="text-3xl dark:text-white font-bold my-4">
          All Complaints
        </h1>
        <ul className="list-none p-0 flex flex-wrap justify-center">
          {complaints &&
            complaints.map((complaint) => (
              <li
                key={complaint.id}
                className="mb-8 border shadow-lg m-2 p-4 w-full sm:w-1/2 md:w-2/3 lg:w-2/3 xl:w-3/12 rounded-md transition-transform transform hover:scale-105"
              >
                {/* Display relevant information about each complaint */}
                <p className="text-gray-800 dark:text-white font-semibold mb-2 text-lg">
                  Complaint ID: {complaint.id}
                </p>
                <p className="text-gray-700 dark:text-white mb-2 text-sm">
                  Text: {complaint.complaintText}
                </p>
                <p className="text-gray-700 dark:text-white mb-2 text-sm">
                  Laptop Name: {complaint.laptopName}
                </p>
                {complaint.imagePath && (
                  <img
                  // src={`http://127.0.0.1:8081/${complaint.imagePath.replace(
                  //   /.*[\\\/]public[\\\/]/,
                  //   ""
                  // )}`}
                  src={`http://localhost:8081/images/${complaint.imagePath.replace(/\\/g, '/').split('/').pop()}`}
                    alt="Complaint"
                    className="w-full h-auto max-w-full object-cover mb-4 rounded-md mx-auto"
                  />
                )}
                <p className="text-gray-700 dark:text-white mb-2 text-sm">
                  Laptop Price: {complaint.laptopPrice}
                </p>
                <p className="text-gray-700 dark:text-white text-sm">
                  Laptop Brand: {complaint.laptopBrand}
                </p>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
