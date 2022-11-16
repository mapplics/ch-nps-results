
import { lazy, ReactElement, Suspense, useState } from "react";
import Select from "react-select";
import { Loading } from "./Loading";

const Survey3Main = lazy(() => import("./surveys/survey03_julio_22/Survey3Main"));
const Survey4Main = lazy(() => import("./surveys/survey04_agosto_22/Survey4Main"));
const Survey5Main = lazy(() => import("./surveys/survey05_septiembre_22/Survey5Main"));
const Survey6Main = lazy(() => import('./surveys/survey06_octubre_22/Survey6Main'));
const Survey7Main = lazy(() => import('./surveys/survey07_noviembre_22/Survey7Main'));

const App = () => {
    const surveys: { value: string, label: string, component: ReactElement }[] = [
        { value: 'nps7', label: 'NPS Noviembre 2022', component: <Survey7Main /> },
        { value: 'nps6', label: 'NPS Octubre 2022', component: <Survey6Main /> },
        { value: 'nps5', label: 'NPS Septiembre 2022', component: <Survey5Main /> },
        { value: 'nps4', label: 'NPS Agosto 2022', component: <Survey4Main /> },
        { value: 'nps3', label: 'NPS Julio 2022', component: <Survey3Main /> },
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
