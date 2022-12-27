import { Link } from "react-router-dom";
import Card from "../../UI/Card";

import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useState } from "react";
import ItemList from "./ItemList";
import AddMissionForm from "../mission/AddMissionForm";
import AddItemForm from "./AddItemForm";

const sampleItems = [
  { id: 125123, title: "왕자님 만나기" },
  { id: 12512233, title: "서두르는척 유리구두 떨어트리기" },
  { id: 123415, title: "열두시에 집오기" },
];

const PointMall = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [onAddItem, setOnAddItem] = useState(false);

  const [loadedItems, setLoadedItems] = useState(sampleItems);

  const onModifyHandler = (modifiedTitle, targetId) => {
    setLoadedItems(
      loadedItems.map((mission) =>
        mission.id === targetId ? { ...mission, title: modifiedTitle } : mission
      )
    );
  };

  const onAddItemHandler = () => {
    setOnAddItem((prev) => !prev);
  };

  return (
    <>
      <Card>
        {isLoggedIn && (
          <>
            <section>
              <ul>
                {loadedItems.map((mission) => (
                  <ItemList
                    key={mission.id}
                    id={mission.id}
                    title={mission.title}
                    onModify={onModifyHandler}
                  />
                ))}
              </ul>
              <Card onClick={onAddItemHandler}>
                <p>
                  선물추가하기 <AiOutlinePlusCircle />
                </p>
              </Card>
            </section>
          </>
        )}
      </Card>
      {onAddItem && <AddItemForm onformClose={onAddItemHandler} />}
    </>
  );
};
export default PointMall;
