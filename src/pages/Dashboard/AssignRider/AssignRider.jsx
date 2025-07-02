import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Loading from "../../../components/Shared/Loading";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [regionRiders, setRegionRiders] = useState([]);

  // Fetch eligible parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["pendingPaidParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/pending-paid");
      return res.data;
    },
  });

  // Assign rider mutation
  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, riderEmail }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/assign-rider`, {
        riderEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Assigned!", "Rider has been assigned.", "success");
      queryClient.invalidateQueries(["pendingPaidParcels"]);
      setSelectedParcel(null);
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign rider.", "error");
    },
  });

  const handleAssign = async (parcel) => {
    try {
      const res = await axiosSecure.get(
        `/riders/by-region/${parcel.senderRegion}`
      );
      setRegionRiders(res.data.data);
      setSelectedParcel(parcel);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load riders", "error");
    }
  };

  const handleRiderSelection = (riderEmail) => {
    assignMutation.mutate({
      parcelId: selectedParcel._id,
      riderEmail,
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full rounded-xl">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverAddress}</td>
                <td>{parcel.payment_status}</td>
                <td>{parcel.delivery_status}</td>
                <td>
                  <button
                    onClick={() => handleAssign(parcel)}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No pending parcels with paid status found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              Select Rider for:{" "}
              <span className="text-blue-500">
                {selectedParcel.tracking_id}
              </span>
            </h3>
            {regionRiders.length === 0 ? (
              <p className="text-red-500">
                No available riders in {selectedParcel.senderRegion}
              </p>
            ) : (
              <ul className="space-y-3 max-h-60 overflow-y-auto">
                {regionRiders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {rider.name} ({rider.email})
                    </span>
                    <button
                      onClick={() => handleRiderSelection(rider.email)}
                      className="btn btn-success btn-sm"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={() => setSelectedParcel(null)}
              className="btn btn-sm mt-4 bg-gray-400 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
