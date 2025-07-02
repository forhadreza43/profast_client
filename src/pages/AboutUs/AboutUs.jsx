import { useState } from "react";

const tabs = ["Story", "Mission", "Success", "Team & Others"];

const tabContent = {
  Story: `We started with a simple promise — to make parcel delivery fast, reliable, and stress-free.
Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands.
Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.`,

  Mission: `Our mission is to redefine delivery services in Bangladesh by making every parcel count.
We focus on real-time transparency, fast delivery, and maintaining a strong network of warehouses and riders who care.
With cutting-edge logistics, we aim to exceed customer expectations every single time.`,

  Success: `We’ve successfully delivered millions of parcels across all divisions of Bangladesh.
Our high customer satisfaction rate and strong rider network are testaments to our commitment.
Our growth story is built on trust, reliability, and innovation in logistics technology.`,

  "Team & Others": `Behind our platform is a team of passionate individuals — from developers and support agents to riders and logistics experts.
Together, we work to make deliveries smoother, smarter, and more accessible for everyone in the country.
We believe in team spirit, data-driven decisions, and community-focused innovation.`,
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("Story");

  return (
    <div className="mx-auto p-10 bg-white dark:bg-gray-700 rounded-2xl">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
        About Us
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-3xl">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Divider */}
      <hr className="my-6 border-gray-300 dark:border-gray-600" />

      {/* Tabs */}
      <div className="flex flex-wrap gap-6 mb-6 text-gray-500 dark:text-gray-300 text-sm md:text-base">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-medium ${
              activeTab === tab
                ? "text-green-600 border-b-2 border-green-600"
                : "hover:text-green-500"
            } pb-1 transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed">
        {tabContent[activeTab].split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
