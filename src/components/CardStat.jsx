import React from "react";

const CardStat = ({ title, value, color = "bg-white" }) => {
  return (
    <div
      className={`p-4 rounded-xl shadow hover:bg-main-body/10 hover:shadow-lg cursor-pointer border-1 border-black/40 ${color}`}
    >
      <h3 className="text-lg font-medium text-main-font/80 ">{title}</h3>
      <p className="text-2xl font-bold text-primary-body mt-1">{value}</p>
    </div>
  );
};

export default CardStat;
