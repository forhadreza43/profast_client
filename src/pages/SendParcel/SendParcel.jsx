import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import regions from "../../assets/data/division.json";
import warehouses from "../../assets/data/warehouses.json";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Shared/Loading";
import { useNavigate } from "react-router";
export default function SendParcel() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (parcelData) => {
      const res = await axiosSecure.post("/parcels", parcelData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Parcel Saved");
      reset(); // ✅ clear form
    },
    onError: (error) => {
      toast.error("Something went wrong. Try again.");
      console.error("Parcel submission failed:", error.message);
    },
  });

  const parcelType = watch("parcelType");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const calculateCostBreakdown = (data) => {
    const isSameDistrict = data.senderCenter === data.receiverCenter;
    const type = data.parcelType;
    const weight = Number(data.weight || 0);

    let base = 0;
    let extra = 0;
    let final = 0;
    let explanation = "";

    if (type === "document") {
      base = isSameDistrict ? 60 : 80;
    } else {
      if (weight <= 3) {
        base = isSameDistrict ? 110 : 150;
      } else {
        const extraKg = weight - 3;
        base = isSameDistrict ? 110 : 150;
        extra = extraKg * 40;
        explanation = `৳40 × ${extraKg}kg extra`;

        if (!isSameDistrict) {
          extra += 40;
          explanation += " + ৳40 for outside district";
        }
      }
    }

    final = base + extra;

    return {
      base,
      extra,
      final,
      explanation,
      isSameDistrict,
    };
  };
  const generateTrackingID = () => {
    const date = new Date();
    const datePart = date.toISOString().split("T")[0].replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PCL-${datePart}-${rand}`;
  };
  const onSubmit = (data) => {
    const breakdown = calculateCostBreakdown(data);

    const parcelData = {
      ...data,
      user_email: user?.email || "guest",
      creation_date: new Date().toISOString(),
      delivery_cost: breakdown.final,
      tracking_id: generateTrackingID(),
      delivery_status: "pending",
      payment_status: "unpaid",
    };

    Swal.fire({
      title: "Confirm Parcel Details",
      icon: "info",
      html: `
        <div class="text-left text-sm">
          <p><b>From:</b> ${data.senderCenter}</p>
          <p><b>To:</b> ${data.receiverCenter}</p>
          <hr class="my-2"/>
          <p><b>Parcel Type:</b> ${data.parcelType}</p>
          ${
            data.parcelType === "non-document"
              ? `<p><b>Weight:</b> ${data.weight} kg</p>`
              : ""
          }
          <p><b>Base Cost:</b> ৳${breakdown.base}</p>
          ${
            breakdown.extra > 0
              ? `<p><b>Extra Cost:</b> ৳${breakdown.extra}</p>
                 <small class="text-gray-500">(${breakdown.explanation})</small>`
              : ""
          }
          <hr class="my-2"/>
          <p class="text-lg"><b>Total Cost:</b> ৳${breakdown.final}</p>
        </div>
      `,
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      cancelButtonText: "✏️ Continue to Edit",
      denyButtonText: "💾 Save Now / Pay Later",
      confirmButtonColor: "#16a34a",
      denyButtonColor: "#3b82f6", // blue
      cancelButtonColor: "#6b7280", // gray
      focusConfirm: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        mutation.mutate(parcelData);
        navigate(`/dashboard/payment/${parcelData.tracking_id}`);
        reset();
      } else if (result.isDenied) {
        mutation.mutate(parcelData); // Only save, no redirect
        // toast.success("Parcel saved! You can pay later.", {
        //   position: "top-right",
        // });
        reset();
      } else {
        toast("You can continue editing.", { position: "top-right" });
      }
    });
    
  };

  return (
    <div className="bg-white relative dark:bg-gray-700 rounded-2xl px-25 py-20">
      <h2 className="text-3xl font-bold">Send Your Parcel</h2>
      {mutation.isLoading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur flex items-center justify-center z-50 rounded-xl">
          <Loading />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <p className="text-gray-600">Enter your parcel details</p>
        {/* Parcel Info */}
        <fieldset className="border p-4 rounded-xl">
          <legend className="font-bold text-lg">Parcel Info</legend>
          <div className="space-y-5">
            <div className="flex justify-between">
              <div>
                <label className="label">Parcel Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      {...register("parcelType", { required: true })}
                      type="radio"
                      value="document"
                      className="radio"
                    />
                    Document
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      {...register("parcelType", { required: true })}
                      type="radio"
                      value="non-document"
                      className="radio"
                    />
                    Non-Document
                  </label>
                </div>
                {errors.parcelType && <p className="text-red-500">Required</p>}
              </div>
              {parcelType === "non-document" && (
                <div>
                  <label className="label">Weight (kg)</label>
                  <input
                    {...register("weight")}
                    type="number"
                    className="input input-bordered w-full"
                  />
                </div>
              )}
            </div>

            <div>
              <div>
                <label className="label">Parcel Name</label>
                <input
                  {...register("title", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter parcel name"
                />
                {errors.title && <p className="text-red-500">Required</p>}
              </div>
            </div>
          </div>
        </fieldset>

        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Sender Info */}
          <fieldset className="border p-4 rounded-xl">
            <legend className="font-bold text-lg">Sender Info</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  {...register("senderName", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Sender name"
                />
                {errors.senderName && <p className="text-red-500">Required</p>}
              </div>
              <div>
                <label className="label">Contact</label>
                <input
                  {...register("senderContact", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Sender contact number"
                />
                {errors.senderContact && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div>
                <label className="label">Region</label>
                <select
                  {...register("senderRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div>
                <label className="label">Service Center</label>
                <select
                  {...register("senderCenter", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  {warehouses
                    .filter((w) => w.region === senderRegion)
                    .map((w) => (
                      <option key={w.district} value={w.district}>
                        {w.district}
                      </option>
                    ))}
                </select>
                {errors.senderCenter && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                <input
                  {...register("senderAddress", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Sender address"
                />
                {errors.senderAddress && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="label">Pick Up Instruction</label>
                <textarea
                  {...register("pickupInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe how Pick up your parcel"
                />
                {errors.pickupInstruction && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
            </div>
          </fieldset>
          {/* Receiver Info */}
          <fieldset className="border p-4 rounded-xl">
            <legend className="font-bold text-lg">Receiver Info</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Name</label>
                <input
                  {...register("receiverName", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Receiver name"
                />
                {errors.receiverName && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div>
                <label className="label">Contact</label>
                <input
                  {...register("receiverContact", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Receiver contact number"
                />
                {errors.receiverContact && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div>
                <label className="label">Region</label>
                <select
                  {...register("receiverRegion", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div>
                <label className="label">Service Center</label>
                <select
                  {...register("receiverCenter", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select</option>
                  {warehouses
                    .filter((w) => w.region === receiverRegion)
                    .map((w) => (
                      <option key={w.district} value={w.district}>
                        {w.district}
                      </option>
                    ))}
                </select>
                {errors.receiverCenter && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                <input
                  {...register("receiverAddress", { required: true })}
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Receiver address"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="label">Delivery Instruction</label>
                <textarea
                  {...register("deliveryInstruction", { required: true })}
                  className="textarea textarea-bordered w-full"
                  placeholder="Describe how receiver will pick up Parcel"
                />
                {errors.deliveryInstruction && (
                  <p className="text-red-500">Required</p>
                )}
              </div>
            </div>
          </fieldset>
        </div>

        <button className="btn text-gray-800 bg-[#CAEB66] ">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
}
