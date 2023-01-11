import { Container } from "components/partials/Container";
import { useEffect, useState } from "react";
// @ts-ignore
import ReactCurvedText from "react-curved-text";
import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();
  const [progressVal, setProgressVal] = useState(10);

  useEffect(() => {
    if (progressVal === 100) return navigate("/wish");

    const interval = setInterval(() => {
      setProgressVal((intv) => intv + 1);
    }, 10);
    return () => clearInterval(interval);
  });

  return (
    <Container>
      <div
        className="h-full py-4 px-6 flex flex-col items-center justify-center"
        style={{ backgroundColor: "#10114C" }}
      >
        <div className="text-white font-black text-center -mt-20">
          <ReactCurvedText
            width={350}
            height={300}
            cx={190}
            cy={140}
            rx={100}
            ry={100}
            startOffset="90"
            reversed={true}
            text="Think"
            textProps={{
              style: {
                fontSize: "45",
                fontWeight: "bold",
              },
            }}
            textPathProps={{ fill: "#fff" }}
            tspanProps={null}
            ellipseProps={null}
            svgProps={null}
          />
          <h1 className="text-8xl -mt-48">Peace</h1>
        </div>

        <progress
          className="progress progress-primary w-56 mt-4"
          value={progressVal}
          max="100"
        ></progress>
        {/* © All rights reserved */}
        <p className="text-white text-sm mt-48">{`Think Peace © All rights reserved ${new Date().getFullYear()}`}</p>
      </div>
    </Container>
  );
};
