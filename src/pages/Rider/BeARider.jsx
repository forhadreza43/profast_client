import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import divisions from "../../assets/data/division.json";
import warehouses from "../../assets/data/warehouses.json";
import riderImg from "../../assets/agent-pending.png"; // Add your rider image
import { useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [filteredWarehouses, setFilteredWarehouses] = useState([]);
  const { user } = useAuth();

  const selectedRegion = watch("region");

  useEffect(() => {
    if (selectedRegion) {
      const filtered = warehouses.filter((wh) => wh.region === selectedRegion);
      setFilteredWarehouses(filtered);
    } else {
      setFilteredWarehouses([]);
    }
  }, [selectedRegion]);

  const axiosSecure = useAxiosSecure();
  const mutation = useMutation({
    mutationFn: async (riderData) => {
      return await axiosSecure.post("/riders", riderData);
    },
    onSuccess: (data) => {
      if (data.data.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted",
          text: "Your application is pending to approval.",
        });
      }
    },
  });

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    mutation.mutate(riderData);

    reset();
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-6xl font-bold mb-2">Become a Rider</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300 max-w-md">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>
      <hr className="border-gray-300/40 my-10" />

      <div className="flex flex-col md:flex-row-reverse gap-8 items-center justify-between">
        {/* Image */}
        <div className="md:w-1/2 w-full">
          <img
            src={riderImg}
            alt="Be a Rider"
            className="rounded-lg w-full h-auto"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-1/2 w-full rounded-lg  space-y-4"
        >
          <div>
            <label className="block font-medium">Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">Name is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Age</label>
            <input
              {...register("age", { required: true })}
              type="number"
              className="input input-bordered w-full"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">Age is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Region</label>
            <select
              {...register("region", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select region</option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">Region is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">NID</label>
            <input
              {...register("nid", { required: true })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.nid && (
              <p className="text-red-500 text-sm mt-1">NID is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Contact</label>
            <input
              {...register("contact", { required: true })}
              type="text"
              className="input input-bordered w-full"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">Contact is required</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Warehouse</label>
            <select
              {...register("warehouse", { required: true })}
              className="select select-bordered w-full"
              disabled={!filteredWarehouses.length}
            >
              <option value="">Select warehouse</option>
              {filteredWarehouses.map((wh, index) => (
                <option key={index} value={wh.city}>
                  {wh.city}
                </option>
              ))}
            </select>
            {errors.warehouse && (
              <p className="text-red-500 text-sm mt-1">Warehouse is required</p>
            )}
          </div>

          <button className="btn btn-primary w-full mt-2">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default BeARider;
