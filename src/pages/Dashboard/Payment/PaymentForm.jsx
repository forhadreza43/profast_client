import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState(null);
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    data: parcel,
    isPending,
    error: fetchError,
    isError,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) return <Loading />;
  if (isError) console.log(fetchError.message);
  const amount = parcel.delivery_cost;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastID = toast.loading("Payment Loading..");

    if (!stripe || !elements) {
      return;
    }

    //! step-1 Validate Card
    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setErr(error.message);
      console.log(error.message);
    } else {
      setErr(null);
      console.log("[PaymentMethod]", paymentMethod);

      //! step-2 Create Payment intent
      const res = await axiosSecure.post("/create-payment-intent", { amount });
      const clientSecret = res.data.clientSecret;

      //! step-3 Confirm Payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        setErr(result.error.message);
      } else {
        setErr(null);
        const paymentIntentInfo = result.paymentIntent;
        if (paymentIntentInfo.status === "succeeded") {
          console.log("Payment succeeded!");
          //! Update parcel's payment_status in database and Save payment History
          await axiosSecure.post("/payments/complete", {
            user_email: user.email,
            parcel_id: parcel._id,
            parcel_title: parcel.title,
            tracking_id: parcel.tracking_id,
            amount: parcel.delivery_cost,
            currency: "usd",
            transaction_id: paymentIntentInfo.id,
            payment_method: paymentIntentInfo.payment_method,
            status: paymentIntentInfo.status,
          });

          toast.success("Payment succeeded", { id: toastID });
          navigate("/dashboard");
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement
        className="p-2 border rounded border-gray-400"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p>
        <small className="text-red-500">{err}</small>
      </p>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          disabled={!stripe}
          className="btn bg-green-400 text-black rounded-lg mt-5"
        >
          <span className="mb-1">💳</span> Pay
        </button>
        <p className="text-black font-bold">${amount}</p>
      </div>
    </form>
  );
};

export default PaymentForm;
