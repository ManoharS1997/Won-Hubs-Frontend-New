import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-modal'
import WonContext from '../../../../../context/WonContext';

import { emailFlow } from '../WorkflowV2/ReactflowPro/ExpandAndCollapse/initialElements';
import { getTableData } from '../../../../../utils/CheckAndExecuteFlows/CRUDoperations';

import {
  MainContainer,
  BodyContainer,
  CustomContainer,
  TemplateCardslist,
  TemplateCard,
  Card,
  CloseTemplateBtn,

} from './StyledComponents'
import renderIcons from '../../../../../shared/functions/renderIcons';

const modalStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    top: '0%',
    bottom: '0%',
    right: '0%',
    left: '0%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'var(--background-color)'
  }
}

export default function WorkflowTemplateCards() {
  const [isTemplatesListOpen, setTemplatesListOpen] = useState(false)
  const [allFlowsList, setAllFlowsList] = useState([])

  useEffect(() => {
    const flowsData = async () => {
      const data = await getTableData('flows')
      data.flows && setAllFlowsList(data.flows)
    }
    flowsData()
  }, [])

  const openTemplates = () => setTemplatesListOpen(true)

  const closeTemplates = () => setTemplatesListOpen(false)

  return (
    <WonContext.Consumer>
      {value => {
        const { activeFlowData, setactiveFlowData } = value

        return (
          <MainContainer>
            <BodyContainer>
              <CustomContainer>
                <ul className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 !m-0 !p-0 h-fit w-full'>
                  <TemplateCard onClick={openTemplates} >Mobile</TemplateCard>
                  <TemplateCard onClick={openTemplates} >Desktop</TemplateCard>
                  <TemplateCard onClick={openTemplates} >Tab</TemplateCard>
                  <Link to={`/flows/new`}><TemplateCard onClick={openTemplates} >+</TemplateCard></Link>
                </ul>

                <Modal
                  style={modalStyles}
                  isOpen={isTemplatesListOpen}
                // onRequestClose={closeTemplates}
                >
                  <CloseTemplateBtn
                    type='button'
                    onClick={closeTemplates}
                  >
                    {renderIcons('IoIosClose', 20, 'inherit')}
                  </CloseTemplateBtn>
                  {allFlowsList.length > 0 ?
                    <TemplateCardslist>
                      {allFlowsList?.map(flow => (
                        <Link to={`/flows/${flow.id}`} key={flow.id}>
                          <Card
                            onClick={() => setactiveFlowData({ activeNodes: emailFlow[0], activeEdges: emailFlow[1] })}
                          >
                            {flow.flow_name}
                          </Card>
                        </Link>
                      ))}
                    </TemplateCardslist> :
                    <div className='flex items-center justify-center h-full w-full'>
                      <p>No templates Available</p>
                    </div>}
                </Modal>
              </CustomContainer>
            </BodyContainer>
          </MainContainer>
        )
      }}
    </WonContext.Consumer>
  )
}