import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ModesLst = [
  { id: 1, label: 'Desktop' },
  { id: 2, label: 'Tab' },
  { id: 3, label: 'SMS' },
  { id: 4, label: 'Mobile' },
]
const Templates = [
  { id: 1, label: 'Template 1' },
  { id: 2, label: 'Template 2' },
  { id: 3, label: 'Template 3' },
  { id: 4, label: 'Template 4' },
]

export default function ChooseIntegraionmodes() {
  const [showtemplates, setshowTemplates] = useState(false)
  const [selectedMode, setselectedMode] = useState(null)
  const Navigate = useNavigate()

  return (
    <div className="w-full h-full flex flex-col p-2 text-[var(--text-color)] overflow-auto">
      {!showtemplates
        ? <ul className="w-full h-fit grid md:grid-cols-4 gap-4 p-4">
          {ModesLst.map(mode => (
            <li
              key={mode.id}
              onClick={() => {
                setshowTemplates(true)
                setselectedMode(mode.label)
              }}
              className="w-full h-[10rem] border flex items-center justify-center rounded-xl hover:shadow-2xl text-2xl"
            >
              {mode.label}
            </li>
          ))}
        </ul>
        : <div>
          <button
            type="button"
            onClick={() => setshowTemplates(false)}
            className="!bg-[var(--background-color)] text-[var(--text-color)]"
          >
            <IoIosArrowBack size={25} />
          </button>
          <ul className="w-full h-fit grid md:grid-cols-8 gap-4 p-4">
            {Templates.map(template => (
              <li
                key={template.id}
                onClick={() => Navigate(`/integration-editor/${selectedMode}/${template.label}`)}
                className="w-full h-[10rem] border flex items-center justify-center rounded-xl hover:shadow-2xl text-xl"
              >
                {template.label}
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}