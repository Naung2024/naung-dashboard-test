import BinWasteLevelChart from '@/components/BinWasteLevelChart';
import FullEmptyDispenserChart from "@/components/FullEmptyDispenserChart";
import WashroomUsageChart from "@/components/WashroomUsageChart";

import PaperDispenserLevelChart from "@/components/PaperDispenserLevelChart";
import PaperConsumptionChart from "@/components/PaperConsumptionChart";
import EmptyDispenserEventChart from "@/components/EmptyDispenserEventChart";


export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        <BinWasteLevelChart />
        <FullEmptyDispenserChart />
        <WashroomUsageChart />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        <PaperDispenserLevelChart />
        <PaperConsumptionChart />
        <EmptyDispenserEventChart />
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#f5faff",
    minHeight: "100vh",
    fontFamily: "san-serif"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "32px",
  },
};
