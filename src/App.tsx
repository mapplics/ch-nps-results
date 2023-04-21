
import { lazy, ReactElement, Suspense, useState } from "react";
import Select from "react-select";
import { Loading } from "./Loading";

const Survey2Main = lazy(() => import("./surveys/survey02_junio_22/Survey2Main"));
const Survey3Main = lazy(() => import("./surveys/survey03_julio_22/Survey3Main"));
const Survey4Main = lazy(() => import("./surveys/survey04_agosto_22/Survey4Main"));
const Survey5Main = lazy(() => import("./surveys/survey05_septiembre_22/Survey5Main"));
const Survey6Main = lazy(() => import('./surveys/survey06_octubre_22/Survey6Main'));
const Survey7November = lazy(() => import('./surveys/survey07_noviembre_22/Survey7Main'));
const Survey7DecemberMain = lazy(() => import('./surveys/survey07_diciembre_22/Survey7Main'));
const Survey7JanuaryMain = lazy(() => import('./surveys/survey07_enero_23/Survey7Main'));
const Survey7FebreryMain = lazy(() => import('./surveys/survey07_febrero_23/Survey7Main'));
const Survey7MarchMain = lazy(() => import('./surveys/survey07_march_23/Survey7Main'));
const Survey7AbrilMain = lazy(() => import('./surveys/survey07_abril_23/Survey7Main'));

const App = () => {
    const surveys: { value: string, label: string, component: ReactElement }[] = [
        { value: 'nps7', label: 'NPS Abril 2023', component: <Survey7AbrilMain /> },
        { value: 'nps7', label: 'NPS Marzo 2023', component: <Survey7MarchMain /> },
        { value: 'nps7', label: 'NPS Febrero 2023', component: <Survey7FebreryMain /> },
        { value: 'nps7', label: 'NPS Enero 2023', component: <Survey7JanuaryMain /> },
        { value: 'nps7', label: 'NPS Diciembre 2022', component: <Survey7DecemberMain /> },
        { value: 'nps7', label: 'NPS Noviembre 2022', component: <Survey7November /> },
        { value: 'nps6', label: 'NPS Octubre 2022', component: <Survey6Main /> },
        { value: 'nps5', label: 'NPS Septiembre 2022', component: <Survey5Main /> },
        { value: 'nps4', label: 'NPS Agosto 2022', component: <Survey4Main /> },
        { value: 'nps3', label: 'NPS Julio 2022', component: <Survey3Main /> },
        { value: 'nps2', label: 'NPS Junio 2022', component: <Survey2Main /> },
    ];

    const [selectedSurvey, setSelectedSurvey] = useState(surveys[0]);

    return (
        <div className="max-w-screen-md lg:max-w-screen-lg mx-auto bg-gray-50 p-3">
            <Select
                options={surveys}
                value={selectedSurvey}
                getOptionLabel={(x: any) => x.label}
                getOptionValue={(x: any) => x.label}
                isClearable={false}
                isSearchable={false}
                onChange={(x: any) => setSelectedSurvey(x)}
            />


            <Suspense fallback={<Loading/>}>
                {selectedSurvey.component}
            </Suspense>


        </div>

    );

};

export default App;
