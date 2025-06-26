import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import warehouses from "../../assets/data/warehouses.json";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const FlyToDistrict = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

export default function Coverage() {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [hovered, setHovered] = useState(null);
  const [flyTo, setFlyTo] = useState(null);

  const filtered = useMemo(() => {
    if (!searchText.trim()) return null;
    return warehouses.find((wh) =>
      wh.district.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  useEffect(() => {
    if (filtered) {
      setFlyTo([filtered.latitude, filtered.longitude]);
    }
  }, [filtered]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(inputText);
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl px-25 py-20">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">We are available in 64 districts</h2>
        <div className="flex justify-left">
          <form
            onSubmit={handleSearch}
            action=""
            className="flex relative w-full max-w-md"
          >
            <input
              type="text"
              className="input input-bordered rounded-full w-full px-6 focus:outline-0"
              placeholder="Search district..."
              defaultValue={searchText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#CAEB66] font-bold rounded-full border border-gray-400 absolute right-0 h-full  z-99 px-5 text-black"
            >
              Go
            </button>
          </form>
        </div>
        <MapContainer
          center={[23.685, 90.3563]} // Center on Bangladesh
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-[60vh] rounded-lg z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {warehouses.map((wh, idx) => (
            <Marker
              key={idx}
              position={[wh.latitude, wh.longitude]}
              eventHandlers={{
                mouseover: (e) => {
                  setHovered(idx);
                  e.target.openPopup();
                },
                mouseout: () => setHovered(null),
                click: () => {
                  setFlyTo([wh.latitude, wh.longitude]);
                },
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-bold">{wh.district}</p>
                  <p className="text-sm text-gray-600">
                    Coverage: {wh.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
          {flyTo && <FlyToDistrict position={flyTo} />}
        </MapContainer>
      </div>
    </div>
  );
}
