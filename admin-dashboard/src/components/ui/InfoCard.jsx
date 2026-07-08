import React from "react";

function InfoCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="relative rounded-3xl bg-white p-5 shadow-md overflow-hidden transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl">
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`}
      />
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-sm font-normal">{title}</h5>
          <h2 className="text-3xl font-bold">{value}</h2>
        </div>
        <div
          className={`flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br ${color} text-white text-2xl shadow-lg transition-transform duration-300 ease-out hover:scale-110 hover:rotate-6`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-3 text-sm font-light text-gray-400">{subtitle}</p>
      <hr className="mt-4 border-slate-100" />
    </div>
  );
}

export default InfoCard;
