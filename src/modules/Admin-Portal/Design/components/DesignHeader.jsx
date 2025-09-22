
import renderIcons from "../../../../shared/functions/renderIcons"
import { ReactSelect, FinishBtn } from "./StyledComponents"

export default function DesignHeader({
  OnBack, formTitle, updateFormTitle, activeTab, columnOptions, noOfColumns, changeNoOfColumns, alignmentOptions,
  buttonsAlignment, updateButtonsAllignment, ValidateDesign, setPreviewData,
}) {
  return (
    <div className="flex items-center py-1 px-2 gap-4 w-full h-[7vh] bg-[var(--background-color)] text-black" >
      <button
        className="!bg-transparent text-black p-1 !rounded flex items-center justify-center w-[2vw] border-none"
        title="Back"
        type="button"
        onClick={OnBack}
      >
        {renderIcons('IoIosArrowBack', 25)}
      </button>

      <div
        className="w-[280px] h-fit flex items-center justify-center  mx-1  rounded 
          focus-within:shadow-[0_0_5px_1px_var(--primary-color)]"
      >
        <input
          className="px-2 py-1 rounded-md bg-white text-black outline-none !border-none min-w-full !text-xl"
          type='text'
          id='title'
          placeholder='Untitled'
          value={formTitle} onChange={updateFormTitle}
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div className="w-fit mx-1" style={{ maxWidth: '180px' }}>
          {activeTab === 'fields' ? (
            <button
              type="button"
              title="Swap Columns"
              className="flex items-center gap-2 !text-lg"
            >
              {noOfColumns}
              <span
                className="border p-1 !rounded-full hover:shadow-md"
                onClick={changeNoOfColumns}
              >
                {renderIcons('AiOutlineSwap')}
              </span>
            </button>
          ) : activeTab === 'buttons' ? (
            <button
              type="button"
              title="Buttons Placement"
              className="flex items-center gap-2 "
            >
              {buttonsAlignment === 'top' ? 'Above Fields' : 'Below Fields'}
              <span
                className="border p-1 !rounded-full hover:shadow-md"
                onClick={updateButtonsAllignment}
              >
                {renderIcons('CgArrowsExchangeAltV')}
              </span>
            </button>
          ) : null}
        </div>

        <FinishBtn type="button" onClick={() => {
          if (ValidateDesign()) {
            setPreviewData()
          }
        }}>
          Preview
          {renderIcons('MdDoubleArrow', 25, 'inherit')}
        </FinishBtn>
      </div>
    </div>
  )
}