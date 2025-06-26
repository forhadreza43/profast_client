const ServiceCard = ({ iconMap, service }) => {
  return (
    <div className="card  shadow-md hover:shadow-xl transition-all duration-300 bg-base-100 dark:bg-base-300 hover:bg-[#CAEB66] dark:hover:bg-gray-800">
      <div className="card-body items-center text-center">
        <div className="mb-4 bg-linear-to-t from-[#EEEDFC00] to-[#EEEDFC] p-5 rounded-full dark:from-gray-0 dark:to-gray-700 transition-colors duration-300">
          {iconMap[service.title] || (
            <FaShippingFast className="text-4xl text-primary" />
          )}
        </div>
        <h3 className="card-title text-lg font-semibold text-neutral dark:text-neutral-content">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
