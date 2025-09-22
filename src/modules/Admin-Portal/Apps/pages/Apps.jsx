import { useState, useEffect } from 'react';
import { ImSearch } from "react-icons/im";
import AppModal from '../components/AppModal';
import { getTableData } from '../../../../utils/CheckAndExecuteFlows/CRUDoperations';

import {
  AppsPopupContent, CustomLi, CustomUl,
  LogoElement, LogoName, InputTag
} from './StyledComponents'

const AppsData = [
  { id: '1', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755114/dljjqoyqqerf9axcn3od_tsekfa.png', name: 'WONBILLS', category: 'paid', rating: '4.5' },
  { id: '2', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755034/p1ie4euqsi4zfbpgfpsp_tvbzwr.png', name: 'WONCRM', category: 'paid', rating: '3.5' },
  { id: '3', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755149/gcticyloynxw2h6nvhpb_ed47no.png', name: 'WONKLICKS', category: 'paid', rating: '5.0' },
  { id: '4', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755049/reodyw7ugngt13czewca_fffdl0.png', name: 'WONEATS', category: 'paid', rating: '4.2' },
  { id: '5', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755114/dficyuxskm3ek7x9niam_qg3xvj.png', name: 'WONDOCS', category: 'paid', rating: '3.4' },
  { id: '6', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755051/spb0be6ew2jjdaqmskca_d2yly1.png', name: 'WONFLOWS', category: 'paid', rating: '4.9' },
  { id: '7', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755096/avhn5ggf2nsc52xses3a_bnzoby.png', name: 'WONHUBS', category: 'paid', rating: '3.8' },
  { id: '8', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755114/dljjqoyqqerf9axcn3od_tsekfa.png', name: 'WONBILLS', category: 'paid', rating: '4.5' },
  { id: '9', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755034/p1ie4euqsi4zfbpgfpsp_tvbzwr.png', name: 'WONCRM', category: 'paid', rating: '3.5' },
  { id: '10', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755149/gcticyloynxw2h6nvhpb_ed47no.png', name: 'WONKLICKS', category: 'paid', rating: '5.0' },
  { id: '11', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755049/reodyw7ugngt13czewca_fffdl0.png', name: 'WONEATS', category: 'paid', rating: '4.2' },
  { id: '12', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755114/dficyuxskm3ek7x9niam_qg3xvj.png', name: 'WONDOCS', category: 'paid', rating: '3.4' },
  { id: '13', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755051/spb0be6ew2jjdaqmskca_d2yly1.png', name: 'WONFLOWS', category: 'paid', rating: '4.9' },
  { id: '14', logo: 'https://res.cloudinary.com/dkk0hqyat/image/upload/v1752755096/avhn5ggf2nsc52xses3a_bnzoby.png', name: 'WONHUBS', category: 'paid', rating: '3.8' },
];

const tabsList = [
  { id: 1, name: "Standard" },
  { id: 2, name: "Purchase" },
  { id: 3, name: "Third Party" },
];
const hostedUrl = import.meta.env.VITE_HOSTED_API_URL

export default function Apps() {
  const [appFilterText, setAppFilterText] = useState('');
  const [appsData, setAppsData] = useState([])
  const [filteredApps, setFilteredApps] = useState(AppsData);
  const [activeTab, setActiveTab] = useState(tabsList[0].id);
  const [isModalOpen, setModalOpen] = useState(false);
  const [appData, setAppData] = useState(null)

  useEffect(() => {
    fetchAppsData();
  }, []);

  useEffect(() => {
    if (!appFilterText) {
      setFilteredApps(appsData); // Reset when filter is empty
      return;
    }

    const filtered = appsData.filter(app => {
      const ratingString = app.rating ? app.rating.toString() : '';
      return (
        app.name.toLowerCase().includes(appFilterText.toLowerCase()) ||
        app.category.toLowerCase().includes(appFilterText.toLowerCase()) ||
        ratingString.includes(appFilterText)
      );
    });

    setFilteredApps(filtered);
  }, [appFilterText]);

  const fetchAppsData = async () => {
    try {
      const url = `${hostedUrl}/table/apps`;
      const data = await getTableData('apps');
      // const data = await response.json();

      if (data?.apps?.length > 0) {
        setAppsData(data.apps);
        setFilteredApps(data.apps); // Ensure filteredApps is updated
      }
    } catch (error) {
      console.log('Error fetching apps data', error);
    }
  };

  const NoApps = () => (
    <div className='flex items-center justify-center w-full h-full text-lg font-bold text-gray-500'>
      No Apps Found
    </div>
  )
  const onAppClick = (appDetails) => {
    setModalOpen(true)
    setAppData(appDetails)
  }

  return (
    <AppsPopupContent>
      {/* Tabs */}
      <ul className="flex items-center justify-center w-full gap-4 m-0 p-0">
        {tabsList.map(tab => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-[0.5rem] py-[0.3rem]
               cursor-pointer hover:border-b-2 hover:border-blue-500 
              ${activeTab === tab.id ? 'border-b-2 text-[var(--text-color)]' : 'text-[var(--text-color)]'}`}>
            {tab.name}
          </li>
        ))}
      </ul>

      {/* Search Input */}
      <div className='w-full h-full flex flex-col gap-2 p-4 rounded-lg'
        style={{ backgroundColor: 'var(--background-color)' }}
      >
        <div
          className={`w-[50%] self-center flex items-center 
            justify-end border gap-0 !rounded-[50px] p-0 
            focus-within:shadow-[0px_0px_5px_1px_#3079ff]`}
        >
          <InputTag
            type='search'
            value={appFilterText}
            onChange={(e) => setAppFilterText(e.target.value)}
            placeholder='Search Apps'
            className='py-2 px-3 !w-[90%] !h-full !border-none outline-none '
          />
          <span className={`w-[15%] h-full flex items-center justify-center
             bg-[#ccc] p-2 rounded-r-[50px] cursor-pointer `}>
            <ImSearch size={15} />
          </span>
        </div>

        {/* Apps List */}
        {activeTab === 1 ? (
          filteredApps.length > 0 ? (
            <CustomUl>
              {filteredApps.filter(app => app.category === 'free').map((app, index) => (
                <CustomLi
                  key={`${app.id}-${index}`}
                  onClick={() => onAppClick(app)}
                >
                  <LogoElement src={app.logo} alt={app.name} />
                  <LogoName>{app.name}</LogoName>
                  <LogoName style={{ fontWeight: '600', padding: '0px' }}>
                    Connections: {app.connections}
                  </LogoName>
                </CustomLi>
              ))}
            </CustomUl>
          ) :
            <NoApps />
        ) :
          activeTab === 2 ?
            filteredApps.length > 0 ? (
              <CustomUl>
                {filteredApps.filter(app => app.category === 'paid').map((app, index) => (
                  <CustomLi
                    key={`${app.id}-${index}`}
                    onClick={() => onAppClick(app)}
                  >
                    <LogoElement src={app.logo} alt={app.name} />
                    <LogoName>{app.name}</LogoName>
                    <LogoName style={{ fontWeight: '600', padding: '0px' }}>
                      Connections: {app.connections}
                    </LogoName>
                  </CustomLi>
                ))}
              </CustomUl>
            ) :
              <NoApps />
            :
            activeTab === 3 ?
              filteredApps.length > 0 ? (
                <CustomUl>
                  {filteredApps.filter(app => app.category === 'third_party').map((app, index) => (
                    <CustomLi
                      key={`${app.id}-${index}`}
                      onClick={() => onAppClick(app)}
                    >
                      <LogoElement src={app.logo} alt={app.name} />
                      <LogoName>{app.name}</LogoName>
                      <LogoName style={{ fontWeight: '600', padding: '0px' }}>
                        Connections: {app.connections}
                      </LogoName>
                    </CustomLi>
                  ))}
                </CustomUl>
              ) :
                <NoApps />
              :
              <NoApps />
        }
      </div>
      <AppModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        appData={appData}
      />
    </AppsPopupContent >
  );
}