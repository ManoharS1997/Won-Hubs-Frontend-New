
import { Link } from "react-router-dom";
import { useState, useCallback, useMemo, useRef } from "react";
import Modal from 'react-modal'
import saveAs from 'file-saver';
import JSZip from 'jszip';
import { toJpeg } from 'html-to-image';
import html2pdf from 'html2pdf.js';
import { createEditor } from 'slate';
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from 'slate-react';
import { sizeMap, fontFamilyMap } from '../../SlateEditor/utils/SlateUtilityFunctions.js'
import withLinks from '../../SlateEditor/plugins/withLinks.js'
import withTables from '../../SlateEditor/plugins/withTable.js'
import withEmbeds from '../../SlateEditor/plugins/withEmbeds.js'

import '../../SlateEditor/Editor.css'
import Image from '../../SlateEditor/Elements/Image/Image'
import Video from '../../SlateEditor/Elements/Video/Video'

import { useNavigate } from "react-router-dom";
import { MdOutlineSaveAs } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { BiExport } from "react-icons/bi";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaPrint } from "react-icons/fa6";
import { MdOutgoingMail } from "react-icons/md";

import WonContext from "../../../../context/WonContext.jsx";
import EmailModel from '../../SendEmail/pages/EmailModal.jsx';
import { CustomInput, CustomLabel, CustomOption, CustomSelect } from "../../Notifications/CreateNotification/StyledComponents.jsx";
import Cookies from "js-cookie";

import {
  ActionBtn,
  ActionBtnsContainer,
  BackBtn,
  BodyContainer,
  CustomContainer,
  EditorContainer,
  ExportOptionBtn,
  ExportOptionsContainer,
  MainContainer,
  ShareOptionBtn,
  ShareOptionsContainer,

} from '../components/TemplatePreview/StyledComponents.jsx'

const Element = (props) => {

  const { attributes, children, element } = props;

  switch (element.type) {
    case 'headingOne':
      return <h1 {...attributes}>{children}</h1>
    case 'headingTwo':
      return <h2 {...attributes}>{children}</h2>
    case 'headingThree':
      return <h3 {...attributes}>{children}</h3>
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'alignLeft':
      return <div style={{ textAlign: 'left', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'alignCenter':
      return <div style={{ textAlign: 'center', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'alignRight':
      return <div style={{ textAlign: 'right', listStylePosition: 'inside' }} {...attributes}>{children}</div>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'orderedList':
      return <ol type='1' {...attributes}>{children}</ol>
    case 'unorderedList':
      return <ul {...attributes}>{children}</ul>
    case 'link':
      return <Link {...props} />

    case 'table':
      return <table className='Ttable'>
        <tbody {...attributes}>{children}</tbody>
      </table>
    case 'table-row':
      return <tr {...attributes}>{children}</tr>
    case 'table-cell':
      return <td className='Ttd' {...attributes}>{children}</td>
    case 'image':
      return <Image {...props} />
    case 'video':
      return <Video {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {

  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.strikethrough) {
    children = <span style={{ textDecoration: 'line-through' }}>{children}</span>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>
  }
  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>
  }
  if (leaf.bgColor) {
    children = <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
  }
  if (leaf.fontSize) {
    const size = sizeMap[leaf.fontSize]
    children = <span style={{ fontSize: size }}>{children}</span>
  }
  if (leaf.fontFamily) {
    const family = fontFamilyMap[leaf.fontFamily]
    children = <span style={{ fontFamily: family }}>{children}</span>
  }
  return <span {...attributes}>{children}</span>
}

const fieldsList = [
  { fieldName: 'Address', isAdded: false, value: 'India  -6-284-1, Uma Shankar Nagar, Revenue Ward -17 , YSR Tadigadapa, 520007.' },
  { fieldName: 'Assigned Member', isAdded: false, value: 'Kartheek Muppiri' },
  { fieldName: 'Category', isAdded: false, value: 'WON-Platform' },
  { fieldName: 'Contact Number', isAdded: false, value: '+19 2568974613' },
  { fieldName: 'Created By', isAdded: false, value: 'Sriram Kakani' },
  { fieldName: 'Department', isAdded: false, value: 'Technical' },
  { fieldName: 'Description', isAdded: false, value: 'This ticket is assigned for update the client requirements in the Admin Portal' },
  { fieldName: 'Due Date', isAdded: false, value: '22/2/2024' },
  { fieldName: 'Email Address', isAdded: false, value: 'Kartheek.M@nowitservices.com' },
  { fieldName: 'Internal Notes', isAdded: false, value: '{empty}' },
  { fieldName: 'Location', isAdded: false, value: 'Vijayawada' },
  { fieldName: 'Priority', isAdded: false, value: '1-High' },
  { fieldName: 'State', isAdded: false, value: 'Created' },
  { fieldName: 'Sub-department', isAdded: false, value: 'MERN Developer' },
  { fieldName: 'Subject', isAdded: false, value: '{empty}' },
]

const Customstyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  content: {
    top: '70%',
    bottom: '1%',
    left: '85%',
    right: '1%',
    minWidth: 'fit-content',
    height: 'fit-content',
    borderRadius: '15px',
    overflow: 'hidden',
    padding: '10px',
  }
}

export default function PreviewTemplate() {
  const history = useNavigate()
  const canvasRef = useRef(null)
  const [topData, setTopData] = useState(JSON.parse(localStorage.getItem('templateData')))
  const [formValues, setFormValues] = useState()
  const [templateContent, setTemplateContent] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('templateContent'));
      return Array.isArray(stored) && stored.length > 0
        ? stored
        : [
          {
            type: 'paragraph',
            children: [{ text: ' ' }],
          },
        ];
    } catch {
      return [
        {
          type: 'paragraph',
          children: [{ text: ' ' }],
        },
      ];
    }
  });

  const editor = useMemo(() => withHistory(withEmbeds(withTables(withLinks(withReact(createEditor()))))), []);
  const [isOpenShare, setOpenShare] = useState(false)

  const [showExports, setShowExports] = useState(false)

  const toggleExportOptions = () => setShowExports(!showExports)

  const openShare = () => setOpenShare(true)

  const closeShare = () => {
    setOpenShare(false)
    setShowExports(false)
  }

  const editorStyles = {
    width: '100%',
    height: '100%',
    padding: ' 10px 15px',
    flexGrow: '1',
    overflowY: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
  }

  const [initialValue, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'First line of text in Slate JS. ' }],
    },
  ])

  const renderElement = useCallback(props => <Element {...props} />, [])

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  const onBack = () => history.goBack()

  const handleSaveAs = async () => {
    // setShowExports(false)
    // Here we have to do api call
    const templateData = { ...topData, content: templateContent }
    const url = `${import.meta.env.VITE_HOSTED_API_URL}/template/newTemplate`
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("accessToken")}`,

      },
      body: JSON.stringify(templateData)
    }
    const response = await fetch(url, options)
    console.log(response, "Response here")
    if (response.ok) {
      const data = await response.json()
      console.log(data, "data here")
      window.alert('Template Saved Successfully')
      history('/All Templates')
    }
  };

  const saveAsText = () => {
    const formattedContent = templateContent.map((node) => {
      if (node.type === 'paragraph') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'headingOne') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'headingTwo') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'bulletedList') {
        return `${node.children.map((child) => `<li>${child.children.map((grandchild) => grandchild.text).join(' ')}</li>`).join('')}`;
      }

      return '';
    }).join('\n');
    const element = document.createElement('a');
    const file = new Blob([formattedContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Template Content';
    document.body.appendChild(element); // Required for Firefox
    element.click();
    const blob = new Blob([formattedContent], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'my-data.txt');
    setShowExports(false)
  }

  const handleSaveAsPDF = () => {
    const element = document.getElementById('content-container');
    html2pdf().from(element).save('generated-pdf.pdf');
  };

  const handleSaveAsWord = () => {
    const blob = new Blob([generateDocx(templateContent)], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExports(false)
  };

  const generateDocx = (data) => {
    let content = '';

    data.forEach(paragraph => {
      paragraph.children.forEach(child => {
        content += child.text + ' ';
      });
      content += '\n';
    });

    return content;
  };

  const handleSaveAsRtf = () => {
    const formattedContent = templateContent.map((node) => {

      if (node.type === 'paragraph') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'headingOne') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'headingTwo') {
        return `${node.children.map((child) => child.text).join(' ')}`;
      } else if (node.type === 'bulletedList') {
        return `${node.children.map((child) => `<li>${child.children.map((grandchild) => grandchild.text).join(' ')}</li>`).join('')}`;
      }

      return '';
    }).join('\n');

    const rtfContent = generateRtf(templateContent);

    const blob = new Blob([rtfContent], { type: 'text/rtf' });
    console.log(blob)

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.rtf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateRtf = (data) => {
    let rtf = "{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1033";
    rtf += "\\fs20"; // default font size

    data.forEach(paragraph => {
      rtf += "\\par "; // new paragraph
      paragraph.children.forEach(child => {
        rtf += child.text + ' '; // add text content
      });
    });

    rtf += "}";
    return rtf;
  };

  const downloadHTMLZip = () => {
    const htmlContent = generateHTML(templateContent);
    const zip = new JSZip();
    zip.file('index.html', htmlContent);
    zip.generateAsync({ type: 'blob' }).then((content) => {

      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const generateHTML = (data) => {
    let html = '<!DOCTYPE html><html><head><title>Document</title></head><body>';

    data.forEach(paragraph => {
      html += '<p>';
      paragraph.children.forEach(child => {
        html += child.text + ' ';
      });
      html += '</p>';
    });

    html += '</body></html>';
    return html;
  };

  const handlePrintContent = () => {
    const printWindow = window.open('', '_blank');

    const element = document.getElementById('content-container');
    const htmlString = element.outerHTML;
    console.log(htmlString)

    printWindow.document.write(`
        <html>
        <head>
            <title>---</title>
            <!-- Include any styles needed for printing -->
        </head>
        <body>
            ${htmlString}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToJpg = async () => {
    const element = document.getElementById('content-container');
    try {
      const dataUrl = await toJpeg(element);
      saveAs(dataUrl, 'editor_content.jpg');
    } catch (error) {
      console.error('Error exporting content to JPG:', error);
    }
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  console.log(templateContent, 'templateContent')
  return (
    <WonContext.Consumer>
      {value => {
        const { sendMail, setOpenMail } = value
        return (
          <MainContainer>
            <BodyContainer>
              <CustomContainer>
                <BackBtn type='button' onClick={onBack}><IoChevronBackSharp size={25} />Edit </BackBtn>
                {sendMail ? <EmailModel /> : null}

                <div className="w-full flex flex-col md:flex-row gap-4 p-2  h-[20%]">

                  {/* Left Section */}
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="to">To:</CustomLabel>
                      <CustomInput id="to" value={topData?.to?.value} onChange={handleInputChange} />
                    </div>
                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="cc">CC:</CustomLabel>
                      <CustomInput id="cc" value={topData?.cc?.value} onChange={handleInputChange} />
                    </div>
                  </div>

                  {/* Middle Section */}
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="name">From:</CustomLabel>
                      <CustomInput id="name" value={topData?.from?.value} onChange={handleInputChange} />
                    </div>


                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="name">Title:</CustomLabel>
                      <CustomInput id="name" value={topData?.title?.value} onChange={handleInputChange} />
                    </div>

                  </div>

                  {/* Right Section */}
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="type">Type:</CustomLabel>
                      <CustomSelect
                        id="type"
                        value={topData?.type?.value}
                      // onChange={(e) =>
                      //   setFormValues((prev) => ({ ...prev, type: e.target.value }))
                      // }
                      >
                        <CustomOption value="global">Global</CustomOption>
                        <CustomOption value="local">Local</CustomOption>
                      </CustomSelect>
                    </div>
                    <div className="flex items-center gap-4">
                      <CustomLabel htmlFor="name">Description:</CustomLabel>
                      <CustomInput id="name" value={topData?.description?.value} onChange={handleInputChange} />
                    </div>
                  </div>
                </div>
                <EditorContainer>
                  <Slate editor={editor}
                    // value={templateContent === null ? initialValue : templateContent}
                    value={templateContent || initialValue}
                    onChange={newValue => setValue(newValue)}
                  >
                    <div
                      className="editor-wrapper"
                      style={{ border: '1px solid #f3f3f3', padding: '10px', margin: '0px', width: '100%', height: '100%', overflow: 'auto' }}
                    >
                      <Editable
                        style={editorStyles}
                        placeholder='Read only'
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        readOnly
                        id='content-container'
                      />
                    </div>
                  </Slate>
                </EditorContainer>

                <ActionBtnsContainer>
                  <ActionBtn
                    type='button'
                    style={{ color: '#000', border: '1px solid #000' }}
                    onClick={openShare} >
                    Complete
                    <HiOutlineShare size={15} style={{ marginLeft: '15px' }} />
                  </ActionBtn>

                  <Modal
                    isOpen={isOpenShare}
                    onRequestClose={closeShare}
                    contentLabel="share options popup"
                    style={Customstyle}
                  >
                    {showExports ? (
                      <ExportOptionsContainer className={showExports ? 'slide-in' : ''}>
                        <ExportOptionBtn type="button" onClick={handleSaveAsPDF}>PDF Document (.pdf)</ExportOptionBtn>
                        <ExportOptionBtn type="button" onClick={handleSaveAsWord} >Microsoft Word (.doc)</ExportOptionBtn>
                        <ExportOptionBtn type="button" onClick={saveAsText}>Plain Text (.txt)</ExportOptionBtn>
                        <ExportOptionBtn type="button" onClick={handleSaveAsRtf}>Rich Text Format (.rtf)</ExportOptionBtn>
                        <ExportOptionBtn type="button" onClick={downloadHTMLZip}>Web Page (.html, zipped)</ExportOptionBtn>
                        <ExportOptionBtn type="button" onClick={exportToJpg}>JPG Image (.jpg)</ExportOptionBtn>
                        {/* <canvas ref={canvasRef} style={{ display: 'none' }} /> */}
                        {/* <ExportOptionBtn type="button" onClick={exportToJpeg}>JPEG Image (.jpeg)</ExportOptionBtn> */}
                      </ExportOptionsContainer>
                    ) : null}
                    <ShareOptionsContainer>
                      <ShareOptionBtn
                        type="button"
                        onClick={toggleExportOptions}
                        style={{ backgroundColor: showExports ? '#e5e5e5' : '', color: showExports ? '#284b63' : '' }}>Export
                        <BiExport size={20} style={{ marginLeft: '15px' }} />
                      </ShareOptionBtn>
                      {/* <Link to='/All Templates' style={{ width: '100%' }}> */}
                      <ShareOptionBtn onClick={handleSaveAs}>Save
                        <MdOutlineSaveAs size={20} style={{ marginLeft: '15px' }} />
                      </ShareOptionBtn>
                      {/* </Link> */}
                      <ShareOptionBtn
                        type="button"
                        onClick={handlePrintContent}>Print
                        <FaPrint size={17} style={{ marginLeft: '15px' }} />
                      </ShareOptionBtn>
                      <ShareOptionBtn
                        type="button"
                        onClick={setOpenMail} >Send to Mail
                        <MdOutgoingMail size={20} style={{ marginLeft: '15px' }} />
                      </ShareOptionBtn>
                    </ShareOptionsContainer>
                  </Modal>

                </ActionBtnsContainer>

              </CustomContainer>
            </BodyContainer>
          </MainContainer>
        )
      }}
    </WonContext.Consumer>
  )
}
