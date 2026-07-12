import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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
    
    // console.log(revenue)

    return (
        <div className="h-80 w-full py-5 --sef-bg-primary rounded-2xl shadow-lg p-6 border border-[var(--sef-gold-border)]">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-sm font-thin uppercase tracking-[0.35em] sef-text-primary">Revenue Overview</h2>
                    <p className="text-sm sef-text-secondary">Last 7 Days</p>
                </div>
                <div className="text-right">
                    <p className="text-xs sef-text-secondary">Total</p>
                    <p className="text-xl font-bold text-[var(--sef-gold-500)]">
                        ${chartData.reduce(
                            (sum, item) => sum + item.revenue,
                            0
                        )}
                    </p>
                </div>
            </div>
            <AreaChart
                style={{ width: '100%', maxWidth: '95%', height: '80%', maxHeight: '60vh', margin: 'auto', marginBottom: 20, aspectRatio: 1.618 }}
                responsive
                data={chartData}
            >
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--sef-gold-400)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--sef-gold-100)" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sef-gold-border)" />
                <XAxis
                    dataKey="_id"
                    interval={0}
                    tickFormatter={(value) =>
                        new Date(value).toLocaleDateString(
                            "en-GB",
                            {
                                day: "numeric",
                                month: "short"
                            }
                        )
                    }
                    padding={{ right: 25 }}
                    stroke="var(--sef-gold-600)"
                />
                <YAxis width="auto" stroke="var(--sef-gold-600)"
                    tickFormatter={(value) =>
                        value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
                    }
                />
                <Tooltip
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    cursor={{
                        stroke: 'var(--sef-gold-ring)',
                    }}
                    labelStyle={{
                        color: "var(--sef-gold-500)"
                    }}
                    itemStyle={{
                        color: "var(--sef-gold-500)"
                    }}
                    contentStyle={{
                        border: "1px solid var(--sef-gold-border)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,.12)",
                        background: "var(--sef-gold-50)"
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
                {/* For lineChart */}
                {/* <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--sef-gold-500)"
                    dot={{
                        fill: 'var(--sef-gold-ring)',
                    }}
                    activeDot={{ r: 8, stroke: 'var(--sef-gold-ring)' }}
                /> */}
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--sef-gold-500)"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
            </AreaChart>
        </div>
    )
}

export default RevenueChart