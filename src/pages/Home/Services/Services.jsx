import { useEffect, useState } from "react";
import servicesData from "../../../assets/data/services.json";
import {
  FaShippingFast,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import ServiceCard from "./ServiceCard";

const iconMap = {
  "Express & Standard Delivery": (
    <FaShippingFast className="text-4xl text-primary" />
  ),
  "Nationwide Delivery": (
    <HiOutlineGlobeAlt className="text-4xl text-primary" />
  ),
  "Fulfillment Solution": <FaWarehouse className="text-4xl text-primary" />,
  "Cash on Home Delivery": (
    <FaMoneyBillWave className="text-4xl text-primary" />
  ),
  "Corporate Service / Contract In Logistics": (
    <FaBuilding className="text-4xl text-primary" />
  ),
  "Parcel Return": <FaUndoAlt className="text-4xl text-primary" />,
};
const Services = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    setServices(servicesData);
  }, []);
  return (
    <>
      <section className="p-16 bg-[#03373D] dark:bg-base-200 rounded-2xl mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white dark:text-neutral-content">
            Our Services
          </h2>
          <p className="text-lg text-white dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                iconMap={iconMap}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
