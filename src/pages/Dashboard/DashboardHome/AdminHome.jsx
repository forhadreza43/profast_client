import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { FaBox, FaShippingFast, FaUserShield } from 'react-icons/fa';
import { MdPendingActions } from 'react-icons/md';

const AdminHome = () => {
    const {user} = useAuth();
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Hello{" "}
          <span className="font-semibold">{user?.displayName || "User"}</span>,
          manage and track your deliveries, users, and riders efficiently from
          here.
        </p>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white p-5 rounded-xl flex items-center gap-4">
            <FaBox size={30} />
            <div>
              <h3 className="text-lg font-semibold">All Parcels</h3>
              <p className="text-sm">Manage or view parcel records</p>
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-white p-5 rounded-xl flex items-center gap-4">
            <FaShippingFast size={30} />
            <div>
              <h3 className="text-lg font-semibold">Assign Deliveries</h3>
              <p className="text-sm">Assign riders to pending deliveries</p>
            </div>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-white p-5 rounded-xl flex items-center gap-4">
            <MdPendingActions size={30} />
            <div>
              <h3 className="text-lg font-semibold">Pending Approvals</h3>
              <p className="text-sm">Approve new rider applications</p>
            </div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-white p-5 rounded-xl flex items-center gap-4">
            <FaUserShield size={30} />
            <div>
              <h3 className="text-lg font-semibold">Admin Control</h3>
              <p className="text-sm">Add or remove admin privileges</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminHome;