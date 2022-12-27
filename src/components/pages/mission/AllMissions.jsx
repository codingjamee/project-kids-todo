import { useEffect, useState } from "react";

const AllMissions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedMissions, setLoadedMissions] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://kids-todo-9fa26-default-rtdb.firebaseio.com/todo-list.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const missions = [];

        for (const key in data) {
          const mission = {
            id: key,
            ...data[key],
          };
          missions.push(mission);
        }

        setIsLoading(false);
        setLoadedMissions(missions);
      });
  }, []);
};

export default AllMissions;
