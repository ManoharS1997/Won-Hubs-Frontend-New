
import { Tooltip } from "react-tooltip";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosClose, IoIosArrowDown } from "react-icons/io";
import { PiPlugsConnectedFill } from "react-icons/pi";

import ToggleBtn from "../../../shared/UIElements/ToggleBtn";

const titleOptions = [
  { id: 1, label: 'Rename' },
  { id: 3, label: 'Export PNG' },
  { id: 5, label: 'Delete' },
]

export default function IntegrationEditorheader({ title, setTitle, isFlowActive, setFlowActive, onSave, onUpdate, type, setType, isNewIntegration }) {
  const [showSearch, setShowSearch] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const inputRef = useRef(null)

  const onTitleOptionsClick = (e) => {
    const updateTitle = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
      setEditTitle(true)
    }
    switch (e.target.id) {
      case '1':
        return updateTitle()
      default:
        return null
    }
  }
  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div className="flex w-full h-[5%] justify-start items-center gap-10 overflow-auto">
      <div
        className="h-[100%] w-fit flex items-center p-1 gap-4"
      >
        <div
          onClick={() => setShowSearch(true)}
          className="w-[10rem] h-full flex items-center border !border-[var(--text-color) rounded-[50px] pl-2 text-[var(--text-color)]"
        >
          <FaSearch /> Search...
        </div>
        <ToggleBtn
          isChecked={isFlowActive}
          handleCheckboxChange={() => setFlowActive(!isFlowActive)}
        />
      </div>
      <p
        className="m-0 text-[14px] flex items-center gap-2 cursor-pointer border hover:!border-[var(--primary-color)] text-[var(--text-color)]"
      >
        <PiPlugsConnectedFill size={18} />
        {editTitle ?
          <input
            ref={inputRef}
            value={title}
            onBlur={() => setEditTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditTitle(false)}
            onChange={handleTitleChange}
            className="px-2"
          /> :
          <input
            type='text'
            ref={inputRef}
            value={title}
            className="outline-none cursor-none"
          />}
        <IoIosArrowDown
          data-tooltip-id="title"
        />
      </p>
      <select
        onChange={(e) => setType(e.target.value)}
        value={type}
        className="!rounded-none py-0 h-fit m-0 border  "
      >
        <option>Internal</option>
        <option>External</option>
      </select>
      {isNewIntegration ?
        <button
          type="button"
          onClick={onSave}
          className="w-fit h-[90%] !ml-auto !mr-2 px-4 !bg-[#b3bafc9d] text-[#1003c5] !text-[1rem] rounded"
        >
          Save
        </button>
        : <button
          type="button"
          onClick={onUpdate}
          className="w-fit h-[90%] !ml-auto !mr-2 px-4 !bg-[#5f68ec70] font-bold text-uppercase text-[var(--primary-color)] rounded"
        >
          Update
        </button>
      }
      {showSearch && <div
        className={`absolute w-[30vw] min-h-[10rem] text-[var(--background-color)]
                     shadow-[0_0.3rem_1rem_0.2rem_#b3b2b2] rounded p-2 top-[15%] left-[35%] right-[35%] flex flex-col
                     bg-[var(--primary-color)] z-1 `}
      >
        <button
          type="button"
          className="w-fit self-end text-[var(--primary-color)] rounded-[50%]"
          onClick={() => setShowSearch(false)}
        >
          <IoIosClose size={20} />
        </button>
        <input
          type="search"
          className="w-[60%] h-[2rem] self-center rounded-[50px] px-2 outline-none border !border-[#fff]"
          placeholder="Search..."
        />
      </div>}
      <Tooltip
        id="title"
        place="bottom"
        style={{
          zIndex: '1',
          backgroundColor: 'var(--primary-color)',
          width: '10vw',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '0',
          margin: '0'
        }}
        noArrow
        openOnClick
        closeEvents={['Click']}
        clickable
      >
        {titleOptions.map(option => (
          <p
            key={option.id}
            id={option.id}
            onClick={onTitleOptionsClick}
            className="p-2 hover:bg-[var(--background-color)] hover:text-[var(--text-color)] m-0 cursor-pointer"
          >{option.label}</p>
        ))}
      </Tooltip>
    </div>
  )
}