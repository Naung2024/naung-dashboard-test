import {
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

import { EmptyDispenserEvent } from '../data/EmptyDispenserEvent';
import React, { useState } from "react";

export default function EmptyDispenserEventChart() {
  const [open, setOpen] = useState(false); // control dropdown open
  const toggleDropdown = () => setOpen(!open);

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>EMPTY DISPENSER EVENT</h2>
      <div style={{ height: 330 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={EmptyDispenserEvent} margin={{ top: 20, right: 10, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "#5a69a9", fontSize: 10 }} 
              axisLine={false} 
              tickLine={false} 
            />
            <YAxis
              stroke="#dce2ef"
              domain={[0, 60]}
              ticks={[0, 20, 40, 60]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => `${Math.round(v * 100)}%`}
              contentStyle={{ borderRadius: 8 }}
            />
            <Bar dataKey="empty" fill="#dce2ef" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Dropdown Wrapper */}
      <div style={styles.selectContainer}>
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
    textAlign: "center"
  },

  selectContainer: {
    position: "relative",
    width: "80%",
  },
  selectBox: {
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
    bottom: "20px", 
    left: 0,
    width: "80%",
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
