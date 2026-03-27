export interface barOptions {
    data: barOptionsData
}

interface barOptionsData{
    labels: string[];
        datasets: [
            {
                label: string;
                data: number[];
                backgroundColor: string;
            },
            {
                label: string;
                data: number[];
                backgroundColor: string;
            }
        ];
}