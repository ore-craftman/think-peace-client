import { Country, State, City } from "country-state-city";
import { continents } from "countries-list";
import { useEffect, useState } from "react";
import { useGeocode } from "hooks/useGeocode";
import { WishSchema } from "interfaces/wish";
import axios from "axios";
import { endpoints } from "constants/endpoints";
import { useNavigate } from "react-router-dom";

export const LocationDetails = () => {
  const { getCoordinates } = useGeocode();
  const allContinents = Object.values(continents);
  const allCountries = Country.getAllCountries();
  const allStates = State.getAllStates();
  const allCities = City.getAllCities();

  const [sendToOptions, setSendToOptions] = useState(allContinents);
  const [commingFromOptions, setCommingFromOptions] = useState(allContinents);

  const [sendFrom, setSendFrom] = useState(allContinents[0]);
  const [sendTo, setSendTo] = useState(allContinents[0]);

  const sendToOptionHandler = (e: React.ChangeEvent<any>) => {
    switch (e.target.value.toLowerCase()) {
      case "country":
        setSendToOptions(allCountries.map((details: any) => details?.name));
        break;
      case "state":
        setSendToOptions(allStates.map((details: any) => details?.name));
        break;
      case "city":
        setSendToOptions(allCities.map((details: any) => details?.name));
        break;
      default:
        setSendToOptions(allContinents);
    }
  };

  const commingFromOptionHandler = (e: React.ChangeEvent<any>) => {
    switch (e.target.value.toLowerCase()) {
      case "country":
        setCommingFromOptions(
          allCountries.map((details: any) => details?.name)
        );
        break;
      case "state":
        setCommingFromOptions(allStates.map((details: any) => details?.name));
        break;
      case "city":
        setCommingFromOptions(allCities.map((details: any) => details?.name));
        break;
      default:
        setCommingFromOptions(allContinents);
    }
  };

  const navigate = useNavigate();
  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const from = await getCoordinates(sendFrom);
    const to = await getCoordinates(sendTo);

    const payload = await {
      from: sendFrom,
      to: sendTo,
    };

    axios
      .post(endpoints.wish.CREATE, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Err", error);
      });

    navigate("/wishes");
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <section className="my-2  flex flex-col items-center">
          <label
            htmlFor="wishto"
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            Send your wish to
          </label>
          <select
            className="select  mt-1 w-full max-w-xs bg-white text-gray-700"
            onChange={sendToOptionHandler}
          >
            <option value="continent">Continent</option>
            <option value="country">Country</option>
            <option value="state">State</option>
            <option value="city">City</option>
          </select>

          <select
            className="select mt-2 w-full max-w-xs bg-white text-gray-700"
            value={sendTo}
            onChange={(e: any) => setSendTo(e.target.value)}
          >
            {sendToOptions.map((opt: string, idx: number) => (
              <option value={opt.toLowerCase()} key={idx}>
                {opt}
              </option>
            ))}
          </select>
        </section>

        <section className="my-2 flex flex-col items-center">
          <label
            htmlFor="wishto"
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            Comming from
          </label>
          <select
            className="select mt-1 w-full max-w-xs bg-white text-gray-700"
            onChange={commingFromOptionHandler}
          >
            <option value="continent">Continent</option>
            <option value="country">Country</option>
            <option value="state">State</option>
            <option value="city">City</option>
          </select>

          <select
            className="select mt-2 w-full max-w-xs bg-white text-gray-700"
            value={sendFrom}
            onChange={(e: any) => setSendFrom(e.target.value)}
          >
            {commingFromOptions.map((opt: string, idx: number) => (
              <option value={opt.toLowerCase()} key={idx}>
                {opt}
              </option>
            ))}
          </select>
        </section>

        <div className="flex justify-center">
          <button className="btn bg-white hover:bg-white focus:bg-white text-gray-700 mt-3 mx-auto rounded-full px-8">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
