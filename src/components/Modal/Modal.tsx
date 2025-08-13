import { LatLngTuple } from "leaflet";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  coords: LatLngTuple[] | null;
}

export const Modal = ({ isOpen, onClose, coords }: ModalProps) => {
  if (!isOpen || !coords) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Координаты выделенной области</h3>
        <ul>
          {coords.map(([lat, lng], i) => (
            <li key={i}>
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};
