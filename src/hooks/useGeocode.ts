import { useState } from "react";
// @ts-ignore
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.setLocationType("ROOFTOP");

export const useGeocode = () => {
  const [coordinates, setCoordinates]: any = useState(null);

  const getCoordinates = async (address: string) => {
    // Get latitude & longitude from address.
    await Geocode.fromAddress(address).then(
      async (response: any) => {
        const { lat, lng } = await response.results[0].geometry.location;

        setCoordinates({ lat, lng });
      },
      (error: any) => {
        console.error(error);
        return "error";
      }
    );

    return coordinates;
  };

  return { getCoordinates };
};
