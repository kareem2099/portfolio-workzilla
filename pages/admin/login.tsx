import { useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic authentication logic (replace with your actual authentication)
    if (email === "admin" && password === "password") {
      // Set a cookie to indicate that the user is logged in
      setCookie('loggedIn', 'true');
      router.push('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-200 to-blue-100 dark:bg-gradient-to-br dark:from-gray-700 dark:to-gray-800 transition-colors duration-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 transition-colors duration-500 w-96"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 transition-colors duration-500 text-center">
          Admin Login
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500"
            htmlFor="email"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            id="email"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2 transition-colors duration-500"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 mb-3 leading-tight focus:outline-none focus:shadow-outline transition-colors duration-500 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-500 hover:scale-105 w-full"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
