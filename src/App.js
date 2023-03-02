import React, { useState, useEffect } from "react";
import { SideBar } from "./components/SideBar";
import { ChartBar } from "./components/Chart";
import { getCoins } from "./utils/getCoins";

function App() {
  const [coins, setCoins] = useState([]);

  const getAllCoins = async () => {
    try {
      const response = await getCoins();

      setCoins(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCoins();
  }, []);

  return (
    <div className="App">
      <SideBar />
      <ChartBar coins={coins} />
    </div>
  );
}

export default App;
