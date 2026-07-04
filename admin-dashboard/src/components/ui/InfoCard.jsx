import React from "react";

function InfoCard({title, value, subtitle, icon,color}) {
  return (
    
      <div className={`rounded-lg bg-white p-4 shadow-md flex flex-col gap-2 justify-between border border-t-4 ${color}`}>
        <div className="flex justify-between items-center">
            <h5 className="text-sm font-normal">{title}</h5>
            <div className="text-lg ">{icon}</div>
        </div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-sm font-light text-gray-500">{subtitle}</p>
      </div>
    
  );
}

export default InfoCard;