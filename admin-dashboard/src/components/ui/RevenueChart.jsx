import React from "react";
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const RevenueChart = React.memo(({ revenue }) => {
  if (!revenue || revenue.length === 0) {
    return (
      <div className="h-80 w-full py-5 bg-card rounded-2xl shadow-lg p-6 border border-card-line">
        <div className="flex justify-center items-center h-full">
          <p className="text-ink-soft">No revenue data available.</p>
        </div>
      </div>
    );
  }

  const chartData = revenue;

  return (
    <div className="h-80 w-full py-5 bg-card rounded-2xl shadow-lg p-6 border border-card-line">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-sm uppercase tracking-[0.35em] text-gold">
            Revenue Overview
          </h2>
          <p className="mt-2 text-xl font-medium text-ink">Last 7 Days</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-soft">Total</p>
          <p className="text-xl font-bold text-gold">
            ${chartData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
          </p>
        </div>
      </div>
      <AreaChart
        style={{
          width: "100%",
          maxWidth: "95%",
          height: "80%",
          maxHeight: "60vh",
          margin: "auto",
          marginBottom: 20,
          aspectRatio: 1.618,
        }}
        responsive
        data={chartData}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--sef-gold-primary)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--sef-gold-light)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--sef-divider)" />
        <XAxis
          dataKey="_id"
          interval={0}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
            })
          }
          padding={{ right: 25 }}
          stroke="var(--sef-text-secondary)"
        />
        <YAxis
          width="auto"
          stroke="var(--sef-text-secondary)"
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
          }
        />
        <Tooltip
          cursor={{
            stroke: "var(--sef-gold-primary)",
          }}
          labelStyle={{
            color: "var(--sef-text-primary)",
          }}
          itemStyle={{
            color: "var(--sef-gold-dark)",
          }}
          contentStyle={{
            border: "1px solid var(--sef-card-border)",
            borderRadius: "12px",
            boxShadow: "var(--sef-card-hover-shadow)",
            background: "var(--sef-card-bg)",
          }}
          labelFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          }
          formatter={(value) => [
            `$${Number(value).toLocaleString()}`,
            "Revenue",
          ]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="var(--sef-gold-primary)"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </div>
  );
});

export default RevenueChart;
