import AnswersTable from "./AnswersTable";
import Graph from "./Graph";

const answers = require("./answers.json");

const Survey2Main = () => {
  const resp = answers.filter((e) => e.score !== null).length;
  const noResp = answers.length - resp;

  const prom = answers.filter((e) => e.score === 9 || e.score === 10).length;
  const neu = answers.filter((e) => e.score === 7 || e.score === 8).length;
  const det = answers.filter((e) => e.score >= 1 && e.score <= 6).length;

  const promedio =
  answers
      .filter((e) => e.score !== null)
      .reduce((prev, e) => prev + e.score, 0) / resp;

  const npsScore = ((prom - det) / resp) * 100;

  return (
    <div className="max-w-screen-md mx-auto bg-gray-50 p-3">
      <div className="w-full py-5 px-4 text-gray-700 relative">
        <div className="w-full pb-4 text-2xl font-bold text-gray-700">
          CODERHOUSE APP - NPS Junio 2022
        </div>
        <div className="w-full py-0.5 text-sm font-normal text-gray-700 text-justify">
          - Según tu experiencia usando la App, ¿qué tan probable es que se la
          recomiendes a otro estudiante?
        </div>
        <div className="w-full py-0.5 text-sm font-normal text-gray-700 text-justify">
          - ¿Qué creés que podemos mejorar de tu experiencia?
        </div>

        <div className="absolute right-0 top-0 text-xs">
          Actualizado: 28/06/2022 9:18
        </div>
      </div>

      <div className="w-full h-px bg-gray-200"></div>

      <div className="my-6 grid grid-cols-12">
        <table className=" text-sm text-left text-gray-700 sm:col-span-4 col-span-12">
          <tbody>
            <tr className="text-gray-700">
              <td className="py-px font-bold">Usuarios alcanzados</td>
              <td className="py-px px-2">{answers.length}</td>
              <td></td>
            </tr>
            <tr className="text-gray-700">
              <td className="py-px font-bold">Respuestas</td>
              <td className="py-px px-2">{resp}</td>
              <td>{((resp * 100) / answers.length).toFixed(1)}%</td>
            </tr>
            <tr className="text-gray-700">
              <td className="py-px font-bold">No responde</td>
              <td className="py-px px-2">{noResp}</td>
              <td>{((noResp * 100) / answers.length).toFixed(1)}%</td>
            </tr>

            <tr className="h-4"></tr>
            <tr className="text-green-700">
              <td className="py-px font-bold">Promotores</td>
              <td className="py-px px-2">{prom}</td>
              <td>{((prom * 100) / resp).toFixed(1)}%</td>
            </tr>
            <tr className="text-orange-600">
              <td className="py-px font-bold">Neutrales</td>
              <td className="py-px px-2">{neu}</td>
              <td>{((neu * 100) / resp).toFixed(1)}%</td>
            </tr>
            <tr className="text-red-700">
              <td className="py-px font-bold">Detractores</td>
              <td className="py-px px-2">{det}</td>
              <td>{((det * 100) / resp).toFixed(1)}%</td>
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
              <td className="py-px px-2">{promedio.toFixed(2)}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="sm:col-span-6 col-span-12 sm:col-start-7 col-start-1">
          <Graph answers={answers.filter((e) => e.score !== null)}  countTotal={resp}/>
        </div>
      </div>

      <div className="w-full h-px mb-6 bg-gray-200"></div>

      <AnswersTable answers={answers.filter((e) => e.score !== null)}  />
    </div>
  );
};

export default Survey2Main;
