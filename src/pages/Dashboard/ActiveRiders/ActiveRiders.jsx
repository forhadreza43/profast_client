import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all active riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data.data;
    },
  });

  // Filter by name (case-insensitive, partial match)
  const filteredRiders = riders.filter((rider) =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto dark:bg-gray-700 rounded-2xl p-5">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table w-full rounded-2xl">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-300 dark:text-gray-800">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Warehouse</th>
          </tr>
        </thead>
        <tbody>
          {filteredRiders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.region}</td>
              <td>{rider.warehouse}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredRiders.length === 0 && (
        <p className="text-center mt-4 text-red-500">No riders found.</p>
      )}
    </div>
  );
};

export default ActiveRiders;
