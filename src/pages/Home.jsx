/*
Required npm packages for this file:

npm i react react-dom tailwindcss framer-motion recharts react-icons classnames
*/

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FiSearch } from "react-icons/fi";

// -----------------------------
// Sample data
// -----------------------------
const lineData = [
  { name: "Jan", uv: 400 },
  { name: "Feb", uv: 520 },
  { name: "Mar", uv: 610 },
  { name: "Apr", uv: 720 },
  { name: "May", uv: 680 },
  { name: "Jun", uv: 820 },
];

const pieData = [
  { name: "Product A", value: 45 },
  { name: "Product B", value: 25 },
  { name: "Product C", value: 30 },
];

const createTableData = (count = 200) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Project ${i + 1}`,
    owner: ["Alice", "Bob", "Maya", "Ravi"][i % 4],
    progress: Math.floor(Math.random() * 90) + 10,
    status: ["active", "paused", "completed"][i % 3],
  }));
};

const TABLE_DATA = createTableData(200);

const QUOTES = [
  {
    id: 1,
    text: "Good design is obvious. Great design is transparent.",
    author: "Joe Sparano",
  },
  { id: 2, text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { id: 3, text: "Done is better than perfect.", author: "Sheryl Sandberg" },
];

const IMAGES = [
  "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200&q=80&auto=format&fit=crop",
];

const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#10B981"];

// -----------------------------
// UI Components
// -----------------------------
const FloatingBackground = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute -top-40 -left-20 w-[70rem] h-[70rem] rounded-full bg-gradient-to-tr from-indigo-600/20 via-pink-400/10 to-amber-200/10 blur-3xl filter"
    />
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      className="absolute -bottom-60 -right-20 w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-sky-400/10 to-green-300/10 blur-2xl"
    />
  </div>
);

const Hero = () => (
  <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1">
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.06 }}
          className="text-4xl sm:text-5xl font-extrabold leading-tight"
        >
          Product HQ Dashboard
        </motion.h1>
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="mt-4 text-slate-600 max-w-2xl"
        >
          Scalable, reusable components with resilient edge-case handling.
        </motion.p>
        <div className="mt-6 flex items-center gap-3">
          <motion.button whileHover={{ scale: 1.02 }} className="bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg">
            Get Started
          </motion.button>
          <motion.button whileHover={{ scale: 1.02 }} className="border px-4 py-2 rounded-2xl">
            Learn More
          </motion.button>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img src={IMAGES[0]} alt="hero" loading="lazy" className="w-full h-64 object-cover" />
        </div>
      </div>
    </div>
  </section>
);

const StatCard = ({ title, value, subtitle, icon }) => (
  <motion.div whileHover={{ y: -6 }} className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow">
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && <div className="text-xs text-slate-400">{subtitle}</div>}
      </div>
      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  </motion.div>
);

const ChartsPanel = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow min-h-[220px]">
      <h3 className="text-sm font-semibold mb-2">Monthly Active Users</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={lineData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#4F46E5" strokeWidth={3} dot={false} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow">
      <h3 className="text-sm font-semibold mb-2">Product Mix</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={40} outerRadius={70} paddingAngle={2} isAnimationActive={false}>
            {pieData.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const DataTable = ({ data = TABLE_DATA }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow mt-6 overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">Active Projects</h4>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input className="pl-10 pr-3 py-2 rounded-xl border" placeholder="Search projects" />
            <span className="absolute left-3 top-2 text-slate-400"><FiSearch /></span>
          </div>
          <button className="px-3 py-2 border rounded-xl">Filters</button>
        </div>
      </div>
      <table className="min-w-full table-auto text-left">
        <thead>
          <tr className="text-xs text-slate-500 border-b">
            <th className="py-2 px-2">#</th>
            <th className="py-2 px-2">Name</th>
            <th className="py-2 px-2">Owner</th>
            <th className="py-2 px-2">Progress</th>
            <th className="py-2 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id} className="hover:bg-white/40 transition-colors">
              <td className="py-3 px-2">{row.id}</td>
              <td className="py-3 px-2 font-medium">{row.name}</td>
              <td className="py-3 px-2">{row.owner}</td>
              <td className="py-3 px-2">
                <div className="w-44 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="h-2 rounded-full" style={{ width: `${row.progress}%`, background: "linear-gradient(90deg,#4F46E5,#06B6D4)" }} />
                </div>
              </td>
              <td className="py-3 px-2 capitalize">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end items-center gap-2 mt-3 text-sm">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

const QuotesCarousel = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur p-6 rounded-2xl shadow mt-6">
      <h4 className="font-semibold mb-3">Wisdom & Quotes</h4>
      <div className="min-h-[80px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-slate-700 italic"
          >
            “{QUOTES[index].text}” — <span className="font-semibold not-italic">{QUOTES[index].author}</span>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ImageGallery = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
    {IMAGES.map((src, i) => (
      <motion.div key={src} whileHover={{ scale: 1.03 }} className="rounded-xl overflow-hidden shadow">
        <img src={src} alt={`gallery-${i}`} loading="lazy" className="w-full h-36 object-cover" />
      </motion.div>
    ))}
  </div>
);

// -----------------------------
// Main Component
// -----------------------------
export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 transition-colors">
      <FloatingBackground />
      <main className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <Hero />
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard title="Revenue" value="$1.2M" subtitle="+12% MoM" icon="💸" />
              <StatCard title="Active Users" value="24.3k" subtitle="+8% MoM" icon="👥" />
              <StatCard title="Bugs" value="24" subtitle="Critical: 2" icon="🐛" />
            </div>
            <div className="mt-6">
              <ChartsPanel />
            </div>
            <DataTable />
          </div>
          <aside className="space-y-4">
            <QuotesCarousel />
            <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <button className="w-full py-2 rounded-xl border">Create Project</button>
                <button className="w-full py-2 rounded-xl border">Invite Team</button>
                <button className="w-full py-2 rounded-xl border">Export Report</button>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur p-4 rounded-2xl shadow">
              <h4 className="font-semibold">Gallery</h4>
              <ImageGallery />
            </div>
          </aside>
        </section>
        <footer className="mt-12 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} Product HQ — Built with care
        </footer>
      </main>
    </div>
  );
}
