import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { format } from "date-fns";
import { FaTrash, FaEye, FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: userParcels = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels?email=${user?.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (parcel) => {
      const res = await axiosSecure.delete(`/parcels/${parcel.tracking_id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Parcel deleted");
      refetch();
    },
    onError: (error) => {
      toast.error("Something went wrong. Try again.");
      console.error("Parcel deletion failed:", error.message);
    },
  });

  const handleDelete = async (parcel) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the parcel permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      mutation.mutate(parcel);
    }
  };

  const handlePay = async (parcel) => {
    navigate(`/dashboard/payment/${parcel.tracking_id}`);
    // await axiosSecure.patch(`/parcels/${parcel.tracking_id}`, {
    //   payment_status: "paid",
    // });
    // toast.success("Marked as paid");
    refetch();
  };

  const handleView = (parcel) => {
    Swal.fire({
      title: parcel.title,
      html: `
        <div class="text-left text-sm">
          <p><b>Sender:</b> ${parcel.senderName} (${parcel.senderContact})</p>
          <p><b>Receiver:</b> ${parcel.receiverName} (${
        parcel.receiverContact
      })</p>
          <p><b>From:</b> ${parcel.senderCenter}, ${parcel.senderRegion}</p>
          <p><b>To:</b> ${parcel.receiverCenter}, ${parcel.receiverRegion}</p>
          <p><b>Tracking ID:</b> ${parcel.tracking_id}</p>
          <p><b>Delivery Cost:</b> ৳${parcel.delivery_cost}</p>
          <p><b>Status:</b> ${parcel.delivery_status}</p>
          <p><b>Payment:</b> ${parcel.payment_status}</p>
          <p><b>Created:</b> ${format(
            new Date(parcel.creation_date),
            "PPPp"
          )}</p>
        </div>
      `,
    });
  };
  if (isPending) return <Loading />;
  if (isError) console.log(error.message);
  if (!userParcels.length) return <h1>Not Parcel</h1>;
  return (
    <>
      <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-md rounded-xl p-4">
        <h2 className="text-2xl font-bold mb-4">My Parcels</h2>
        <table className="table table-zebra w-full">
          <thead className="bg-gray-100 text-gray-700 text-center">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Cost (৳)</th>
              <th>Tracking ID</th>
              <th>Created</th>
              <th>Status</th>
              <th></th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userParcels.map((parcel, index) => (
              <tr key={parcel.tracking_id}>
                <td>{index + 1}</td>
                <td
                  className="font-semibold max-w-[180px] truncate"
                  title={parcel.title}
                >
                  {parcel.title}
                </td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>৳{parcel.delivery_cost}</td>
                <td className="text-xs font-mono">{parcel.tracking_id}</td>
                <td>{format(new Date(parcel.creation_date), "PPPp")}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td>
                  {parcel.payment_status === "unpaid" && (
                    <button
                      className="btn btn-xs btn-outline btn-success"
                      onClick={() => handlePay(parcel)}
                    >
                      Pay <FaCheckCircle />
                    </button>
                  )}
                </td>
                <td className="flex items-center gap-2 justify-center">
                  <button
                    className="btn btn-xs btn-outline btn-info"
                    onClick={() => handleView(parcel)}
                  >
                    View <FaEye />
                  </button>

                  <button
                    className="btn btn-xs btn-outline btn-error"
                    onClick={() => handleDelete(parcel)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyParcels;
