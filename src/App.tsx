import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet-draw";
import { Modal, DrawControls } from "./components";

export const App = () => {
  const [coords, setCoords] = useState<LatLngTuple[] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleShapeCreated = (coords: LatLngTuple[]) => {
    setCoords(coords);
    setModalOpen(true);
  };

  return (
    <>
      <MapContainer
        center={[55.751244, 37.618423]}
        zoom={13}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DrawControls onShapeCreated={handleShapeCreated} />
      </MapContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        coords={coords}
      />
    </>
  );
};
