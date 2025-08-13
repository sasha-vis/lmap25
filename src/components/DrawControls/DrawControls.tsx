import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface DrawControlsProps {
  onShapeCreated: (coords: LatLngTuple[]) => void;
}

export const DrawControls = ({ onShapeCreated }: DrawControlsProps) => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {},
        rectangle: {},
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer as L.Polygon;
      drawnItems.addLayer(layer);

      if (layer.getLatLngs) {
        const latlngs = layer.getLatLngs()[0] as L.LatLng[];
        const coords: LatLngTuple[] = latlngs.map((p) => [p.lat, p.lng]);
        onShapeCreated(coords);
      }
    });

    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, onShapeCreated]);

  return null;
};
