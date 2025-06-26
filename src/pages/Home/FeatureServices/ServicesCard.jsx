const ServicesCard = ({ tracking, service }) => {
  return (
    <>
      <div className="bg-base-100 dark:bg-base-300 p-6 md:p-8 rounded-2xl flex flex-col w-full md:flex-row items-center gap-6 md:gap-12 shadow-md">
        {/* Left image placeholder */}
        <div className="">
          <img
            src={tracking}
            alt={service.title}
            className="w-full max-w-[200px] h-auto max-h-64 object-contain"
          />
        </div>

        {/* Vertical dashed line */}
        <div className="hidden md:block h-40 w-px border-l-2 border-dashed border-gray-300 dark:border-gray-500"></div>

        {/* Right text content */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-semibold text-neutral dark:text-neutral-content mb-2">
            {service.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {service.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default ServicesCard;
