
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Tooltip } from 'react-tooltip';
import { HiDotsVertical } from "react-icons/hi";
import { WodgetSettingsBtn, } from './StyledChatsComponents';
import FormatChartData from '../../../../../utils/formatChartData/formatChartData';
import { getGeneratedReportData, getGugeReportsData } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';
import { useAlert } from '../../../../../shared/hooks/alertHook';

export default function BasicButtonExample({
  reportData, setReportData, reportsList, widgetId,
  setGraphData, gaugeReports,
  setGeneratedGaugeReportsData, setLayout, layout,
  setLayoutModifying
}) {
  const { addAlert } = useAlert()
  // console.log(setGraphData)
  const selectedReport = reportsList?.filter(reportItem =>
    reportItem.id === layout?.selected_reports?.filter(r => r.widget_id === widgetId)?.[0]?.report_id)?.[0] || []

  useEffect(() => {
    // console.log('selected report: ', selectedReport)
    const getselectedReportData = async () => {
      await onReportSelection(selectedReport)
      if (layout?.selected_reports?.length > 0) {
        const gaugeReportsData = await getGugeReportsData(
          selectedReport?.gauge_report_fields || [],
          selectedReport?.selected_table
        )

        if (gaugeReportsData?.success === true) {
          await setGeneratedGaugeReportsData(gaugeReportsData.data)
        } else {
          // console.log('gaugeReportsData', gaugeReportsData)
          addAlert(gaugeReportsData?.message, 'failure')
        }
      } else {
        setGraphData && setGraphData(null)
      }
    }
    getselectedReportData()
  }, [layout?.selected_reports?.length || layout])

  const onReportSelection = async (report) => {
    setReportData(report)
    if (gaugeReports) {
      const gaugeReportsData = await getGugeReportsData(
        report?.gauge_report_fields ||
        [], report?.selected_table
      )
      gaugeReportsData?.success && setGeneratedGaugeReportsData(gaugeReportsData.data)
    }
    const FetchedReportData = await getGeneratedReportData({
      aggregation: report?.aggregation?.value,
      groupBy: report?.group_by?.name,
      selectedTable: report?.selected_table,
      stackBy: report?.stack_by?.name,
      filterConditions: report?.filter_conditions,
    })

    const formattedData = {
      chartType: report?.type,
      filterConditions: report?.filterConditions,
      stackBy: report?.stack_by,
      groupBy: report?.group_by,
      aggregation: report?.aggregation,
      selectedTable: report?.selected_table
    }

    const fetchedDaTA = FormatChartData({
      formattedData,
      generatedData: FetchedReportData?.generatedReportData,
      orderByData: FetchedReportData?.orderByResult,
      setGraphData
    })

    setGraphData && setGraphData(fetchedDaTA)

    const createOrUpdateSelectedReports = (reportsList) => {
      const updatedList = reportsList
      const existingWidget = reportsList.filter(item => item.widget_id === widgetId)
      if (existingWidget.length > 0) {
        updatedList.map(item => item.widget_id === existingWidget.widget_id ?
          { ...existingWidget, report_id: report.id } : item
        )
      } else {
        updatedList.push({ widget_id: widgetId, report_id: report.id })
      }

      return (updatedList)
    }

    setLayout({
      ...layout,
      selected_reports: layout.selected_reports &&
        createOrUpdateSelectedReports(layout.selected_reports)
        || []
    })
    setLayoutModifying(true)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        margin: '0',
        padding: '0',
      }}
    >
      <span style={{ margin: 'auto', fontWeight: '700' }}>
        {
          Object.keys(reportData ? reportData : {})?.length > 0 ?
            reportData?.title : 'Please Select Report' || selectedReport?.title
        }
      </span>

      <WodgetSettingsBtn type='button' data-tooltip-id={widgetId}>
        <HiDotsVertical size={15} />
      </WodgetSettingsBtn>

      <Tooltip
        id={widgetId}
        openOnClick
        clickable
        noArrow
        opacity={1}
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0px 0px 2px 1px #ccc',
          width: 'fit-content',
          zIndex: '15',
          opacity: '1'
        }}
      >
        <span>Settings</span>

        {reportsList?.length > 0 &&
          <DropdownButton
            id="dropdown-basic-button"
            title={reportData?.title || 'Select Report'}
            className='widget_settings_dropdown'
          >
            {reportsList?.map(report =>
              <Dropdown.Item
                key={report.id}
                value={report}
                onClick={() => onReportSelection(report)}
              >
                {report.title}
              </Dropdown.Item>
            )}
          </DropdownButton>
        }
      </Tooltip>
    </div>
  );
}