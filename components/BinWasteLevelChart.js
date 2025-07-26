import { 
  LineChart, Line, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';
import { binWasteLevelData } from '../data/binWasteLevel';

import React, { useState, useEffect, useRef } from "react";

export default function BinWasteLevelChart() {

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

  return (
     <div style={styles.card}>
      <h2 style={styles.title}>BIN WASTE LEVEL</h2>
       <ResponsiveContainer width="100%" height={330}>
        <LineChart data={binWasteLevelData}>
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
            ticks={[0, 20, 40, 60, 80, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Line
            dataKey="value"
            stroke="#c1cce3"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Dropdown Wrapper */}
      <div style={styles.selectContainer} ref={dropdownRef}>
        {open && (
          <div style={styles.dropdown}>
            <label style={styles.label}>
              <input type="checkbox" defaultChecked style={styles.checkbox} />
              Porta bagno uomini
            </label>
            <label style={{ ...styles.label, ...styles.lableMb }} className="lable-mb-0">
              <input type="checkbox" style={styles.checkbox} />
              Porta bagno donne primo piano
            </label>
          </div>
        )}
        <div style={styles.selectBox} onClick={toggleDropdown}>
          Select one or more Bin
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
    textAlign: "center"
  },
  
  selectContainer: {
    position: "relative",
    width: "80%",
  },
  selectBox: {
    marginTop: "20px",
    width: "80%",
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
  },
  dropdown: {
    position: "absolute",
    left: 0,
    width: "90%",
    padding: "20px",
    borderRadius: "2px",
    backgroundColor: "#ffffff",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)",
    fontSize: "16px",
    zIndex: 10,
  },
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#333",
    fontSize: "16px",
  },
  lableMb:{
    marginBottom: "0",
    marginTop: "20px"
  },
  checkbox: {
    marginRight: "20px",
    transform: "scale(1.2)", 
  },
};