import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';


const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const navigate = useNavigate();
  const [showHolidays, setShowHolidays] = useState(true);
  const [showCriticalPriority, setCriticalPriority] = useState(true);
  const [showHighPriority, setHighPriority] = useState(true);
  const [showAnnouncements, setAnnouncements] = useState(true);

  const [events] = useState([
    {
      id: 1,
      title: 'Meeting',
      start: new Date(2024, 3, 1, 10, 0),
      end: new Date(2024, 3, 1, 12, 0),
      type: 'Ticket',
      priority: '1',
    },
    {
      id: 2,
      title: 'Ram Navami',
      start: new Date(2024, 3, 3, 10, 0),
      end: new Date(2024, 3, 3, 12, 0),
      type: 'holiday',
    },
    {
      id: 3,
      title: 'Meeting 2',
      start: new Date(2024, 3, 4, 14, 0),
      end: new Date(2024, 3, 4, 15, 30),
      type: 'Ticket',
      priority: '2',
    },
    {
      id: 4,
      title: 'New Update',
      start: new Date(2024, 3, 9, 10, 0),
      end: new Date(2024, 3, 9, 12, 0),
      type: 'Announcement',
    },
  ]);

  const filteredEvents = events.filter(
    (event) =>
      (showHolidays && event.type === 'holiday') ||
      (showCriticalPriority && event.type === 'Ticket' && event.priority === '1') ||
      (showHighPriority && event.type === 'Ticket' && event.priority === '2') ||
      (showAnnouncements && event.type === 'Announcement')
  );

  const eventStyleGetter = (event) => {
    let backgroundColor = '';
    switch (event.type) {
      case 'Ticket':
        backgroundColor = event.priority === '1' ? '#dc2626' : '#ea580c';
        break;
      case 'holiday':
        backgroundColor = '#facc15';
        break;
      case 'Announcement':
        backgroundColor = '#6b7280';
        break;
      default:
        backgroundColor = '#9ca3af';
    }

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '5px',
        padding: '4px',
      },
    };
  };

  return (
    <div className="h-[98%] overflow-auto border-1 p-0">
      <div className="w-full bg-white p-6 h-full">
        {/* Header */}
        <div className='flex  justify-between pt-2'>

          <div className="flex items-center mb-6">
            <button onClick={() => navigate(-1)} className="text-gray-700 hover:text-black mr-4">
              <IoIosArrowBack size={28} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 m-0 p-0">My Calendar</h2>
          </div>

          {/* Filter Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <label className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={showHolidays}
                onChange={() => setShowHolidays(!showHolidays)}
                className="accent-yellow-400 m-2"
              />
              <span className="text-gray-700">Holidays</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showCriticalPriority}
                onChange={() => setCriticalPriority(!showCriticalPriority)}
                className="accent-red-600 m-2"
              />
              <span className="text-gray-700">Priority 1 - Critical</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showHighPriority}
                onChange={() => setHighPriority(!showHighPriority)}
                className="accent-orange-500 m-2"
              />
              <span className="text-gray-700">Priority 2 - High</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showAnnouncements}
                onChange={() => setAnnouncements(!showAnnouncements)}
                className="accent-gray-600 m-2"
              />
              <span className="text-gray-700">Announcements</span>
            </label>
          </div>
        </div>

        {/* Calendar */}
        <div className="h-[520px]">
          <Calendar
            localizer={localizer}
            events={filteredEvents}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            views={{ month: true, week: true, day: true }}
            className="bg-white rounded-lg shadow-md p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
