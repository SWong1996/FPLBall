import Stats from "../components/Stats/Stats";
import FetchPlayers from "../components/FetchPlayers";
import "./StatsViewScreen.css";

export default async function StatsViewScreen() {
    const playersData = await FetchPlayers();
  return (
    <main className="stats-view-container">
      <Stats playersData={playersData} />
    </main>
  );
}
