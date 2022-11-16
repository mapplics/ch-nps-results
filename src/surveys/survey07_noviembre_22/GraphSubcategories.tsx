import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { GraphProps } from "./Interfaces";

interface CategoryI {
    category: string;
    neutral: number;
    promotor: number;
    detractor: number;
    total: number;
    subcategories: SubcategoryI[];
};

interface SubcategoryI {
    subcategory: string;
    neutral: number;
    promotor: number;
    detractor: number;
    total: number;
};

const GraphSubcategories = (props: GraphProps) => {
    const categories: CategoryI[] = [];

    props.answers.forEach((e) => {
        let category = categories.find((x) => x.category === e.category);

        if (!category) {
            category = {
                category: e.category,
                neutral: 0,
                promotor: 0,
                detractor: 0,
                total: 0,
                subcategories: [],
            };
            categories.push(category);
        }

        if (e.score === 9 || e.score === 10) category.promotor++;
        else if (e.score === 7 || e.score === 8) category.neutral++;
        else category.detractor++;

        category.total++;

        e.subcategories.forEach((s) => {
            let subcategory = category!.subcategories.find((x) => x.subcategory === s);

            if (!subcategory) {
                subcategory = {
                    subcategory: s,
                    neutral: 0,
                    promotor: 0,
                    detractor: 0,
                    total: 0,
                };
                category!.subcategories.push(subcategory);
            }

            if (e.score === 9 || e.score === 10) subcategory.promotor++;
            else if (e.score === 7 || e.score === 8) subcategory.neutral++;
            else subcategory.detractor++;

            subcategory.total++;
        });

        category!.subcategories.sort((a, b) => b.total - a.total);
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
        <div className="my-6 grid grid-cols-6 gap-x-6 gap-y-12">
            {categories.filter(c => c.subcategories.length > 0).map((c) => (
                <div className="col-span-2 flex flex-col justify-between" key={c.category}>
                    <p className="text-md font-medium px-2 py-2 col-span-12">
                        {c.category}
                    </p>
                    <div className="h-96" >
                    <ResponsiveContainer className="text-sm">
                        <BarChart data={c.subcategories} layout="vertical">
                            <Tooltip content={<CustomTooltip />} />

                            <Bar dataKey="promotor" stackId="a" fill="#15803c" />
                            <Bar dataKey="detractor" stackId="a" fill="#b91c1c" />
                            <Bar dataKey="neutral" stackId="a" fill="#ea5a0c" />

                            <YAxis
                                type="category"
                                dataKey="subcategory"
                                width={400}
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
                                dataKey="total"
                                domain={[0, Math.round((c.subcategories[0].total * 10) / 7)]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>
            ))}

        </div>
    );
};

export default GraphSubcategories;
