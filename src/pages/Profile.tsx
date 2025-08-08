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
    <div>
      <Navbar userName={user.name} userEmail={user.email} />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold mb-4">Welcome, {user.name}</h1>
        <div className="bg-white shadow rounded-lg p-6 flex gap-6 items-center">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          {/* Details */}
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">User ID</p>
                <p className="font-medium">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email ID</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {user.address.street}, {user.address.city}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
