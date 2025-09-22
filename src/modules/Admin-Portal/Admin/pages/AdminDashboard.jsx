import DashboardLayouts from './DashboardLayouts'

export default function AdminDashboard() {
  return (
    <div className='w-full h-fit flex flex-col'>
      <div className='w-full h-[93vh] flex bg-[var(--background-color)]'>
        <div className='w-full grow flex flex-col m-0 py-2 '>
          <DashboardLayouts />
        </div>
      </div>
    </div>
  )
}