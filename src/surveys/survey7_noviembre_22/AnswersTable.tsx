import { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import ReactSelect, {
    components,
    ControlProps,
    defaultTheme,
} from "react-select";
import { AnswersTableProps, Nps7Answer } from "./Interfaces";

const AnswersTable = (props: AnswersTableProps) => {
    const [answersFiltered, setAnswersFiltered] = useState<Nps7Answer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [direction, setDirection] = useState<string>("ASC");

    useEffect(() => {
        setAnswersFiltered(props.answers);
    }, []);

    const search = (str: string) => {
        setSearchTerm(str);
        setAnswersFiltered(
            props.answers.filter(
                (e) => e.answer.toLowerCase().indexOf(str.toLowerCase()) !== -1,
            ),
        );
    };

    const sort = () => {
        setAnswersFiltered(
            answersFiltered.sort((a, b) => {
                if (direction === "DATE") {
                    return a.createdAt.localeCompare(b.createdAt);
                }

                if (a.score! < b.score!) {
                    return direction === "ASC" ? -1 : 1;
                }
                if (a.score! > b.score!) {
                    return direction === "ASC" ? 1 : -1;
                }
                return 0;
            }),
        );

        setDirection(
            direction === "ASC" ? "DESC" : direction === "DESC" ? "DATE" : "ASC",
        );
    };


    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between mb-2">

                <div className="relative  ">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => search(e.target.value)}
                        className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  shadow-sm"
                        placeholder="Filtrar respuestas"
                    />
                </div>
                <div className="flex items-end">
                    <p className="text-sm font-medium">
                        Resultados: <strong>{answersFiltered.length}</strong>
                    </p>
                </div>
            </div>
            <div className="inline-block rounded-lg border shadow-sm w-full">
                <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 bg-gray-100 ">
                        <tr>
                            <th scope="col" className="text-sm font-medium px-2 py-2 w-8">
                                <button onClick={sort}>Puntaje</button>
                            </th>
                            <th scope="col" className="text-sm font-medium px-2 py-2 w-52">
                                Categoría
                            </th>
                            <th scope="col" className="text-sm font-medium px-2 py-2 w-52">
                                Subategorías
                            </th>
                            <th scope="col" className="text-sm font-medium px-2 py-2">
                                ¿En qué crees que podemos mejorar tu experiencia? (opcional)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {answersFiltered.map((e) => (
                            <tr
                                className="bg-white text-gray-700 border-b text-justify hover:bg-gray-100"
                                key={e.id}
                            >
                                <td className="p-2 font-bold text-center align-text-top">{e.score}</td>
                                <td className="p-2 align-text-top text-left">{e.category}</td>

                                <td className="p-2 align-text-top text-left">
                                    {
                                        e.subcategories.map(s =>
                                            (<p>- {s}</p>)
                                        )
                                    }
                                </td>

                                <td className="p-2 align-text-top text-left">
                                    <Highlighter
                                        searchWords={[searchTerm]}
                                        autoEscape={true}
                                        textToHighlight={e.answer}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AnswersTable;
