import featureServices from "../../../assets/data/featureServices.json";
import tracking from "../../../assets/live-tracking.png";
import { AnimatedList } from "../../../utils/AnimatedListItem/AnimatedListItem";
import ServicesCard from "./ServicesCard";
// import delivery from "../../../assets/safe-delivery.png";
const FeatureServices = () => {
  return (
    <section className="border-t border-b border-dashed py-20 border-[#03373D80] dark:border-gray-600">
      <div className="max-w-7xl mx-auto space-y-10">
        {featureServices.map((service, index) => (
          <AnimatedList key={index}>
            <ServicesCard key={index} service={service} tracking={tracking} />
          </AnimatedList>
        ))}
      </div>
    </section>
  );
};

export default FeatureServices;
