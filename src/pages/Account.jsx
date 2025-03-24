import React from 'react';
import {  User, Mail, Camera, LogOut, Home, } from 'lucide-react';
import { Link } from 'react-router-dom';

function Account() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
            <Link to={'/home'}>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <Home size={20} />
              <span>Back to Home</span>
            </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src="https://comicbook.com/wp-content/uploads/sites/4/2024/11/One-Piece-Luffy.webp"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white hover:bg-blue-700 transition">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Argo </h2>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <User className="text-gray-400" size={20} />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500">User Name</p>
                    <p className="text-gray-900">Argo</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-gray-400" size={20} />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">argo@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 text-red-600 rounded-lg hover:bg-red-50 transition">
                  <LogOut className="text-red-600" size={20} />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account