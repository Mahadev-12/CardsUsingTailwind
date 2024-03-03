
"use client"
import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiGlobe, FiUserPlus, FiTrash2 } from 'react-icons/fi';

const Card = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();

        const transformedData = data.map(user => ({
          initials: user.name.split(" ").map(n => n[0]).join(""),
          name: user.name,
          email: user.email,
          phone: user.phone,
          website : user.website,
          bgColor: 'bg-purple-500'
        }));

        setUsers(transformedData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg mx-2 my-10 shadow-lg bg-white transition duration-300 ease-in-out transform hover:scale-110">
            <div className={`flex justify-center items-center h-20 w-20 rounded-full ${user.bgColor} mx-auto mt-1 text-xl font-semibold text-white transition duration-300 ease-in-out transform hover:scale-110`}>
              {user.initials}
            </div>
            <div className="text-center px-6 py-4">
              <div className="font-bold mb-2">{user.name}</div>
              <div className="flex flex-wrap items-center justify-start space-x-2">
                <FiMail className="text-lg" />
                <a href={`mailto:${user.email}`} className="text-gray-700 hover:text-blue-500">
                  {user.email}
                </a>
              </div>
              <div className="flex">
                <FiPhone className="mr-2" />
                <a href={`tel:${user.phone}`} className="text-gray-600 text-sm hover:text-blue-500">
                  {user.phone}
                </a>
              </div>
              <div className="flex">
                <FiGlobe className="mr-2" />
                <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-blue-500">
                  {user.website}
                </a>
              </div>
            </div>
            <div className="pt-4 pb-2 flex justify-center">
              <span className="inline-block bg-blue-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer hover:bg-blue-700 flex items-center">
                <FiUserPlus className="mr-1"/> Follow
              </span>
              <span className="inline-block bg-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2 cursor-pointer hover:bg-red-700 flex items-center">
                <FiTrash2 className="mr-1"/> Delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;