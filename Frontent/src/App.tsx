import React, { EventHandler, useState } from 'react';
import { useQuery, gql, useMutation } from "@apollo/client";
import { GetUsers } from './GraphQl/query/getUsers';
import { CREATE_USER } from './GraphQl/mutation/createUser';
import { User } from './Types/userTypes';






const App = () => {
  const { loading, error, data, refetch } = useQuery(GetUsers);
  const [createUser, { loading: createUserLoading, error: createUserError }] = useMutation(CREATE_USER);

  const [formData, setFormData] = useState({ name: '', age: '', email: '', isActive: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({
        variables: {
          name: formData.name,
          age: parseInt(formData.age),
          email: formData.email,
          isActive: formData.isActive
        }
      });
      setFormData({ name: '', age: '', email: '', isActive: false });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h3 className="text-center text-lg">Loading...</h3>;
  if (error) return <h3 className="text-center text-lg text-red-500">Error: {error?.message}</h3>;

  if (createUserLoading) return <h3 className="text-center text-lg">Loading...</h3>;
  if (createUserError) return <h3 className="text-center text-lg text-red-500">Error: {error?.message}</h3>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-center text-2xl font-semibold mb-4">Available Users</h3>

      {/* User Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-md bg-gray-50">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Active</label>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.getUsers.map((user:User) => (
          <div key={user.id} className="p-4 shadow-md rounded-lg border border-gray-200 bg-white">
            <h4 className="text-xl font-medium text-gray-800">{user.name}</h4>
            <p className="text-gray-600">Email: {user.email}</p>
            <p className="text-gray-600">Age: {user.age}</p>
            <p className={`mt-2 font-semibold ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>
              {user.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
