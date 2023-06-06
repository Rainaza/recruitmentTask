import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { Circuit } from "../types/types";

interface Props {
  currentCircuit: number;
  setCurrentCircuit: React.Dispatch<React.SetStateAction<number>>;
  circuits: Circuit[];
}

export const Circut = ({
  currentCircuit,
  setCurrentCircuit,
  circuits,
}: Props) => {
  const handleBack = () => {
    if (currentCircuit > 0 && currentCircuit <= circuits.length) {
      setCurrentCircuit(currentCircuit - 1);
    }
  };
  const handleForward = () => {
    if (currentCircuit < circuits.length - 1) {
      setCurrentCircuit(currentCircuit + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-center py-8">
        <img
          className="object-fit h-60 w-120 py-3 "
          src={circuits[currentCircuit]?.image}
          alt="circuitImage"
        />
      </div>
      <div className="flex justify-between text-center text-sm pt-4 font-semibold md:text-base lg:text-2xl lg:py-4 ">
        <button
          className={`flex items-center gap-2 ${
            currentCircuit !== 0 ? "opacity-100" : "opacity-60"
          }`}
          onClick={handleBack}
        >
          <TiArrowLeftOutline />
          PREV
        </button>

        <p>{circuits[currentCircuit].name}</p>

        <button
          className={`flex items-center gap-2 ${
            currentCircuit !== circuits.length - 1
              ? "opacity-100"
              : "opacity-60"
          }`}
          onClick={handleForward}
        >
          NEXT
          <TiArrowRightOutline />
        </button>
      </div>
    </div>
  );
};
