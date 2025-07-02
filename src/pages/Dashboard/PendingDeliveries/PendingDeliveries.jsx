import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth"; // assuming you have a user context

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider-assigned?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const completeDeliveryMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.patch(`/parcels/${id}/complete-delivery`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Parcel marked as delivered", "success");
      queryClient.invalidateQueries(["riderParcels"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to update delivery", "error");
    },
  });

  const handleComplete = (id) => {
    Swal.fire({
      title: "Complete Delivery?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark delivered",
      confirmButtonColor: "#22c55e",
    }).then((res) => {
      if (res.isConfirmed) {
        completeDeliveryMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-5 bg-white dark:bg-gray-900 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 dark:bg-gray-800 dark:text-white">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Sender</th>
              <th>Recipient</th>
              <th>Address</th>
              <th>Delivery Status</th>
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
                <td>
                  <span className="badge badge-info capitalize">
                    {parcel.delivery_status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleComplete(parcel._id)}
                    className="btn btn-sm btn-success"
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-4">
                  No parcels assigned to you.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
