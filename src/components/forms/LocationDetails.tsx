import { Country, State } from "country-state-city";
import { continents } from "countries-list";
import { useEffect, useState } from "react";
// import { useGeocode } from "hooks/useGeocode";
import axios from "axios";
import { endpoints } from "constants/endpoints";
import { useNavigate } from "react-router-dom";

export const LocationDetails = () => {
  // const { getCoordinates } = useGeocode();
  const allContinents = Object.values(continents);
  const allCountries = Country.getAllCountries();
  // const allStates = State.getAllStates();
  // const allCities = City.getAllCities();

  const [hashTag, setHashTag] = useState("#peace");
  const [sendToOptions, setSendToOptions]: any = useState(allContinents);
  const [commingFromOptions, setCommingFromOptions]: any =
    useState(allContinents);

  const [sendFrom, setSendFrom] = useState(allContinents[0]);
  const [sendTo, setSendTo] = useState(allContinents[0]);
  const [sendToState, setSendToState]: any = useState(null);
  const [sendToCity, setSendToCity] = useState("");

  const [sendToMainOpt, setSendToMainOpt] = useState("continent");
  const sendToOptionHandler = (e: React.ChangeEvent<any>) => {
    setSendToMainOpt(e.target.value);
    if (e.target.value.toLowerCase() === "continent") {
      setSendToOptions(allContinents);
    } else if (e.target.value.toLowerCase() !== "continent") {
      setSendToOptions(allCountries.map((details: any) => details?.name));
    }
    return;
  };

  const [commingFromMainOpt, setCommingFromMainOpt] = useState("continent");

  const commingFromOptionHandler = (e: React.ChangeEvent<any>) => {
    setCommingFromMainOpt(e.target.value);
    // console.log(e.target.value);
    if (e.target.value.toLowerCase() === "continent") {
      setCommingFromOptions(allContinents);
    } else if (e.target.value.toLowerCase() !== "continent") {
      setCommingFromOptions(allCountries.map((details: any) => details?.name));
    }
    return;
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendToMainOpt, sendTo]);

  const [commingFromStateOpts, setCommingFromStateOpts]: any = useState(null);
  const [commingFromState, setCommingFromState]: any = useState(null);
  const [commingFromCity, setCommingFromCity] = useState("");

  useEffect(() => {
    if (commingFromMainOpt !== "continent") {
      const selectedCountry = allCountries.filter(
        (details) => details.name.toLowerCase() === sendFrom.toLowerCase()
      );

      setCommingFromStateOpts(
        State.getStatesOfCountry(selectedCountry[0]?.isoCode)
      );

      setCommingFromState(
        State.getStatesOfCountry(selectedCountry[0]?.isoCode)[0]?.name
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commingFromMainOpt, sendFrom]);

  const [sendToPlanetOpt, setSendToPlanetOpt] = useState("Earth");
  const [comingFromPlanetOpt, setComingFromPlanetOpt] = useState("Earth");

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    let sendToAddress = "";

    if (sendToMainOpt === "continent" || sendToMainOpt === "country") {
      sendToAddress = sendTo;
    }

    if (sendToMainOpt === "state") {
      sendToAddress = `${sendToState}, ${sendTo}`;
    }

    if (sendToMainOpt === "city") {
      sendToAddress = `${sendToCity}, ${sendToState}, ${sendTo}`;
    }

    let commingFromAddress = "";
    if (
      commingFromMainOpt === "continent" ||
      commingFromMainOpt === "country"
    ) {
      commingFromAddress = sendFrom;
    }

    if (commingFromMainOpt === "state") {
      commingFromAddress = `${commingFromState}, ${sendFrom}`;
    }

    if (commingFromMainOpt === "city") {
      commingFromAddress = `${commingFromCity}, ${commingFromState}, ${sendFrom}`;
    }

    const payload = await {
      from:
        commingFromAddress.length > 0
          ? commingFromAddress
          : comingFromPlanetOpt,
      to: sendToAddress.length > 0 ? sendToAddress : sendToPlanetOpt,
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

    if (sendToMainOpt === "planets" && commingFromMainOpt === "planets")
      navigate("/wishes/screen");
    else navigate("/wishes");
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
            {/* <option value="city">City</option> */}
            <option value="planets">Planets and Above</option>
          </select>

          {sendToMainOpt === "planets" ? (
            <select
              className="select  mt-1 w-full max-w-xs bg-white text-gray-700"
              onChange={(e: any) => setSendToPlanetOpt(e.target.value)}
            >
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
                  ) : sendToMainOpt.toLowerCase() === "planets" ? null : (
                    <option>Select continent</option>
                  )}

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
            className="select  mt-1 w-full max-w-xs bg-white text-gray-700"
            onChange={commingFromOptionHandler}
          >
            <option value="continent">Continent</option>
            <option value="country">Country</option>
            <option value="state">State</option>
            {/* <option value="city">City</option> */}
            <option value="planets">Planets and Above</option>
          </select>

          {commingFromMainOpt === "planets" ? (
            <select
              className="select  mt-1 w-full max-w-xs bg-white text-gray-700"
              onChange={(e: any) => setComingFromPlanetOpt(e.target.value)}
            >
              {["Earth", "Heaven", "Sky", "Stars", "Universe"].map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          ) : null}

          {commingFromMainOpt !== "planets" ? (
            <div className="flex justify-between w-full max-w-xs gap-x-1">
              <select
                className={`select mt-2 ${
                  commingFromMainOpt.toLowerCase() === "state" ||
                  commingFromMainOpt === "city"
                    ? "w-1/2"
                    : "w-full"
                } bg-white text-gray-700`}
                value={sendFrom}
                onChange={(e: any) => setSendFrom(e.target.value)}
              >
                <>
                  {commingFromMainOpt.toLowerCase() === "country" ||
                  commingFromMainOpt.toLowerCase() === "state" ||
                  commingFromMainOpt.toLowerCase() === "city" ? (
                    <option>Select country</option>
                  ) : commingFromMainOpt.toLowerCase() === "planets" ? null : (
                    <option>Select continent</option>
                  )}

                  {commingFromOptions.map((opt: string, idx: number) => (
                    <option value={opt.toLowerCase()} key={idx}>
                      {opt}
                    </option>
                  ))}
                </>
              </select>

              {commingFromOptions &&
              (commingFromMainOpt === "state" ||
                commingFromMainOpt === "city") ? (
                <select
                  className={`select mt-2 ${
                    commingFromMainOpt === "state" ||
                    commingFromMainOpt === "city"
                      ? "w-1/2"
                      : "w-full"
                  } bg-white text-gray-700`}
                  value={commingFromState}
                  onChange={(e: any) => setCommingFromState(e.target.value)}
                >
                  {commingFromStateOpts?.map((stateObj: any, idx: number) => (
                    <option value={stateObj?.name?.toLowerCase()} key={idx}>
                      {stateObj.name}
                    </option>
                  ))}
                </select>
              ) : null}
            </div>
          ) : null}
          {commingFromMainOpt === "city" ? (
            <input
              type="text"
              className="input w-full max-w-xs text-black bg-white mt-2"
              placeholder="Enter city..."
              value={commingFromCity}
              onChange={(e: any) => setCommingFromCity(e.target.value)}
            />
          ) : null}
        </section>

        <section className="my-2 flex flex-col items-center">
          <label
            htmlFor="wishto"
            className="text-white text-lg pl-2 sm:pl-4 md:pl-10 w-full"
          >
            What did you wish for?
          </label>
          <select
            className="select mt-1 w-full max-w-xs bg-white text-gray-700"
            value={hashTag}
            onChange={(e) => setHashTag(e.target.value)}
          >
            {["#peace", "#love", "#support", "#prayers", "#hope", "#faith"].map(
              (tag) => (
                <option value={tag} key={tag}>
                  {tag}
                </option>
              )
            )}
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
