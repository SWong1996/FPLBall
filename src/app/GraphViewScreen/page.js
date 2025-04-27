import Scatter from "../components/Charts/Scatter";
import Bar from "../components/Charts/Bar";
import FetchPlayers from "../components/FetchPlayers";
import "./graphs.css";

export default async function GraphViewScreen() {
  const playersData = await FetchPlayers();
  return (
    <main className="graph-page-container">
      <h1>Graphs</h1>
      <p>Here are some graphs to help you choose the best player for certain metrics.</p>
      <Scatter className="scatter-container" playersData={playersData} />
      <Bar className="bar-container" playersData={playersData} />
    </main>
  );
} 
