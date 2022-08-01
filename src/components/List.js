import { ApplicationContext } from "../App";
import { useContext, useState } from "react";

function List() {
  const { list, setList } = useContext(ApplicationContext);
  const [searchTitle, setSearchTitle] = useState("");
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => setSearchTitle(e.target.value)}/>
      <th>
        <td>Name</td>
        <td>Distance</td>
      </th>
      {list &&
        list
          .sort((a, b) => a.dist - b.dist)
          .filter((value)=> {
            if (searchTitle === "") {
              return value;
            }
            else if (
              value.name.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          })
          .map((element, index) => {
            return (
              <div id={index}>
                <table>
                  <tr>
                    <td>{element.name}</td>
                    <td>{element.dist.toFixed(2)} km</td>
                  </tr>
                </table>
              </div>
            );
          })}
    </div>
  );
}

export default List;
