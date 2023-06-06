import { Circut } from "./components/Circut";
import { CircuitTable } from "./components/CircuitTable";
import { useQuery } from "react-query";
import { useState } from "react";
import { Circuit } from "./types/types";
function App() {
  const [currentCircuit, setCurrentCircuit] = useState<number>(0);
  const [currentSeasson, setCurrentSeasson] = useState<string>("2022");
  const [circuits, setCircuits] = useState<Circuit[]>([]);

  const myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", "7fd027b3d39eb1d5855247ecb4cdf646");
  myHeaders.append("x-rapidapi-host", "https://v1.formula-1.api-sports.io/");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  async function fetchCircuits() {
    const res = await fetch(
      "https://v1.formula-1.api-sports.io/circuits",
      requestOptions
    );
    return res.json();
  }

  useQuery("circuits", fetchCircuits, {
    onSuccess: (data) => {
      setCircuits(data.response);
    },
    staleTime: Infinity,
  });
  console.log(circuits.length)

  return (
    <main className="container mx-auto">
      <div className="flex flex-col px-4 gap-4 ">
        {circuits.length > 1 ? (
          <>
            <Circut
              currentCircuit={currentCircuit}
              setCurrentCircuit={setCurrentCircuit}
              circuits={circuits}
            />
            <CircuitTable
              setCurrentSeasson={setCurrentSeasson}
              setCurrentCircuit={setCurrentCircuit}
              currentSeasson={currentSeasson}
              currentCircuit={currentCircuit}
              circuits={circuits}
            />
          </>
        ) : (
     
           <p>...Loading</p>
       
        )}
      </div>
    </main>
  );
}

export default App;
