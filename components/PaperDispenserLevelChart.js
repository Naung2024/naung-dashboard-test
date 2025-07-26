import {
  LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { paperDispenser } from '../data/paperDispenser';

import React, { useState, useEffect, useRef } from "react";

export default function PaperDispenserChart() {
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
    vFold: true,
    jumbo: false,
  });

  const handleCheckboxChange = (type) => {
    setSelected((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>PAPER DISPENSER LEVEL - 1 FLOOR</h2>
      <div style={{ height: 330 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={paperDispenser}
            margin={{ top: 20, right: 10, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke="#e0e0e0" vertical={false} />
             <XAxis
                dataKey="date"
                angle={-60}
                textAnchor="end"
                tick={{ fill: "#5a69a9" }}
                fontSize={10}
                fontWeight={500}
                height={40}
                axisLine={false}
                tickLine={false}
            />
            <YAxis 
                stroke="#dce2ef" 
                fontSize={10} domain={[0, 100]} 
                ticks={[0, 30, 60, 90, 120]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
            />
            <Tooltip contentStyle={{ borderRadius: 8 }} />
            {selected.vFold && (
              <Line  
                dataKey="vFold" 
                stroke="#c1cce3" 
                strokeWidth={3} 
                dot={false} 
              />
            )}
            {selected.jumbo && (
              <Line  
                dataKey="jumbo" 
                stroke="#5a69a9" 
                strokeWidth={3} 
                dot={false} 
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dropdown with Checkboxes */}
      <div style={styles.selectContainer} ref={dropdownRef}>
        {open && (
          <div style={styles.dropdown}>
            <label
              style={{
                ...styles.label,
                ...(selected.vFold ? styles.hoveredLabel : {}),
              }}
            >
              <input
                type="checkbox"
                checked={selected.vFold}
                onChange={() => handleCheckboxChange("vFold")}
                style={styles.checkbox}
              />
              V Fold Towels
            </label>
            <label
              style={{
                ...styles.label,
                ...styles.lableMb,
                ...(selected.jumbo ? styles.hoveredLabel : {}),
              }}
              className="lable-mb-0"
            >
              <input
                type="checkbox"
                checked={selected.jumbo}
                onChange={() => handleCheckboxChange("jumbo")}
                style={styles.checkbox}
              />
              Jumbo Toilet Paper
            </label>
          </div>
        )}
        <div style={styles.selectBox} onClick={toggleDropdown}>
          Select one or more dispenser
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
