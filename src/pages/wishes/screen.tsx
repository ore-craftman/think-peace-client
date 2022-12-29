import { Container } from "components/partials/Container";
import { endpoints } from "constants/endpoints";
import moment from "moment";
import Firefly from "firefly-react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Notify = ({ message }: { message: string }) => {
  return toast.success(message);
};

const Screen = () => {
  const colors = ["Yellow", "Gold", "Yellow", "Orange"];
  const navigate = useNavigate();

  const [wishNum, setWishNum] = useState(0);
  const [toToast, setToToast]: any = useState([]);

  const toggleHandler = () => {
    navigate("/wishes");
  };

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(endpoints.wish.GET_ALL, fetcher);

  useEffect(() => {
    // if (data && data?.length >= 1) {
    //   data.map((wish: any, idx: number) => {
    //     toast.success(
    //       `Wish at ${moment(data[wishNum]?.createdAt).format("LT")} on ${moment(
    //         data[wishNum]?.createdAt
    //       )
    //         .subtract(10, "days")
    //         .calendar()} ${
    //         data[wishNum]?.from?.fullAdress
    //           ? "from " + data[wishNum]?.from?.fullAdress
    //           : "to " + data[wishNum]?.to?.fullAdress
    //       }`
    //     );
    //   });
    // }

    // if (data && data?.length >= 1) {
    //   for (let i = 0; i < data?.length; i++) {
    //     const wish = data[i];
    //     toast(
    //   `Wish at ${moment(wish?.createdAt).format("LT")} on ${moment(
    //     wish?.createdAt
    //   )
    //     .subtract(10, "days")
    //     .calendar()} from ${wish?.from?.fullAdress}`,
    //       { duration: 4000 }
    //     );
    //     toast(`Wish at 1:37 pm on 9/16/2022 to ${wish?.from?.fullAdress}`, {
    //       duration: 6000,
    //     });
    //   }
    // }

    if (data && data?.length >= 1) {
      setToToast([...toToast, data[wishNum]]);

      const interval = setInterval(() => {
        setWishNum((wishNum) =>
          Number(wishNum) < Number(data?.length - 1) ? wishNum + 1 : wishNum
        );

        if (Number(wishNum) === Number(data?.length)) clearInterval(interval);
      }, 4000);
    }

    var audio = new Audio("/sounds/firefly.mp3");
    audio.play();
  }, [data, wishNum]);

  if (error)
    return (
      <Container>
        <div
          className="h-screen py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>failed to load</div>
        </div>
      </Container>
    );
  if (isLoading)
    return (
      <Container>
        <div
          className="h-screen py-4 px-6 flex flex-col items-center justify-center text-white"
          style={{ backgroundColor: "#10114C" }}
        >
          <div>loading...</div>
        </div>
      </Container>
    );

  return (
    <>
      <audio autoPlay loop>
        <source src="/assets/sounds/firefly.mp3" type="audio/mpeg" />
      </audio>

      <Container overflow={true}>
        {toToast.length > 0 ? (
          <ul className="fireflies">
            {toToast.map((_: any, idx: number) => (
              <li key={idx}></li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
        <div
          className="min-h-screen text-white"
          style={{
            backgroundColor: "#10114C",
            // backgroundImage: "url('/assets/background.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative">
            <div className="flex justify-end pr-5 py-2 absolute right-0 top-0">
              <label
                htmlFor="default-toggle"
                className="inline-flex relative items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  id="default-toggle"
                  className="sr-only peer"
                  onChange={() => navigate("/wishes")}
                  checked={true}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <section className="px-6 py-12">
              <div>
                {toToast.length > 0 && (
                  <>
                    {toToast
                      .filter((singleWish: any) => singleWish.from)
                      .map((wish: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-purple-700 py-4 px-6 rounded-md mb-3 text-lg notification-card"
                        >
                          <h4>{`Wish at ${moment(wish?.createdAt).format(
                            "LT"
                          )} on ${moment(wish?.createdAt)
                            .subtract(10, "days")
                            .calendar()} ${
                            wish?.from?.fullAdress
                              ? "from " + wish?.from?.fullAdress
                              : "to " + wish?.to?.fullAdress
                          }`}</h4>
                        </div>
                      ))}

                    {toToast
                      .filter((singleWish: any) => singleWish.to)
                      .map((wish: any, idx: number) => (
                        <div
                          key={idx}
                          className="bg-purple-700 py-4 px-6 rounded-md mb-3 text-lg notification-card"
                        >
                          <h4>{`Wish at ${moment(wish?.createdAt).format(
                            "LT"
                          )} on ${moment(wish?.createdAt)
                            .subtract(10, "days")
                            .calendar()} ${
                            wish?.to?.fullAdress
                              ? "to " + wish?.to?.fullAdress
                              : "from " + wish?.to?.fullAdress
                          }`}</h4>
                        </div>
                      ))}
                  </>
                )}
              </div>

              {/* <div
                className="flex gap-2 justify-center absolute bottom-3 mt-8"
                style={{ width: "88%" }}
              >
                <div className="h-2 w-2 bg-white rounded-full"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full"></div>
              </div>*/}
            </section>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Screen;
