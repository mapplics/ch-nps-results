import {
    Bar,
    BarChart,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { GraphProps } from "./Interfaces";

interface CategoryI {
    category: string;
    promotor: number;
    detractor: number;
    neutral: number;
    total: number;
};

const GraphAnswer2 = (props: GraphProps) => {
    const categories: CategoryI[] = [];

    props.answers.forEach((e) => {
        let category = categories.find((x) => x.category === e.category);

        if (!category) {
            category = {
                category: e.category,
                promotor: 0,
                detractor: 0,
                neutral: 0,
                total: 0,
            };
            categories.push(category);
        }

        if (e.score === 9 || e.score === 10) category.promotor++;
        else if (e.score === 7 || e.score === 8) category.neutral++;
        else category.detractor++;
        category.total++;
    });

    categories.sort((a, b) => b.total - a.total);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const category: CategoryI = payload[0].payload;

            return (
                <div className="bg-gray-200 opacity-90 rounded-lg shadow-sm px-4 py-2">
                    <p>{category.category}</p>
                    <p className="mb-2">
                        <strong>{category.total}</strong> - {((category.total * 100) / props.countTotal).toFixed(1)}%
                    </p>
                    {category.promotor > 0 &&
                        <p>
                            Promotes: <strong>{category.promotor}</strong>
                        </p>
                    }
                    {category.detractor > 0 &&
                        <p>
                            Detractores: <strong>{category.detractor}</strong>
                        </p>
                    }
                    {category.neutral > 0 &&
                        <p>
                            Neutrales: <strong>{category.neutral}</strong>
                        </p>
                    }

                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer className="text-sm">
            <BarChart data={categories} layout="vertical">
                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="promotor" stackId="a" fill="#15803c" />
                <Bar dataKey="detractor" stackId="a" fill="#b91c1c" />
                <Bar dataKey="neutral" stackId="a" fill="#ea5a0c" />

                <YAxis
                    type="category"
                    dataKey="category"
                    width={300}
                    interval={0}
                    mirror
                    orientation="right"
                    tick={{
                        fill: "rgba(0, 0, 0)",
                        //stroke: "rgba(0, 0, 0)",
                        //strokeWidth: "2px",
                        //strokeLinecap: "butt",
                        //strokeLinejoin: "miter",
                        fontSize: "0.875rem",
                        // paintOrder:"stroke"
                    }}
                />
                <XAxis
                    type="number"
                    dataKey="count"
                    domain={[0, Math.round((categories[0].total * 10) / 7)]}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default GraphAnswer2;
