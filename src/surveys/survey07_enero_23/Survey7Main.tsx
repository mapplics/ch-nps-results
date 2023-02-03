import AnswersTable from "./AnswersTable";
import GraphCategories from "./GraphCategories";
import GraphScore from "./GraphScore";
import GraphSubcategories from "./GraphSubcategories";
import { Nps7Answer } from "./Interfaces";

const answers: Nps7Answer[] = require("./nps_enero_2023.json");

const Survey7Main = () => {

    /// Filtro a los que saltearon la encuesta
    const answered = answers.filter((e) => e.score !== null);

    /// Contadores
    const responseCount = answered.length;
    const noResponseCount = answers.length - responseCount;

    const promoterCount = answered.filter((e) => e.score === 9 || e.score === 10).length;
    const neutralCount = answered.filter((e) => e.score === 7 || e.score === 8).length;
    const detractorCount = answered.filter((e) => e.score! >= 1 && e.score! <= 6).length;

    /// Promedio
    const avg = answered.reduce((prev: number, e) => prev + e.score!, 0) / responseCount;

    /// Puntaje nps
    const npsScore = ((promoterCount - detractorCount) / responseCount) * 100;

    return (
        <div className="max-w-screen-md lg:max-w-screen-lg mx-auto bg-gray-50 p-3">
            <div className="w-full py-5 px-4 text-gray-700 relative">
                <div className="w-full pb-4 text-2xl font-bold text-gray-700">
                    CODERHOUSE APP - NPS Enero 2023
                </div>

                <table className=" text-sm text-left text-gray-700 sm:col-span-4 col-span-12 sm:col-start-8 col-start-1">
                    <tbody>
                        <tr className="text-gray-700">
                            <td className="py-px font-bold">Usuarios alcanzados</td>
                            <td className="py-px px-2">{answers.length}</td>
                            <td></td>
                        </tr>
                        <tr className="text-gray-700">
                            <td className="py-px font-bold">Respuestas</td>
                            <td className="py-px px-2">{responseCount}</td>
                            <td>{((responseCount * 100) / answers.length).toFixed(1)}%</td>
                        </tr>
                        <tr className="text-gray-700">
                            <td className="py-px font-bold">No responde</td>
                            <td className="py-px px-2">{noResponseCount}</td>
                            <td>{((noResponseCount * 100) / answers.length).toFixed(1)}%</td>
                        </tr>
                    </tbody>
                </table>
                
                <div className="absolute right-0 top-0 text-xs">
                    Actualizado: 2/2/2023 10:38
                </div>
                
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            <div className="my-6 grid grid-cols-12">
                <p className="text-md font-medium px-2 py-2 col-span-12">
                    Según tu experiencia usando la App, ¿qué tan probable es que se la
                    recomiendes a otro estudiante?
                </p>
                <div className="sm:col-span-6 col-span-12">
                    <GraphScore answers={answered} countTotal={responseCount} />
                </div>

                <div className="sm:col-span-4 col-span-12 sm:col-start-8 col-start-1 align-middle flex flex-col justify-center content-start">
                    <table className=" text-sm text-left text-gray-700  mb-8">
                        <tbody>
                            <tr className="h-4"></tr>
                            <tr className="text-green-700">
                                <td className="py-px font-bold">Promotores</td>
                                <td className="py-px px-2">{promoterCount}</td>
                                <td>{((promoterCount * 100) / responseCount).toFixed(1)}%</td>
                            </tr>
                            <tr className="text-orange-600">
                                <td className="py-px font-bold">Neutrales</td>
                                <td className="py-px px-2">{neutralCount}</td>
                                <td>{((neutralCount * 100) / responseCount).toFixed(1)}%</td>
                            </tr>
                            <tr className="text-red-700">
                                <td className="py-px font-bold">Detractores</td>
                                <td className="py-px px-2">{detractorCount}</td>
                                <td>{((detractorCount * 100) / responseCount).toFixed(1)}%</td>
                            </tr>
                            <tr className="h-4"></tr>
                            <tr className="text-gray-700">
                                <td className="py-px font-bold">Puntaje NPS</td>
                                <td className="py-px px-2">{npsScore.toFixed(1)}</td>
                                <td></td>
                            </tr>
                            <tr className="h-4"></tr>
                            <tr className="text-gray-700">
                                <td className="py-px font-bold">Promedio</td>
                                <td className="py-px px-2">{avg.toFixed(2)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full h-px mb-6 bg-gray-200"></div>

            <div className="my-6 grid grid-cols-12">
                <p className="text-md font-medium px-2 py-2 col-span-12">
                    ¿Cuál fue la razón principal por la que [tuviste/no tuviste] una buena
                    experiencia?
                </p>
                <div className="col-span-12 h-96">
                    <GraphCategories answers={answered} countTotal={responseCount} />
                </div>
            </div>

            <div className="w-full h-px mb-6 bg-gray-200"></div>

            <GraphSubcategories answers={answered} countTotal={responseCount} />

            <div className="w-full h-px mb-6 bg-gray-200"></div>

            <AnswersTable answers={answered} />
        </div>
    );
};

export default Survey7Main;
