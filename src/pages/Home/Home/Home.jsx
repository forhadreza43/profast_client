import Banner from "../Banner/Banner";
import BeMerchant from "../BeMerchant/BeMerchant";
import Companies from "../Companies/Companies";
import CustomerReview from "../CustomerReview/CustomerReview";
import Faq from "../FAQ/Faq";

import FeatureServices from "../FeatureServices/FeatureServices";
import Services from "../Services/Services";

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <Companies />
      <FeatureServices />
      <BeMerchant />
      <CustomerReview />
      <Faq />
    </>
  );
};

export default Home;
