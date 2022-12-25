import { LocationDetails } from "components/forms/LocationDetails";
import { useNavigate } from "react-router-dom";

export const Location = ({ open = false }) => {
  const navigate = useNavigate();
  const navHandler = () => navigate("/wishes");
  return (
    <>
      <div className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box bg-indigo-900 relative container max-w-md mx-auto">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={navHandler}
          >
            ✕
          </label>
          <div className="py-4">
            <h3 className="text-xl mb-4 font-bold block text-center text-white">
              Thank you!
            </h3>

            <LocationDetails />
          </div>
        </div>
      </div>
    </>
  );
};
