import location from "../../../assets/location-merchant.png";
const BeMerchant = () => {
  return (
    <div className="py-20" data-aos="fade-up">
      <div className="container flex flex-col justify-center p-6 mx-auto lg:flex-row lg:justify-between rounded-2xl bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] dark:bg-base-300 dark:text-gray-300 text-gray-200">
        <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:text-left md:w-8/12">
          <h1 className="text-4xl font-bold leading-none sm:text-4xl">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="mt-6 mb-8 sm:mb-12">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start ">
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold rounded-full bg-[#CAEB66] text-gray-900"
            >
              Become a Merchant
            </a>
            <a
              rel="noopener noreferrer"
              href="#"
              className="px-8 py-3 text-lg font-semibold border rounded-full border-[#CAEB66] text-[#CAEB66]"
            >
              Earn with Profast Courier
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 ">
          <img src={location} alt="" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
