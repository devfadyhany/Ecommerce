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

const RevenueChart = ({ revenue }) => {
  // for testing the rechart if revenue in Api less than 2 days
  const mockRevenue = [
    { _id: "2026-07-05", revenue: 900, orders: 2 },
    { _id: "2026-07-06", revenue: 1200, orders: 3 },
    { _id: "2026-07-07", revenue: 1800, orders: 5 },
    { _id: "2026-07-08", revenue: 1500, orders: 4 },
    { _id: "2026-07-09", revenue: 2500, orders: 7 },
    { _id: "2026-07-10", revenue: 2100, orders: 6 },
    { _id: "2026-07-11", revenue: 620, orders: 1 },
  ];

  const chartData = revenue?.length > 1 ? revenue : mockRevenue;

  //   console.log(revenue);

  return (
    <div className="h-80 w-full py-5 bg-card rounded-2xl shadow-lg p-6 border border-card-line">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-sm font-thin uppercase tracking-[0.35em] text-ink">
            Revenue Overview
          </h2>
          <p className="text-sm text-ink-soft">Last 7 Days</p>
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
};

export default RevenueChart;
