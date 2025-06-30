import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Shared/Loading";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Get pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (riderId) => {
      return await axiosSecure.patch(`/riders/${riderId}`, {
        status: "approved",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiders"]);
      Swal.fire("Approved!", "The rider has been approved.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve rider", "error");
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (riderId) => {
      return await axiosSecure.patch(`/riders/${riderId}`, {
        status: "rejected",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["pendingRiders"]);
      Swal.fire("Rejected!", "The rider has been rejected.", "info");
    },
    onError: () => {
      Swal.fire("Error", "Failed to reject rider", "error");
    },
  });

  const handleApprove = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Approve this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22c55e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(riderId);
      }
    });
  };

  const handleReject = (riderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Reject this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(riderId);
      }
    });
  };

  const handleSeeApplication = (rider) => {
    Swal.fire({
      title: "Rider Application",
      html: `
        <div class="text-left">
          <p><b>Name:</b> ${rider.name}</p>
          <p><b>Email:</b> ${rider.email}</p>
          <p><b>Age:</b> ${rider.age}</p>
          <p><b>Region:</b> ${rider.region}</p>
          <p><b>Warehouse:</b> ${rider.warehouse}</p>
          <p><b>NID:</b> ${rider.nid}</p>
          <p><b>Contact:</b> ${rider.contact}</p>
          <p><b>Status:</b> ${rider.status}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto dark:bg-gray-700 rounded-2xl p-5">
      <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>
      <table className="table w-full rounded-2xl">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-300 dark:text-gray-800">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Warehouse</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
            <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td>{rider.email}</td>
              <td>{rider.region}</td>
              <td>{rider.warehouse}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handleSeeApplication(rider)}
                  className="btn btn-sm bg-blue-500 text-white"
                >
                  See Application
                </button>
                <button
                  onClick={() => handleApprove(rider._id)}
                  className="btn btn-sm bg-green-500 text-white"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(rider._id)}
                  className="btn btn-sm bg-red-500 text-white"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRiders;
