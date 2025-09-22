import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Tooltip } from 'react-tooltip';
import { DownloadTemplate } from "../../../utils/CheckAndExecuteFlows/CRUDoperations";
import BulkImportModal from "./BulkImportModal";
import ExportDataOrTemplate from "../../../shared/components/ExportTableData";

const moreOptions = [
    { id: 1, name: 'Download Template', actionId: 'templateDownload' },
    { id: 2, name: 'Bulk Import', actionId: 'bulkImport' },
    // { id: 1, name: 'Bulk Import' },
]

export default function MoreOptions({ tableName }) {
    const [isBulkImportModalOpen, setIsBulkImportModalOpen] = useState(false)

    const onBulkImport = () => {
        setIsBulkImportModalOpen(true)
    }

    const downloadTemplate = async () => {
        const templatefields = await DownloadTemplate(tableName);
        console.log(templatefields);
        ExportDataOrTemplate(templatefields)
    }

    const onMoreOptionsClickHandler = async (actionId) => {
        switch (actionId) {
            case 'bulkImport':
                return onBulkImport()
            case 'templateDownload':
                return await downloadTemplate()
            default:
                return null
        }
    }
    // console.log(isBulkImportModalOpen);

    return (
      <>
        <button
          data-tooltip-id="table-more-options"
          className={`p-1 !rounded-[50%] !bg-[var(--primary-color)] text-[var(--secondary-color)] hover:!bg-gray-200 
                            border !border-[var(--primary-color)] hover:text-[var(--text-color)]`}
        >
          <FiMoreVertical size={15} />
        </button>
        <Tooltip
          id="table-more-options"
          place="bottom-start"
          className="!opacity-100"
          style={{
            width: "200px",
            zIndex: "1",
            background: "#FFFFFF",
            boxShadow: "0 0 5px 2px #918e8e",
            opacity: "1",
            color: "#000",
            padding: "0",
          }}
          openOnClick
          clickable
        >
          <ul className="m-0 p-2 flex flex-col gap-2">
            {moreOptions.map((option) => (
              <li
                onClick={() => onMoreOptionsClickHandler(option.actionId)}
                key={option.id}
                className="hover:bg-[var(--primary-color)] hover:text-[var(--background-color)] py-1 px-3 rounded-[50px] cursor-pointer"
              >
                {option.name}
              </li>
            ))}
          </ul>
        </Tooltip>
        <BulkImportModal
          isOpen={isBulkImportModalOpen}
          setIsOpen={setIsBulkImportModalOpen}
          tableName={tableName}
        />
      </>
    );
}