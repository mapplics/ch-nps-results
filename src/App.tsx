
import { lazy, ReactElement, Suspense, useState } from "react";
import Select from "react-select";

const Survey6Main = lazy(() => import('./surveys/survey6_octubre_22/Survey6Main'));
const Survey7Main = lazy(() => import('./surveys/survey7_noviembre_22/Survey7Main'));

const App = () => {
    const surveys: { value: string, label: string }[] = [
        { value: '', label: 'NPS Octubre 2022' },
        { value: '', label: 'NPS Noviembre 2022' },
    ];
    return <Survey7Main />
    //const [selectedSurvey, setSelectedSurvey] = useState<string>(surveys[0].value);
    /*
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
    
    
    
    
    
            </div>
            
        );
        */
};

export default App;
