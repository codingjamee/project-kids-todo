import { useEffect, useState } from "react";

const AllMissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMissions, setLoadedMissions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/missions/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setIsLoading(false);
        setLoadedMissions(data);
      });
  }, []);
};

export default AllMissions;
