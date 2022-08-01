import { useState } from "react";
import axios from "axios";
export default function Search() {
    const [searched, setsearched] = useState("");

    function submit(e) {
        e.preventDefault();
        console.log(searched);
        let finalData = JSON.stringify(searched);
        console.log(finalData);
        axios
          .post("/search", {searchdata: finalData}, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input type="search" placeholder="Search..." name="searched" onChange={(e)=>setsearched(e.target.value)}/>
        <button type="submit " />
      </form>
    </div>
  );
}
