import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";
import { washroomUsageData } from "../data/washroomUsage";

import React, { useState, useEffect, useRef } from "react";

export default function WashroomUsageChart() {
  const [open, setOpen] = useState(false);
  const toggleDropdown = () => setOpen(!open);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false); 
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selected, setSelected] = useState({
    men: true,
    women: false,
  });

  const handleCheckboxChange = (type) => {
    setSelected((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>WASHROOM USAGE FREQUENCY</h2>
      <div style={{ height: 330 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={washroomUsageData}
            margin={{ top: 20, right: 10, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#e0e0e0" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#5a69a9" }}
              fontSize={10}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#dce2ef"
              fontSize={10}
              domain={[0, 50]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tickFormatter={(value) => `${value}`}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip contentStyle={{ borderRadius: 8 }} />
            {selected.men && (
              <Bar dataKey="men" fill="#dce2ef" name="Porta bagno uomini" />
            )}
            {selected.women && (
              <Bar dataKey="women" fill="#5a69a9" name="Porta bagno donne primo piano" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dropdown Wrapper */}
      <div style={styles.selectContainer} ref={dropdownRef}>
        {open && (
          <div style={styles.dropdown}>
            <label
              style={{
                ...styles.label,
                ...(selected.men ? styles.hoveredLabel : {}),
              }}
            >
              <input
                type="checkbox"
                checked={selected.men}
                onChange={() => handleCheckboxChange("men")}
                style={styles.checkbox}
              />
              Porta bagno uomini
            </label>
            <label
              style={{
                ...styles.label,
                ...styles.lableMb,
                ...(selected.women ? styles.hoveredLabel : {}),
              }}
              className="lable-mb-0"
            >
              <input
                type="checkbox"
                checked={selected.women}
                onChange={() => handleCheckboxChange("women")}
                style={styles.checkbox}
              />
              Porta bagno donne primo piano
            </label>
          </div>
        )}
        <div style={styles.selectBox} onClick={toggleDropdown}>
          Select one or more sensor
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#ffffff",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5a69a9",
    marginBottom: "8px",
    textAlign: "center",
  },
  selectContainer: {
    position: "relative",
    width: "80%",
  },
  selectBox: {
    width: "80%",
    marginTop: "20px",
    padding: "20px 10px",
    fontSize: "16px",
    fontWeight: "600",
    border: "3px solid #dce2ef",
    borderRadius: "5px",
    color: "#5a69a9",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' height='48' viewBox='0 0 24 24' width='48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "30px 30px",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    left: 0,
    width: "90%",
    padding: "10px",
    borderRadius: "2px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    fontSize: "16px",
    zIndex: 10,
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#333",
    fontSize: "16px",
    padding: "6px 10px",
    boxSizing: "border-box",
    borderRadius: "4px",
  },
  hoveredLabel: {
    backgroundColor: "#c1cce3",
    color: "#5a69a9",
  },
  lableMb: {
    marginBottom: "0",
  },
  checkbox: {
    marginRight: "20px",
    transform: "scale(1.2)",
  },
};
