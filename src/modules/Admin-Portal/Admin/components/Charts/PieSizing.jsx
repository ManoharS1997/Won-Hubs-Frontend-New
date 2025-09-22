
import { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { palletteCategories } from './ColorPalette';
import BasicButtonExample from './ReportsDropdown';

const desktopOS = [
    {
        label: 'Windows',
        value: 72.72,
    },
    {
        label: 'OS X',
        value: 16.38,
    },
    {
        label: 'Linux',
        value: 3.83,
    },
    {
        label: 'Chrome OS',
        value: 2.42,
    },
    {
        label: 'Other',
        value: 4.65,
    },
];

const valueFormatter = (item) => `${item.value}%`;

export default function PieSizing({
    demo, data, reportsList,
    widgetId, layout, setLayout,
    setLayoutModifying
}) {
    const [reportData, setReportData] = useState({})
    const [graphData, setGraphData] = useState(null)
    const reports = reportsList?.filter(report => report.type === 'pie-sizing') || []

    return (
        demo ?
            <PieChart
                series={[
                    {
                        data: data ? data.data : [],
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        startAngle: -45,
                        endAngle: 225,
                        cx: 50,
                        cy: 150,
                    }
                ]}
                {...size}
                colors={palletteCategories['stack1']}
            />
            :
            <>
                <BasicButtonExample
                    reportData={reportData}
                    setReportData={setReportData}
                    reportsList={reports}
                    widgetId={widgetId}
                    setGraphData={setGraphData}
                    layout={layout}
                    setLayout={setLayout}
                    setLayoutModifying={setLayoutModifying}
                />
                <PieChart
                    series={[
                        {
                            data: graphData?.data || [],
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -45,
                            endAngle: 225,
                            cx: 150,
                            cy: 150,
                        }
                    ]}
                    {...size}
                    colors={palletteCategories['stack1']}
                />
            </>
    )
}


const size = {
    width: 450,
    height: 300,
};
