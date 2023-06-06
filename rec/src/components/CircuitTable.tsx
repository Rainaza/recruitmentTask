import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Circuit } from "../types/types";
import { useQuery, useQueryClient } from "react-query";

interface Props {
  setCurrentSeasson: React.Dispatch<React.SetStateAction<string>>;
  currentSeasson: string;
  currentCircuit: number;
  circuits: Circuit[];
  setCurrentCircuit: React.Dispatch<React.SetStateAction<number>>;
}
const myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "7fd027b3d39eb1d5855247ecb4cdf646");
myHeaders.append("x-rapidapi-host", "https://v1.formula-1.api-sports.io/");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow" as RequestRedirect,
};

export const CircuitTable = ({
  setCurrentSeasson,
  currentSeasson,
  currentCircuit,
  circuits,
}: Props) => {
  const queryClient = useQueryClient();
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setCurrentSeasson(e.target.value);
    queryClient.invalidateQueries(`races${e.target.value}`);
    queryClient.invalidateQueries(
      `driver${circuits[currentCircuit].lap_record.driver}`
    );
  };

  async function fetchRaces() {
    const res = await fetch(
      `https://v1.formula-1.api-sports.io/races?competition=${circuits[currentCircuit].competition.id}&season=${currentSeasson}`,
      requestOptions
    );
    return res.json();
  }
  async function fetchDriver() {
    const res = await fetch(
      `https://v1.formula-1.api-sports.io/drivers?search=${circuits[currentCircuit].lap_record.driver}`,
      requestOptions
    );
    return res.json();
  }

  const { data: driver } = useQuery(
    `driver${circuits[currentCircuit].lap_record.driver}`,
    fetchDriver,
    {
      staleTime: Infinity,
    }
  );

  const { data: races } = useQuery(`races${currentSeasson}`, fetchRaces, {
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-col py-2 gap-4">
      <div className="flex w-[200px] lg:w-[300px] justify-start items-center">
        <div className="w-1/2">
          <p className="font-semibold text-base  lg:text-2xl">Select year:</p>
        </div>
        <div className="w-1/2">
          <FormControl>
            <Select
              onChange={(e) => handleSelectChange(e)}
              value={currentSeasson}
            >
              <MenuItem value={"2016"}>2016</MenuItem>
              <MenuItem value={"2017"}>2017</MenuItem>
              <MenuItem value={"2018"}>2018</MenuItem>
              <MenuItem value={"2019"}>2019</MenuItem>
              <MenuItem value={"2020"}>2020</MenuItem>
              <MenuItem value={"2021"}>2021</MenuItem>
              <MenuItem value={"2022"}>2022</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex w-full gap-1  ">
        <div className="bg-[#ededed] w-1/2 px-2 py-2 border-2">
          <div className="flex flex-col gap-4 lg:px-16  py-2 text-xs justify-center h-full md:text-base lg:text-lg lg:font-bold">
            {races?.response?.length === 0 ? (
              <div className="font-bold text-center ">
                <p>Brak danych w API</p>
              </div>
            ) : (
              <>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">Season</p>
                  <p className="truncate">{races?.response[0]?.season}</p>
                </div>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">Status</p>
                  <p className="truncate">{races?.response[0]?.status}</p>
                </div>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">Type:</p>
                  <p className="truncate">{races?.response[0]?.type}</p>
                </div>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">Name: </p>
                  <p className="truncate">{races?.response[0]?.circuit.name}</p>
                </div>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">Date: </p>
                  <p className="truncate">
                    {races?.response[0]?.date.slice(0, 10)}
                  </p>
                </div>
                <div className="flex justify-evenly md:justify-center md:gap-6">
                  <p className="font-semibold">City: </p>
                  <p className="truncate">
                    {races?.response[0]?.competition?.location?.city}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-[#ededed] w-1/2 px-2 py-2 border-2 flex justify-center">
          <div className="flex flex-col justify-center w-full text-xs  items-center md:text-base gap-2 lg:text-lg ">
            {driver?.response?.length === 0 ? (
              <div className=" font-bold ">
                <p>Brak danych w API</p>
              </div>
            ) : (
              <>
                <img
                  className="border-2 border-black"
                  width={100}
                  height={100}
                  src={driver?.response[0]?.image}
                  alt="driverImage"
                />
                <p>
                  Name:{" "} 
                  <span className="font-bold truncate  ">{ driver?.response[0]?.name}</span>
                </p>
                <p>
                  Abbr:{" "}
                  <span className="font-bold">
                    {" "}
                    {driver?.response[0]?.abbr}
                  </span>
                </p>
                <p>
                  Nationality:{" "}
                  <span className="font-bold">
                    {driver?.response[0]?.nationality}
                  </span>
                </p>
                <p>
                  Podiums:{" "}
                  <span className="font-bold">
                    {driver?.response[0]?.podiums}
                  </span>
                </p>
                <p>
                  Carrer points:{" "}
                  <span className="font-bold">
                    {driver?.response[0]?.career_points}
                  </span>
                </p>
                <p>
                  Lap record:{" "}
                  <span className="font-bold">
                    {circuits[currentCircuit]?.lap_record.time}
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
