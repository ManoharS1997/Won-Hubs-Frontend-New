import { useState } from 'react'
import DetailsTab from './DetailsTab'
import { tabsList } from '../../../../DataFile/DefaultDataFile'

import {
    HistoryTable,
    TabItem,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    TabsConatiner,
    TabsHeadContainer,
    TabDataTable
} from './StyledComponents'

export default function TicketDedtailTabs() {
    const [activeTab, setActiveTab] = useState('1')

    
    const activeTableData = tabsList.filter((item) => (item.id === activeTab))

    const onSetActiveTab = (event) =>  setActiveTab(event.target.id)
    
    return (
        <TabsConatiner>
            <TabsHeadContainer>
                <TabItem >Details</TabItem>
                {tabsList.map(tab => (
                    <TabItem isactive={(activeTab === tab.id).toString()} id={tab.id} onClick={onSetActiveTab} key={tab.id}>{tab.name}</TabItem>
                ))}
            </TabsHeadContainer>

            <TabDataTable>
                {activeTab != '2' ? (
                    <HistoryTable className="data-table">
                        <TableHead>
                            <TableRow>
                                <TableHeader>Date Modified</TableHeader>
                                <TableHeader>Modifier</TableHeader>
                                <TableHeader>Details</TableHeader>
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {activeTableData[0].data.map(item => (
                                <TableRow key={item.id}>
                                    <TableData>{item.dateModified}</TableData>
                                    <TableData>{item.modifier}</TableData>
                                    <TableData>{item.details}</TableData>
                                </TableRow>
                            ))}
                        </TableBody>
                    </HistoryTable>
                ) : (
                    <div>
                    
                        <DetailsTab />
                    </div>
                )}
            </TabDataTable>

        </TabsConatiner>
    )
}