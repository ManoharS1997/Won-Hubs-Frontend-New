

import { useEffect, useState, useRef } from "react";
import ResponsiveGridLayout from "react-grid-layout";
import { GoInfo } from "react-icons/go";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import CustomTooltip from "../../../../shared/UIElements/Tooltip";
import Swal from "sweetalert2";

import PieAnimation from "../components/Charts/PieAnimation";
import LinesPartial from "../components/Charts/LinesPartial";
import GaugeValueRangeNoSnap from "../components/Charts/GaugeChart";
import HorizontalBars from "../components/Charts/HorizontalBars";
import LinesInterpolation from "../components/Charts/LinesInterpolation";
import LinesStacking from "../components/Charts/LinesStacking";
import PieHighlights from "../components/Charts/PieHighlights";
import PieSizing from "../components/Charts/PieSizing";
import StackBars from "../components/Charts/StackedBarChart";
import { getTableData, GetUserDashboards, updateTableData } from "../../../../utils/CheckAndExecuteFlows/CRUDoperations";
import BasicDropdown from "../components/BootstrapDropdown";
import { defaultDashboardLayouts } from '../../../../DataFile/DefaultDataFile';
import BasicButtonExample from "../components/Charts/ReportsDropdown";
import { useNavigate } from "react-router-dom";

const tooltipList = [
  { id: 'total-tickets', content: 'Total Tickets raised will be counted here', place: 'bottom-start', style: { background: 'white', color: 'black', boxShadow: '0px 1px 4px 1px #cce' } },
  { id: 'resolved-tickets', content: 'Resolved Tickets resolved will be counted here', place: 'bottom-start', style: { background: 'white', color: 'black', boxShadow: '0px 1px 4px 1px #cce' } },
  { id: 'in-progress-tickets', content: 'In Progress Tickets in-progress will be counted here', place: 'bottom-start', style: { background: 'white', color: 'black', boxShadow: '0px 1px 4px 1px #cce' } },
  { id: 'open-tickets', content: 'Opened Tickets opened will be counted here', place: 'bottom-start', style: { background: 'white', color: 'black', boxShadow: '0px 1px 4px 1px #cce' } },
]

export default function DashboardLayouts() {
  const [reportsData, setReportsData] = useState([])
  const [isDragging, setIsDragging] = useState(false);
  const [layout, setLayout] = useState(null)
  const [lockLayout, setLayoutLocked] = useState(true)
  const [isLayoutModified, setLayoutModifying] = useState(false)
  const [width, setWidth] = useState(0);
  const [allLayouts, setAllLayouts] = useState([])
  const [generatedGaugeReportsData, setGeneratedGaugeReportsData] = useState([])
  const containerRef = useRef(null);
  const Navigate = useNavigate()

  const localUserId = JSON.parse(localStorage.getItem('activeUserData'))?.id

  const convertedNames = (name) => {
    const nameArr = name?.split('_')
    const convertedName = nameArr.map((item,) => item[0].toUpperCase() + item.slice(1))
    return (convertedName.join(' '))
  }

  const onDragStart = () => setIsDragging(true)

  const onDragStop = () => setIsDragging(false)

  useEffect(() => {
    const getReportsData = async () => {
      try {
        const response = await getTableData('reports')
        if (response.success) {
          setReportsData(response.reports)
        }
      } catch (err) {
        console.error(err)
      }
    }

    getReportsData()
    getDefaultLayouts()
  }, [])

  useEffect(() => {
    // Function to update the width to match the parent container's width
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    // Update the width initially
    updateWidth();

    // Update the width when the window is resized
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [containerRef?.current?.offsetWidth])

  const getDefaultLayouts = async () => {
    const resData = await GetUserDashboards()
    // console.log('dashboards response: ', resData)
    if (resData.success) {
      setAllLayouts(resData.data.dashboard_layouts || [])
      if (resData.data.dashboard_layouts && resData.data.dashboard_layouts.length > 0) {
        const userSelectedLayoutId = resData.data.selected_layout
        const updatedLayoutData = resData.data.dashboard_layouts.filter(item => item.id.toString() === userSelectedLayoutId)[0]
        setLayout({ ...updatedLayoutData })
      }
    }
  }

  const widgetStyles = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    // zIndex: 0,

    /* From https://css.glass */
    color: 'var(--text-color) !important',
    background: 'var(--background-color)',
    borderRadius: '6px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(4px)',
    webkitBackdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  }

  const onlayoutChange = (newLayout) => {
    { layout.id && setLayout({ ...layout, layouts: newLayout }) }
    setLayoutModifying(true && !lockLayout)
  }

  const updateLayout = async () => {
    try {
      localStorage.setItem('myGridLayout', JSON.stringify(layout))
      const updateResponse = await updateTableData('users', localUserId, { dashboard_layouts: allLayouts.map(item => layout.id === item.id ? layout : item) })
      console.log('updateresponse ', updateResponse)
      if (updateResponse.success) {
        setLayoutModifying(false)

        return (Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Layout Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        }))
      }
      else {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Error updating dashboard layout: ${updateResponse?.message}`
        });
      }
    } catch (err) {
      console.log('Error updating dashboard layout: ', err)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error updating dashboard layout: ${err}`
      });
    }
  }
  // console.log(isLayoutModified)
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} ref={containerRef} >
      {layout &&
        <div className="self-end flex gap-3 items-center p-0 md:!py-1 md:!px-4 mx-2 md:!mx-[5%] absolute z-1 bg-white shadow-md rounded-full ">
          {layout &&
            <BasicDropdown
              selectedLayout={layout}
              setLayout={setLayout}
              allLayouts={allLayouts || []}
              setAllLayouts={setAllLayouts}
              getDefaultLayouts={getDefaultLayouts}
            />}

          <button
            className="w-fit h-fit self-end bg-transparent text-[#2176ff] p-2 border-none cursor-pointer "
            type="button"
            title="Lock/Unlock layout"
            onClick={() => setLayoutLocked(!lockLayout)}
          >
            {lockLayout ? <FaLock size={15} /> : <FaLockOpen size={15} />}
          </button>

          {isLayoutModified &&
            <button
              className="w-fit h-fit self-end bg-transparent text-[#2176ff] p-2 border-none cursor-pointer "
              type="button"
              title="Update"
              onClick={updateLayout}
            >
              <GrDocumentUpdate size={15} />
            </button>
          }
        </div>}

      {reportsData.length > 0 && layout ?
        <ResponsiveGridLayout
          className="layout"
          compactType={'vertical'}
          layout={layout?.layouts}
          cols={12}
          onResize={() => { }}
          rowHeight={50}
          width={width - 15}
          containerPadding={[20, 20]}
          margin={[15, 15]}
          autoSize
          isBounded={false}
          isResizable={!lockLayout}
          isDraggable={!lockLayout}
          preventCollision={false}
          allowOverlap={false}
          onDragStart={onDragStart}
          onDragStop={onDragStop}
          onLayoutChange={onlayoutChange}

          style={{
            height: 'fit-content',
            width: '100%',
            overflow: 'auto',
            flexGrow: '1',
            background: 'transparent',
            display: 'grid',
            justifyContent: 'cneter',
            zIndex: 0,
          }}
        >
          <div key="1" className="item" style={widgetStyles}>
            <BasicButtonExample
              gaugeReports={true}
              reportData={{}}
              setReportData={() => { }}
              reportsList={reportsData}
              widgetId={'1'}
              setGeneratedGaugeReportsData={setGeneratedGaugeReportsData}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
            <div className="w-full !h-fit grow flex items-center justify-around gap-4 pt-4">
              <div
                className="grow h-full flex flex-col justify-between items-center rounded p-4 shadow"
              >
                <h5>
                  {
                    generatedGaugeReportsData?.length > 0 &&
                    convertedNames(Object.keys(generatedGaugeReportsData[0])?.[0] ||
                      '--') || '--'
                  }
                </h5>

                <GaugeValueRangeNoSnap
                  defaultValue={18}
                  value={
                    generatedGaugeReportsData?.length > 0 &&
                    generatedGaugeReportsData[0][Object.keys(generatedGaugeReportsData[0])[0]
                    || 0]
                  }
                />

                <span style={{ alignSelf: 'flex-start' }} data-tooltip-id='resolved-tickets' >
                  <GoInfo />
                </span>
              </div>

              <div
                className="grow h-full flex flex-col justify-between items-center rounded p-4 shadow"
              >
                <h5>
                  {generatedGaugeReportsData?.length > 0 &&
                    convertedNames(Object.keys(generatedGaugeReportsData[0])?.[1] || '--')
                    || '--'
                  }
                </h5>

                <GaugeValueRangeNoSnap
                  defaultValue={56}
                  value={
                    generatedGaugeReportsData?.length > 0 &&
                    generatedGaugeReportsData[0][Object.keys(generatedGaugeReportsData[0])[1]
                    || 0]
                  }
                />

                <span style={{ alignSelf: 'flex-start' }} data-tooltip-id='in-progress-tickets' >
                  <GoInfo />
                </span>
              </div>

              <div
                className="grow h-full flex flex-col justify-between items-center rounded p-4 shadow"
              >
                <h5>
                  {
                    generatedGaugeReportsData?.length > 0 &&
                    convertedNames(Object.keys(generatedGaugeReportsData[0])?.[2] || '--')
                    || '--'
                  }
                </h5>

                <GaugeValueRangeNoSnap
                  defaultValue={5}
                  value={generatedGaugeReportsData?.length > 0 &&
                    generatedGaugeReportsData[0][Object.keys(generatedGaugeReportsData[0])[2]
                    || 0]
                  }
                />

                <span style={{ alignSelf: 'flex-start' }} data-tooltip-id='open-tickets' >
                  <GoInfo />
                </span>
              </div>

              <div
                className="grow h-full flex flex-col justify-between items-center rounded p-4 shadow"
              >
                <h5>
                  {
                    generatedGaugeReportsData?.length > 0 &&
                    convertedNames(Object.keys(generatedGaugeReportsData[0])?.[3] || '--')
                    || '--'
                  }
                </h5>

                <GaugeValueRangeNoSnap
                  defaultValue={79}
                  value={
                    generatedGaugeReportsData?.length > 0 &&
                    generatedGaugeReportsData[0][Object.keys(generatedGaugeReportsData[0])[3]
                    || 0]
                  }
                />

                <span style={{ alignSelf: 'flex-start' }} data-tooltip-id='total-tickets' >
                  <GoInfo />
                </span>
              </div>
            </div>
          </div>

          <div key="a" className="item" style={widgetStyles}>
            <HorizontalBars
              reportsList={reportsData}
              widgetId={'a'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="b" className="item" style={widgetStyles}>
            <PieAnimation
              reportsList={reportsData}
              widgetId={'b'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="c" className="item" style={widgetStyles}>
            <LinesPartial
              reportsList={reportsData}
              widgetId={'c'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="d" className="item" style={widgetStyles}>
            <PieHighlights
              reportsList={reportsData}
              widgetId={'d'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="e" className="item" style={widgetStyles}>
            <StackBars
              reportsList={reportsData}
              widgetId={'e'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="f" className="item" style={widgetStyles}>
            <LinesInterpolation
              reportsList={reportsData}
              widgetId={'f'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="g" className="item" style={widgetStyles}>
            <LinesStacking
              reportsList={reportsData}
              widgetId={'g'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>

          <div key="h" className="item" style={widgetStyles}>
            <PieSizing
              reportsList={reportsData}
              widgetId={'h'}
              layout={layout}
              setLayout={setLayout}
              setLayoutModifying={setLayoutModifying}
            />
          </div>
        </ResponsiveGridLayout> :
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img
            src='https://res.cloudinary.com/dkk0hqyat/image/upload/v1753510216/3a2fa307-f4b3-469d-a702-bfc50ca1b515.png_n2grh1.png'
            alt='no data'
            className="w-50"
          />
          <p>Currently No Reports available</p>
          <button
            type="button"
            onClick={() => Navigate('/create/report')}
            className="border px-4 py-2 !rounded-full hover:shadow-lg cursor-pointer"
          >Try Creating One</button>
        </div>}

      {tooltipList.map((item, idx) => (
        <CustomTooltip
          key={idx}
          optionId={item.id}
          position={item.place}
          content={item.content}
          tooltipStyle={item.style}
        />
      ))}
    </div>
  );

}