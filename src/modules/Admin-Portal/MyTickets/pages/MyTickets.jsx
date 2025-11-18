import { useState, useEffect } from "react";

// COMPONENT IMPORTS
import WonContext from "../../../../context/WonContext.jsx";
import TableComponent from "../../../TableComponent/pages/TableComponent.jsx";
import Tasks from "../components/Tasks.jsx";
import Approvals from "../components/Approvals.jsx";
import {
  getFormDetails,
  getTableColumnNames,
  getTableData,
} from "../../../../utils/CheckAndExecuteFlows/CRUDoperations.jsx";

import {
  TabsContainer,
  TabItem,
  CustomContainer,
  CustomViewContainer,
  FormContent,
  SideNavNContentContainer,
} from "./StyledComponents.jsx";

const hostedUrl = import.meta.env.VITE_HOSTED_API_URL;

const MyTickets = () => {
  const [ticketsData, setTicketsData] = useState([]); //state for table data
  const [selectedRows, setSelectedRows] = useState([]);
  const [TableColumnNames, setTableColumnNames] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [isAllCheckBoxActive, setIsAllCheckBoxActive] = useState(false);
  const [formData, setFormData] = useState(null);
  const [activeTable, setActiveTable] = useState("my-tickets");
  const userData = localStorage.getItem("userObj") || null;
  // <<<<API CALL

  useEffect(() => {
    fetchTicketsData();
  }, []);

  useEffect(() => {
    if (userData) {
      fetchFormData(JSON.parse(userData));
    }
  }, [userData]);

  const fetchTicketsData = async () => {
    try {
      const data = await getTableData("ticket");
      const newColumnNames = await getTableColumnNames("ticket");
      setTicketsData(data.ticket);
      setSelectedColumns(newColumnNames.columns);
      setTableColumnNames(newColumnNames.columns);
    } catch {
      console.log("Error fetching Tickets Data");
    }
  };
  const fetchFormData = async (data) => {
    console.log(data, "data Here");
    try {
      const result = await getFormDetails({
        module: "tickets",
        category: data.category,
        subcategory: data.subcategory,
        view: data.view,
        department: data.department,
      });
      if (result) {
        setFormData(result.data);
      }
    } catch {
      console.log("Error fetching Tickets Data");
    }
  };

  // API CALL >>>>>

  const handleSelectAllCheckBox = (e) => {
    //HANDLING SELECT ALL CHECKBOX
    setIsAllCheckBoxActive(e.target.checked);

    if (e.target.checked) {
      const allUserIds = ticketsData.map((item) => item.ticket_id);
      setSelectedRows(allUserIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (ticketId) => {
    const isSelected = selectedRows.includes(ticketId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter((id) => id !== ticketId));
    } else {
      setSelectedRows([...selectedRows, ticketId]);
    }
  };

  return (
    <WonContext.Consumer>
      {(value) => {
        const { recordsPerPage } = value;

        return (
          <CustomViewContainer>
            <SideNavNContentContainer>
              <CustomContainer>
                <TabsContainer>
                  <TabItem
                    type="button"
                    active={activeTable === "my-tickets"}
                    onClick={() => setActiveTable("my-tickets")}
                  >
                    My Tickets
                  </TabItem>
                  <TabItem
                    type="button"
                    active={activeTable === "tasks"}
                    onClick={() => setActiveTable("tasks")}
                  >
                    Tasks
                  </TabItem>
                  <TabItem
                    type="button"
                    active={activeTable === "approvals"}
                    onClick={() => setActiveTable("approvals")}
                  >
                    Approvals
                  </TabItem>
                </TabsContainer>

                {activeTable === "my-tickets" ? (
                  <FormContent>
                    <TableComponent
                      selectedColumns={selectedColumns}
                      TableColumnNames={TableColumnNames}
                      setTableColumnNames={setTableColumnNames}
                      recordsPerPage={recordsPerPage}
                      tableData={ticketsData}
                      id={"id"}
                      handleCheckboxChange={handleCheckboxChange}
                      handleSelectAllCheckBox={handleSelectAllCheckBox}
                      isAllCheckBoxActive={isAllCheckBoxActive}
                      selectedRows={selectedRows}
                      tableName={"ticket"}
                      showConfigurefieldsBtn={true}
                      title="My Tickets"
                      fetchTableData={fetchTicketsData}
                      rdtColValue={"id"}
                      formData={formData}
                      activeTable={activeTable}
                      // redirectionPath={`/ticket/`}
                    />
                  </FormContent>
                ) : activeTable === "tasks" ? (
                  <Tasks />
                ) : activeTable === "approvals" ? (
                  <Approvals />
                ) : null}
              </CustomContainer>
            </SideNavNContentContainer>
          </CustomViewContainer>
        );
      }}
    </WonContext.Consumer>
  );
};
export default MyTickets;
