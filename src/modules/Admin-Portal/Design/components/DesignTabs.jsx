

import { MdFormatListBulletedAdd } from "react-icons/md";
import { MdAddToQueue } from "react-icons/md";
import { MdOutlineAddToPhotos } from "react-icons/md";

export default function Designtabs({
  activeTab, changeTab
}) {
  return (
    <div className="flex w-full h-[5%] bg-white pt-2">
      <div className="w-fit gap-2 flex items-end h-full m-0 bg-white">
        <button
          className={`w-fit flex py-1 px-2 !rounded-tl-[8px] !rounded-tr-[8px] !border-none
             ${activeTab === 'fields' ? 'bg-white text-black shadow-[0px_-7px_8px_1px_#ccc] z-2' : 'bg-transparent'}`}
          type="button"
          id='fields'
          onClick={() => changeTab('fields')}
          title="Additional Fields"
        >
          <MdFormatListBulletedAdd
            size={16} id='fields'
            style={{ marginRight: activeTab === 'fields' ? '10px' : '0px' }}
          />
          {activeTab === 'fields' ? 'Fields' : null}
        </button>

        <button
          className={`w-fit flex py-1 px-2 !rounded-tl-[8px] !rounded-tr-[8px] !border-none
            ${activeTab === 'tabs' ? 'bg-white text-black shadow-[0px_-7px_8px_1px_#ccc] z-2' : 'bg-transparent'}`}
          type="button"
          id='tabs'
          onClick={() => changeTab('tabs')}
          title='Tabs'
        >
          <MdAddToQueue
            size={16} id='tabs'
            style={{ marginRight: activeTab === 'tabs' ? '10px' : '0px' }}
          />
          {activeTab === 'tabs' ? 'Tabs' : null}
        </button>

        <button
          className={`w-fit flex py-1 px-2 !rounded-tl-[8px] !rounded-tr-[8px] !border-none
            ${activeTab === 'buttons' ? 'bg-white text-black shadow-[0px_-7px_8px_1px_#ccc] z-2' : 'bg-transparent'}`}
          type="button"
          id='buttons'
          onClick={() => changeTab('buttons')}
          title='Buttons'
        >
          <MdOutlineAddToPhotos
            size={16} id='buttons'
            style={{ marginRight: activeTab === 'buttons' ? '10px' : '0px' }}
          />
          {activeTab === 'buttons' ? 'Buttons' : null}
        </button>
      </div>
    </div>
  )
}