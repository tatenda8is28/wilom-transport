import React from "react";
import { Routes, Route } from "react-router-dom";
// Fixed the import path below to point to the current folder
import Sidebar from "./Sidebar"; 
import AdminOverview from "./AdminOverview";
import AdminStock from "./AdminStock";
import AdminLeads from "./AdminLeads";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 ml-72 p-12">
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/stock" element={<AdminStock />} />
          <Route path="/leads" element={<AdminLeads />} />
        </Routes>
      </main>
    </div>
  );
}