import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Graph = ({ answers, countTotal }) => {
  const totals = {};
  const arr = [];

  answers.forEach((e) => {
    if (totals[e.score]) {
      totals[e.score]++;
    } else {
      totals[e.score] = 1;
    }
  });

  Object.keys(totals).forEach((k) => {
    let color = "";
    if (k === "9" || k === "10") color = "#15803c";
    if (k === "7" || k === "8") color = "#ea5a0c";
    if (k >= 1 && k <= 6) color = "#b91c1c";

    arr.push({ score: k, count: totals[k], color });
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white opacity-90 rounded-lg shadow-sm px-4 py-2">
          <strong>{payload[0].value}</strong> - {((payload[0].value * 100) / countTotal).toFixed(1)}%
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer className="text-sm">
      <BarChart data={arr}>
      <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="count" fill="#8884d8">
          {arr.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={arr[index].color} />
          ))}
        </Bar>

        <XAxis type="category" dataKey="score" interval={0} />
        <YAxis type="number" dataKey="count" orientation="right" />

      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph;
