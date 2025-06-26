import amazon from "../../../assets/brands/amazon.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start from "../../../assets/brands/start.png";
import start1 from "../../../assets/brands/start-people 1.png";
import Marquee from "react-fast-marquee";
const Companies = () => {
  return (
    <section
      className="py-30 space-y-10"
      data-aos="fade-left"
    >
      <h2 className="font-extrabold text-3xl text-center">
        We've helped thousands of sales teams
      </h2>
      <Marquee pauseOnHover={true}>
        <img src={amazon} alt="" className="h-6 mr-20" />
        <img src={casio} alt="" className="h-6 mr-20" />
        <img src={moonstar} alt="" className="h-6 mr-20" />
        <img src={randstad} alt="" className="h-6 mr-20" />
        <img src={start} alt="" className="h-6 mr-20" />
        <img src={start1} alt="" className="h-6 mr-20" />
      </Marquee>
    </section>
  );
};

export default Companies;
