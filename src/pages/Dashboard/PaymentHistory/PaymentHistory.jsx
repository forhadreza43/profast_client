import Loading from "../../../components/Shared/Loading";
import useUserPayments from "../../../hooks/useUserPayments";
import { format } from "date-fns";

const PaymentHistory = () => {
  const { payments, isLoading } = useUserPayments();
  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
      {!payments.length ? (
        <h1>No Payment yet</h1>
      ) : (
        <table className="table table-zebra w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Tracking ID</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>{payment.parcel_title}</td>
                <td className="font-mono text-xs">{payment.tracking_id}</td>
                <td className="text-yellow-400 font-bold">${payment.amount}</td>
                <td className="capitalize">
                  {payment.payment_method || "N/A"}
                </td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "succeeded"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td>{format(new Date(payment.paid_at), "PPP p")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
