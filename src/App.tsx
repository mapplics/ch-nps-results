
import { lazy, ReactElement, Suspense, useState } from "react";
import Select from "react-select";
import { Loading } from "./Loading";

const Survey6Main = lazy(() => import('./surveys/survey6_octubre_22/Survey6Main'));
const Survey7Main = lazy(() => import('./surveys/survey7_noviembre_22/Survey7Main'));

const App = () => {
    const surveys: { value: string, label: string, component: ReactElement }[] = [
        { value: 'nps7', label: 'NPS Noviembre 2022', component: <Survey7Main /> },
        { value: 'nps6', label: 'NPS Octubre 2022', component: <Survey6Main /> },
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
