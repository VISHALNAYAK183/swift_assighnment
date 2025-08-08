import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => setUser(data[0]));
  }, []);

  if (!user) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <Navbar userName={user.name} userEmail={user.email} />

      {/* Page Content - now truly full width */}
      <div className="flex-1 w-screen px-0">
        {/* Back Button - adjusted positioning */}
        <div className="w-full max-w-[calc(100vw-2rem)] mx-auto pt-4 pl-4 sm:pl-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Welcome, {user.name}
          </button>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-[calc(100vw-2rem)] mx-auto px-4 sm:px-6">
          {/* <h1 className="text-lg sm:text-xl font-semibold mb-4">
            Welcome, {user.name}
          </h1> */}
{/* Profile Card - narrower & taller */}
<div className="bg-white shadow rounded-lg p-10 w-full max-w-7xl mx-auto">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
    <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-3xl font-bold text-gray-700">
      {user.name.charAt(0)}
    </div>
    <div>
      <p className="text-xl font-semibold">{user.name}</p>
      <p className="text-sm text-gray-500">{user.email}</p>
    </div>
  </div>

  {/* Grid Layout */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
    <div className="min-w-0">
      <p className="text-sm text-gray-500">User ID</p>
      <div className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
        {user.id}
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-500">Name</p>
      <div className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
        {user.name}
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-500">Email ID</p>
      <div className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
        {user.email}
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-500">Address</p>
      <div className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
        {user.address.street}, {user.address.city}
      </div>
    </div>
    <div className="min-w-0">
      <p className="text-sm text-gray-500">Phone</p>
      <div className="bg-gray-100 border border-gray-200 rounded px-4 py-3">
        {user.phone}
      </div>
    </div>
  </div>
</div>



        </div>
      </div>
    </div>
  );
}