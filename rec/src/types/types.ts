export interface Circuit {
  capacity: number;
  competition: {
    id: number;
    location: {
      city: string;
      country: string;
    };
    name: string;
  };
  first_grand_prix: number;
  id: number;
  image: string;
  lap_record: {
    driver: string;
    time: string;
    year: string;
  };
  laps: number;
  length: string;
  name: string;
  opened: number;
  owner: string | null;
  race_distance: string;
}



export interface Races {
  id: number;
  date: string;
  next: number;
  last: number;
  competition: {
    id: number;
    name: string;
    location: {
      country: string;
      city: string;
    };
  };
  circuit: {
    id: number;
    image: string;
    name: string;
  };
  season: number;
  type:
    | "Race"
    | "Sprint"
    | "1st Qualifying"
    | "2nd Qualifying"
    | "3rd Qualifying"
    | "1st Practice"
    | "2nd Practice"
    | "3rd Practice";
  timezone: string;
  status: "Live" | "Completed" | "Cancelled" | "Postponed" | "Scheduled";
  distance: string;
  fastest_lap: {
    driver: {
      id: number;
    };
    time: string;
  };
  laps: {
    current: null | number;
    total: number;
  };
}
