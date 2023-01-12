import { Country, State, City } from "country-state-city";
import { continents } from "countries-list";
import { useEffect, useState } from "react";
import { useGeocode } from "hooks/useGeocode";
import axios from "axios";
import { endpoints } from "constants/endpoints";
import { useNavigate } from "react-router-dom";

export const LocationDetails = () => {
  const { getCoordinates } = useGeocode();
  const allContinents = Object.values(continents);
  const allCountries = Country.getAllCountries();
  const allStates = State.getAllStates();
  const allCities = City.getAllCities();

  const [hashTag, setHashTag] = useState("#peace");
  const [sendToOptions, setSendToOptions] = useState(allContinents);
  const [commingFromOptions, setCommingFromOptions] = useState(allContinents);

  const [sendFrom, setSendFrom] = useState(allContinents[0]);
  const [sendTo, setSendTo] = useState(allContinents[0]);
  const [sendToState, setSendToState]: any = useState(null);
  const [sendToCity, setSendToCity] = useState("");

  const [sendToMainOpt, setSendToMainOpt] = useState("");
  const sendToOptionHandler = (e: React.ChangeEvent<any>) => {
    setSendToMainOpt(e.target.value);
    if (e.target.value.toLowerCase() === "continent") {
      setSendToOptions(allContinents);
    } else if (e.target.value.toLowerCase() !== "continent") {
      setSendToOptions(allCountries.map((details: any) => details?.name));
    }
    return;
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

  const [sendToStatesOptions, setSendToStatesOptions]: any = useState([]);
  useEffect(() => {
    if (sendToMainOpt !== "continent") {
      const selectedCountry = allCountries.filter(
        (details) => details.name.toLowerCase() === sendTo.toLowerCase()
      );

      setSendToStatesOptions(
        State.getStatesOfCountry(selectedCountry[0]?.isoCode)
      );
      setSendToState(
        State.getStatesOfCountry(selectedCountry[0]?.isoCode)[0]?.name
      );
    }
  }, [sendToMainOpt, sendTo]);

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    if (sendToMainOpt === "planets") navigate("/wishes/screen");

    let fromAddress = "";

    if (sendToMainOpt === "continent" || sendToMainOpt === "country") {
      fromAddress = sendTo;
    }

    if (sendToMainOpt === "state") {
      fromAddress = `${sendToState}, ${sendTo}`;
    }

    if (sendToMainOpt === "city") {
      fromAddress = `${sendToCity}, ${sendToState}, ${sendTo}`;
    }

    const payload = await {
      from: fromAddress.length > 0 ? fromAddress : sendFrom,
      to: sendTo,
      hashTag,
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
            <option value="planets">Planets and Above</option>
          </select>

          {sendToMainOpt === "planets" ? (
            <select className="select  mt-1 w-full max-w-xs bg-white text-gray-700">
              {["Earth", "Heaven", "Sky", "Stars", "Universe"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ) : null}

          {sendToMainOpt !== "planets" ? (
            <div className="flex justify-between w-full max-w-xs gap-x-1">
              <select
                className={`select mt-2 ${
                  sendToMainOpt.toLowerCase() === "state" ||
                  sendToMainOpt === "city"
                    ? "w-1/2"
                    : "w-full"
                } bg-white text-gray-700`}
                value={sendTo}
                onChange={(e: any) => setSendTo(e.target.value)}
              >
                <>
                  {sendToMainOpt.toLowerCase() === "country" ||
                  sendToMainOpt.toLowerCase() === "state" ||
                  sendToMainOpt.toLowerCase() === "city" ? (
                    <option>Select country</option>
                  ) : null}

                  {sendToOptions.map((opt: string, idx: number) => (
                    <option value={opt.toLowerCase()} key={idx}>
                      {opt}
                    </option>
                  ))}
                </>
              </select>

              {sendToStatesOptions &&
              (sendToMainOpt === "state" || sendToMainOpt === "city") ? (
                <select
                  className={`select mt-2 ${
                    sendToMainOpt === "state" || sendToMainOpt === "city"
                      ? "w-1/2"
                      : "w-full"
                  } bg-white text-gray-700`}
                  value={sendToState}
                  onChange={(e: any) => setSendToState(e.target.value)}
                >
                  {sendToStatesOptions?.map((stateObj: any, idx: number) => (
                    <option value={stateObj.name.toLowerCase()} key={idx}>
                      {stateObj.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ) : null}

          {sendToMainOpt === "city" ? (
            <input
              type="text"
              className="input w-full max-w-xs text-black bg-white mt-2"
              placeholder="Enter city..."
              value={sendToCity}
              onChange={(e: any) => setSendToCity(e.target.value)}
            />
          ) : null}
        </section>

        <section className="my-2 flex flex-col items-center">
          <label
            htmlFor="wishto"
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            Coming from
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

        <section className="my-2 flex flex-col items-center">
          <label
            htmlFor="wishto"
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            Wish
          </label>
          <select
            className="select mt-1 w-full max-w-xs bg-white text-gray-700"
            value={hashTag}
            onChange={(e) => setHashTag(e.target.value)}
          >
            {["#peace", "#love", "#support", "#prayers", "#hope"].map((tag) => (
              <option value={tag} key={tag}>
                {tag}
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
