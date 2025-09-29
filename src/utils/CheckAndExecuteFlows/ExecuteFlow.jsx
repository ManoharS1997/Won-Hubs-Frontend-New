// import React from "react";
// import { useState, useEffect } from "react"
import { FetchMails, useGmailFetch, UpdateNewMails, FetchEmailLogs, SendRegistrationMail } from "../APIFetches/APIFetches"
import { useQuery } from "@tanstack/react-query"
import _ from 'lodash'

import { createNewTicket, createNewRecordInTable, deleteTicket, getTableData, updateTableData, sendEmail, getAllUsers, createEmailLog, CreateNewUser, updateUser, deleteUser } from "./CRUDoperations"

const triggeredMailId = 'sriram.k@gmail.com'
// const flowData = { name: 'emailflow', data: [] }
// const triggerSatisfied = false
// const flowLogicConditionsSatisfy = false

export default function ExecuteFlows(flowType, record) {
    // console.log('ExecuteFlows hook called', new Date())
    // const { activeNodes, activeEdges, name, recievedEmail, subject, body, taskType, updatingData } = flowData
    // const [triggerSatisfied, setTriggerSatisfied] = useState(false)
    // const [flowLogicConditionsSatisfy, setflowLogicConditionsSatisfy] = useState(true)

    let triggerSatisfied;
    let flowLogicConditionsSatisfy;

    const emailFlowMailId = 'testmail@nowitservices.com' // emailflow mailId for default one

    // switching the flow by it's type
    const switchFlowType = async (flowType) => {
        const allFlowsData = await getTableData('flows')
        const activeFlows = allFlowsData.flows.filter(flow => flow.active === "true")

        const switchType = () => {
            const mapFlows = () => activeFlows.map(async flow => {
                const isFlowExisted = record.flows_stage.find(item => item.id === flow.id)
                !isFlowExisted ? await updateTableData('ticket', record.id, { flows_stage: [...record.flows_stage, { id: flow.id, nodes: flow.data.activeNodes, edges: flow.data.activeEdges }] }) : null
                DivergeNodeAction(flow.data.activeNodes, flow.data.activeEdges, emailFlowMailId, flow.data.activeNodes, flow)
            }
            )

            switch (flowType) {
                case 'email_flow':
                    return mapFlows()
                case 'platform_raised':
                    return mapFlows()
                case 'chat_bot':
                    return mapFlows()
                default:
                    return null
            }
        }
        activeFlows.length > 0 ? switchType() : null
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: checking trigger conditions :<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const checkForNewRecords = async (tableName) => {
        // if (triggeredMailId === 'testmail@nowitservices.com') {
        //     const allMails = await FetchMails()
        //     const dbMailLogs = await FetchEmailLogs()

        //     const emailIds = dbMailLogs.map(mail => mail.message_id)
        //     let newMailRecieved = false

        //     allMails.map(mail => {
        //         if (!emailIds.includes(mail.id)) {
        //             return newMailRecieved = true
        //         }
        //     })

        //     return newMailRecieved
        // } else if (triggeredMailId === 'hr@nowitservices.com') {
        //     return
        // }

        const tableData = await getTableData(tableName)
        if (!tableData.error) {
            const newRecords = tableData[tableName].filter(item => item.label === 'new') || []
            return newRecords.length > 0
        }
    }

    const checkTicketUpdation = async (id, tableName) => {

        const tableData = getTableData(id, tableName)

        const isIdExists = tableData.find(item => item.id === id)

        return isIdExists
    }

    const checkTicketDeletion = async (id, tableName) => {

        const tableData = getTableData(id, tableName)

        const isIdExists = tableData.find(item => item.id !== id)

        return isIdExists
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: checking configure flowlogic conditions :<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    const checkCondition = (condition, tableData, node) => {
        const { filter, operation, value, logicalOperator } = condition;

        // console.log(operation)
        const compareArrayofObjects = (array, value) => {
            const keys = Object.keys(array[0])

            const isIncluded = array.some(item => {
                let conditionStatus

                keys.map(key => {
                    // console.log(typeof item[key] === 'string' ? item[key].toLowerCase().includes(value.toLowerCase()) : 'not string')
                    if (typeof item[key] === 'string') {
                        conditionStatus = item[key].toLowerCase().includes(value.toLowerCase())
                        return conditionStatus
                    }
                })
                if (conditionStatus === true) {
                    return conditionStatus
                }
            })
            return isIncluded
        }

        const compareObject = (item) => {
            // console.log(compareArrayofObjects(item[filter.name], value), 'this is comparing object')
            return compareArrayofObjects(item[filter.name], value)
        }

        switch (operation) {
            case 'Contains':
                return tableData[node.data.table].some(item =>
                    item.id === record.id ?
                        typeof item[filter.name] === 'object' && item[filter.name] !== null ?
                            compareObject(item) : item[filter.name] !== null ?
                                item[filter.name].toLowerCase()?.includes(value.toLowerCase()) : false
                        : false)

            case 'On':
                return tableData.some(item => new Date(item[filter.name]).toDateString() === new Date(value).toDateString());

            case 'Not On':
                return tableData.every(item => new Date(item[filter.name]).toDateString() !== new Date(value).toDateString());

            case 'does not contains':
                return tableData.every(item => !item[filter.name]?.includes(value));

            case 'Is':
                // console.log(tableData[node.data.table].some(item => item[filter.name]?.toString().toLowerCase() === value.toLowerCase()))
                return tableData[node.data.table].some(item => {
                    if (item.id === record.id) {
                        // console.log('is state changed:', item[filter.name]?.toString().toLowerCase() === value.toLowerCase(), item[filter.name], node)
                        return item[filter.name]?.toString().toLowerCase() === value.toLowerCase()
                    }
                });

            case 'Starts With':
                return tableData.some(item => item[filter.name]?.startsWith(value));

            case 'Ends With':
                return tableData.some(item => item[filter.name]?.endsWith(value));

            case 'Is Not':
                return tableData.every(item => item[filter.name]?.toString() !== value);

            case 'Is Empty':
                return tableData.some(item => !item[filter.name]);

            case 'Is Not Empty':
                return tableData.some(item => item[filter.name]);

            case 'Is Anything':
                return true;

            case 'Is One Of':
                () => {
                    const values = value.split(','); // assuming value is a comma-separated string
                    return tableData.some(item => values.includes(item[filter.name]?.toString()));
                }
                break

            case 'Is Empty String':
                return tableData[node.data.table].some(item => item[filter.name] === '');

            case 'Less Than Or Is':
                return tableData.some(item => parseFloat(item[filter.name]) <= parseFloat(value));

            case 'Greater Than Or Is':
                return tableData[node.data.table].some(item => parseFloat(item[filter.name]) >= parseFloat(value));

            case 'Between':
                () => {
                    const [min, max] = value.split(','); // assuming value is a comma-separated string
                    return tableData.some(item => {
                        const num = parseFloat(item[filter.name]);
                        return num >= parseFloat(min) && num <= parseFloat(max);
                    });
                }
                break

            case 'Is Same':
                return tableData.some(item => item[filter.name]?.toString() === node[filter.name]?.toString());

            case 'Is Different':
                return tableData.some(item => item[filter.name]?.toString() !== node[filter.name]?.toString());

            case 'Before':
                return tableData.some(item => new Date(item[filter.name]) < new Date(value));

            case 'At Or Before':
                return tableData.some(item => new Date(item[filter.name]) <= new Date(value));

            case 'After':
                return tableData.some(item => new Date(item[filter.name]) > new Date(value));

            case 'At Or After':
                return tableData.some(item => new Date(item[filter.name]) >= new Date(value));

            case 'Trend':
                // Assuming 'Trend' means increasing or decreasing trend
                // Custom logic needed based on the specific definition of 'Trend'
                return null;

            case 'Relative':
                // Custom logic needed for relative comparison
                return null;

            case 'Is More Than':
                return tableData.some(item => parseFloat(item[filter.name]) > parseFloat(value));

            case 'Is Less Than':
                return tableData.some(item => parseFloat(item[filter.name]) < parseFloat(value));

            default:
                return null;
        }
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: CRUD operations on tables :<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    // hypothetical functions

    const requestApprovalForTicket = (recordId) => {
        // Custom logic to request approval for a ticket
        return `Approval requested for ticket ID ${recordId}`;
    }

    const createNewRecordInTable = async (recordData, table) => {
        // Custom logic to create a new record in the specified table
        return `New record created in ${table} table`;
    }

    const updateTicket = (recordData) => {
        // Custom logic to update a ticket
        return `Ticket updated with data: ${JSON.stringify(recordData)}`;
    }

    const createNewTaskForTicket = async (taskData) => {
        // Custom logic to create a new task for a ticket
        return `New task created with data: ${JSON.stringify(taskData)}`;
    }

    const fetchEmailHeader = (emailId) => {
        // Custom logic to fetch email header
        return `Header for email ID ${emailId}`;
    }

    const fetchLatestResponseTextFromEmail = (emailId) => {
        // Custom logic to fetch the latest response text from an email
        return `Latest response text for email ID ${emailId}`;
    }

    const createEmailLog = (logData) => {
        // Custom logic to create an email log
        return `Email log created with data: ${JSON.stringify(logData)}`;
    }

    const fetchEmailAttachment = (emailId) => {
        // Custom logic to fetch email attachment
        return `Attachment for email ID ${emailId}`;
    }

    const fetchTicketById = (recordId) => {
        // Custom logic to fetch a ticket by ID
        return `Ticket details for ID ${recordId}`;
    }

    const fetchTickets = (query) => {
        // Custom logic to fetch tickets based on a query
        return `Tickets fetched with query: ${JSON.stringify(query)}`;
    }

    const fetchNotificationDetails = (notificationId) => {
        // Custom logic to fetch notification details
        return `Notification details for ID ${notificationId}`;
    }

    const sendEmailNotification = (notificationData) => {
        // Custom logic to send an email notification
        return `Email notification sent with data: ${JSON.stringify(notificationData)}`;
    }

    const sendSmsNotification = (notificationData) => {
        // Custom logic to send an SMS notification
        return `SMS notification sent with data: ${JSON.stringify(notificationData)}`;
    }

    const deleteTicket = (id) => {
        // Custom logic to delete a ticket
        return `Ticket with ID ${id} deleted`;
    }

    // switch to creat a new recornd in the perspective table by the table name
    const createNewRecord = async (table) => {
        switch (table) {
            case 'ticket':
                return await createNewRecordInTable({
                    name: record.user.first_name,
                    channel: 'email',
                    category: 'IT',
                    sub_category: 'Technical Query',
                    status: 'Requested',
                    description: record.subjectText,
                    active: 'true',
                    priority: 4,
                    requested_email: record.from_address,
                    department: 'Technical',
                    state: 'open',
                    task_type: 'Query'
                }, 'ticket')
            case 'email_log':
                return
            // CreateNewMailRecord()
            default:
                return null
        }
    }

    // switch to update a recornd in the perspective table by the table name
    const updateRecord = (table, updatingData) => {
        switch (table) {
            case 'ticket':
                // return updateTicket(updatingData)
                break
            default:
                return null
        }
    }

    // switch to delete a recornd in the perspective table by the table name
    const deleteRecord = (table, id) => {
        switch (table) {
            case 'ticket':
                return deleteTicket(id)
            default:
                return null
        }
    }

    // Switch to ask for approval
    const askForApproval = (table, recordId) => {
        switch (table) {
            case 'ticket':
                // Custom logic to ask for approval
                return requestApprovalForTicket(recordId);
            default:
                return null;
        }
    }

    // Switch to update or delete a record in the perspective table by the table name
    const createOrUpdateRecord = async (table, recordData, isUpdate = false) => {
        switch (table) {
            case 'ticket':
                if (isUpdate) {
                    return updateTicket(recordData);
                } else {
                    return createNewRecordInTable(recordData, 'ticket');
                }
            default:
                return null;
        }
    }

    // Switch to create a task
    const createTask = async (table, taskData) => {
        switch (table) {
            case 'ticket':
                return createNewTaskForTicket(taskData);
            default:
                return null;
        }
    }

    // Switch to get email header
    const getEmailHeader = (emailId) => {
        switch (emailId) {
            default:
                return fetchEmailHeader(emailId);
        }
    }

    // Switch to get latest response text from email
    const getLRTFE = (emailId) => {
        switch (emailId) {
            default:
                return fetchLatestResponseTextFromEmail(emailId);
        }
    }

    // Switch to create a log
    const log = (table, logData) => {
        switch (table) {
            case 'email_log':
                return createEmailLog(logData);
            default:
                return null;
        }
    }

    // Switch to lookup email attachment
    const lookupEA = (emailId) => {
        switch (emailId) {
            default:
                return fetchEmailAttachment(emailId);
        }
    }

    // Switch to lookup record
    const lookupRecord = (table, recordId) => {
        switch (table) {
            case 'ticket':
                return fetchTicketById(recordId);
            default:
                return null;
        }
    }

    // Switch to lookup records
    const lookupRecords = (table, query) => {
        switch (table) {
            case 'ticket':
                return fetchTickets(query);
            default:
                return null;
        }
    }

    // Switch to get Notification details
    const getNotificationDetails = (notificationId) => {
        switch (notificationId) {
            default:
                return fetchNotificationDetails(notificationId);
        }
    }

    // Switch to send Notification
    const sendNotification = (notificationData) => {
        switch (notificationData.type) {
            case 'email':
                return sendEmailNotification(notificationData);
            case 'sms':
                return sendSmsNotification(notificationData);
            default:
                return null;
        }
    }

    // switch to send mail 
    const sendMail = async (nodes, node, allNodes, flow) => {
        // console.log(record)
        function convertToHTML(data) {
            let html = '';

            data.forEach(element => {
                let tag;
                switch (element.type) {
                    case 'heading-two':
                        tag = 'h2';
                        break;
                    case 'paragraph':
                        tag = 'p';
                        break;
                    case 'image':
                        tag = 'img';
                        break;
                    default:
                        tag = 'div';
                        break;
                }

                if (tag === 'img') {
                    html += `<${tag} src="${element.children[0].text}" alt="Image">`;
                } else {
                    const text = element.children.map(child => child.text).join('');
                    html += `<${tag}>${text}</${tag}>`;
                }
            });

            return html;
        }

        const htmlOutput = node.data.mailContent.content ? convertToHTML(JSON.parse(node.data.mailContent.content)) : null;
        try {
            const mailAddress = record.requested_email ? record.requested_email : record.from_address ? record.from_address : 'kartheek.muppiri@nowitservices.com'
            // console.log(mailAddress)

            const mailOptions = {
                from: 'testmail@nowitservices.com', // process.env.EMAIL_USER,
                to: node.data.customLabel.split(' ').includes('Creation') || record.from_address || record.requested_email ? mailAddress : 'kartheek.muppiri@nowitservices.com',
                subject: 'Notification',
                text: `Text space `,
                html: htmlOutput,
            }

            const findNodeIndex = (item) => {
                return item.id === node.id
            }
            const nodeIndex = allNodes.findIndex(findNodeIndex)
            const updatedFlowStage = record.flows_stage.length > 0 ? record.flows_stage.map(item => {
                if (item.id === flow.id) {
                    return { id: item.id, nodes: item.nodes.map(nodeItem => nodeItem.id === node.id ? { ...nodeItem, stage: nodeIndex, completed: true } : nodeItem) }
                }
            }) : [
                {
                    id: flow.id,
                    nodes: nodes.map(nodeItem => nodeItem.id === node.id ? { id: nodeItem.id, stage: nodeIndex } : nodeItem)
                }
            ]

            // if (record.type) {
            await updateTableData('ticket', record.id, { state: 'in_progress', flows_stage: JSON.stringify(updatedFlowStage) })
            // }
            // console.log('mail sent')
            return await sendEmail(mailOptions)

        }
        catch (err) {
            console.log(err)
        }
    }

    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>: Flow logic functions :<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


    // function that execute "if" condition logic
    const ExecuteIfLogic = async (node) => {
        const tableData = await getTableData(node.data.table)
        const conditions = node.data.flowLogicConditions
        let flowLogicConditionsSatisfy = true

        for (let condition of conditions) {
            // console.log(checkCondition(condition, tableData, node), condition)
            if (!checkCondition(condition, tableData, node)) {
                flowLogicConditionsSatisfy = false
            }
        }
        // console.log(flowLogicConditionsSatisfy)
        return flowLogicConditionsSatisfy
    }

    // Function that executes "else" condition logic
    const ExecuteElseLogic = async (node) => {
        // Since else is executed when if conditions fail
        // console.log('Executing else logic');
        return true;
    }

    // Function that executes "else if" condition logic
    const ExecuteElseIfLogic = async (node) => {
        const tableData = await getTableData(node.data.table);
        const conditions = node.data.flowLogicConditions;
        for (let condition of conditions) {
            if (checkCondition(condition, tableData, node)) {
                return true;
            }
        }
        return false;
    }

    // Function that executes "for each" condition logic
    const ExecuteForEachLogic = async (node) => {
        const tableData = await getTableData(node.data.table);
        for (let item of tableData) {
            // Execute logic for each item
            // console.log(`Processing item: ${JSON.stringify(item)}`);

        }
        return true;
    }

    // Function that executes "do the following until" condition logic
    const ExecuteDTFUlogic = async (node) => {
        const tableData = await getTableData(node.data.table);
        let conditionMet = false;
        while (!conditionMet) {
            conditionMet = tableData.some(item => checkCondition(node.data.condition, [item], node));
            if (!conditionMet) {
                // console.log('Condition not met, performing operation');

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        return true;
    }

    // Function that executes "do the following in parallel" condition logic
    const ExecuteDTFIPlogic = async (node) => {
        const tableData = await getTableData(node.data.table);
        await Promise.all(tableData.map(async (item) => {
            // Execute logic in parallel for each item
            // console.log(`Processing item in parallel: ${JSON.stringify(item)}`);

        }));
        return true;
    }

    // Function that executes "make a decision" condition logic
    const ExecuteMakeAdecisionLogic = async (node) => {
        // Logic for making a decision
        const decision = Math.random() > 0.5; // Example decision logic
        // console.log(`Decision made: ${decision}`);
        return decision;
    }

    // Function that executes "wait for a duration of time" condition logic
    const ExecuteWFADOTlogic = async (node) => {
        const duration = node.data.duration;
        console.log(`Waiting for ${duration} milliseconds`);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, duration);
        });
    }

    // Function that executes "call a workflow" condition logic
    const ExecuteCallAWorkflowLogic = async (node) => {

        console.log('Calling another workflow');

        await new Promise(resolve => setTimeout(resolve, 1000));
        return true;
    }

    // Function that executes "end flow" condition logic
    const ExecuteEndFlowLogic = async (node) => {
        console.log('Ending flow');

        return true;
    }

    // Function that executes "dynamic flow" condition logic
    const ExecutDynamicFlowLogic = async (node) => {
        console.log('Executing dynamic flow');

        return true;
    }

    // Function that executes "get flow outputs" condition logic
    const ExecuteGFOlogic = async (node) => {
        console.log('Getting flow outputs');

        return true;
    }

    // Function that executes "set flow variables" condition logic
    const ExecuteSFVlogic = async (node) => {
        console.log('Setting flow variables');

        return true;
    }

    // Function that executes "try" condition logic
    const ExecuteTrylogic = async (node) => {
        try {
            console.log('Trying logic');
            // Logic to try
            return true;
        } catch (error) {
            console.error('Error in try logic:', error);
            return false;
        }
    }

    // switchFlowType() // switching the flow by it's type

    const conditionsExecution = async (node) => {
        if (node.data.flowLogic !== undefined) {
            switch (node.data.flowLogic) {
                case 'If':
                    try {
                        const status = await ExecuteIfLogic(node)
                        // console.log(status)
                        return status
                    } catch (err) {
                        console.log(err)
                        return 0
                    }
                case 'Else If':
                    return ExecuteElseIfLogic(node)
                case 'Else':
                    return ExecuteElseLogic(node)
                case 'For Each':
                    return ExecuteForEachLogic(node)
                case 'Do the following until':
                    return ExecuteDTFUlogic(node)
                case 'Do the following inparallel':
                    return ExecuteDTFIPlogic(node)
                case 'make a decision':
                    return ExecuteMakeAdecisionLogic(node)
                case 'wait for a duaration of time':
                    return ExecuteWFADOTlogic(node)
                case 'call a workflow':
                    return ExecuteCallAWorkflowLogic(node)
                case 'End Flow':
                    return ExecuteEndFlowLogic(node)
                case 'Dynamin Flow':
                    return ExecutDynamicFlowLogic(node)
                case 'Get Flow Outputs':
                    return ExecuteGFOlogic(node)
                case 'Set flow Variables':
                    return ExecuteSFVlogic(node)
                case 'Try':
                    return ExecuteTrylogic(node)
                default:
                    return null
            }
        }
    }

    const configureNodeExecution = async (node, allNodes, nodes, flow) => {

        const findNodeIndex = (item) => {
            return item.id === node.id
        }

        const nodeIndex = allNodes.findIndex(findNodeIndex)

        const previousNode = record.flows_stage.filter(item => item.id === flow.id)[0]?.nodes.slice(nodeIndex - 1, nodeIndex)[0] || null

        const previousNodeStatus = previousNode.completed ? previousNode.completed : false

        // console.log(previousNodeStatusCompleted)
        const currentNodeStatus = record.flows_stage !== null && record.flows_stage.length > 0 ?
            record.flows_stage.find(item => (item.id === flow.id)).nodes.find(nodeItem => nodeItem.id === node.id)
            : {}

        // console.log(currentNodeStatus.completed)

        const updateFlowStages = async () => {
            const updatedFlowStage = record.flows_stage.length > 0 ? record.flows_stage.map(item => {
                if (item.id === flow.id) {
                    return { id: item.id, nodes: item.nodes.map(nodeItem => nodeItem.id === node.id ? { ...nodeItem, stage: nodeIndex, completed: true } : nodeItem) }
                }
            }) : [{
                id: flow.id,
                nodes: nodes.map(nodeItem => nodeItem.id === node.id ? { id: nodeItem.id, stage: nodeIndex } : nodeItem)
            }]

            await updateTableData('ticket', record.id, { flows_stage: JSON.stringify(updatedFlowStage) })
        }

        if (previousNodeStatus && previousNodeStatus === true) {
            if (currentNodeStatus.completed !== undefined) {
                if (currentNodeStatus.completed === false) {
                    if (previousNode.type === 'configure') {
                        try {
                            const status = await conditionsExecution(previousNode)
                            if (node.conditionIs && node.conditionIs === status) {
                                conditionsExecution(node)
                                await updateFlowStages()
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        // console.log(previousNode.consitionIs === node.conditionIs)
                    } else {
                        conditionsExecution(node)
                        await updateFlowStages()
                    }
                }
            } else {
                // console.log(node)
                if (await conditionsExecution(node) === true) {
                    await updateFlowStages()
                }
            }
        }
    }


    const responseNodeExecution = async (node, allNodes, nodes, flow) => {
        // console.log('node type:', node.type)
        const findNodeIndex = (item) => {
            return item.id === node.id
        }

        const nodeIndex = allNodes.findIndex(findNodeIndex) // current response node index

        const previousNode = record.flows_stage.filter(item => item.id === flow.id)[0]?.nodes.slice(nodeIndex - 1, nodeIndex)[0] || null

        const previousNodeStatus = previousNode.completed ? previousNode.completed : previousNode.type === 'trigger' ? true : false
        // console.log(previousNodeStatus)

        // console.log(previousNodeStatusCompleted)
        const currentNodeStatus = record.flows_stage !== null && record.flows_stage.length > 0 ?
            record.flows_stage.find(item => (item.id === flow.id)).nodes.find(nodeItem => nodeItem.id === node.id)
            : {}

        // console.log(currentNodeStatus.completed)

        const updateFlowStages = async () => {
            const updatedFlowStage = record.flows_stage.length > 0 ? record.flows_stage.map(item => {
                if (item.id === flow.id) {
                    return { id: item.id, nodes: item.nodes.map(nodeItem => nodeItem.id === node.id ? { ...nodeItem, stage: nodeIndex, completed: true } : nodeItem) }
                }
            }) : [{
                id: flow.id,
                nodes: nodes.map(nodeItem => nodeItem.id === node.id ? { id: nodeItem.id, stage: nodeIndex } : nodeItem)
            }]

            await updateTableData('ticket', record.id, { flows_stage: JSON.stringify(updatedFlowStage) })
        }


        if (previousNodeStatus && previousNodeStatus === true) {
            if (currentNodeStatus.completed) {    // if completed key-pair exists
                if (currentNodeStatus.completed === false) { // if current nod enot executed
                    console.log(node)
                    if (previousNode.type === 'configure') {    //  if previous node is a configure node
                        try {
                            const status = await conditionsExecution(previousNode)  //  getting status of the configure node
                            if (node.conditionIs && node.conditionIs === status) { // comparing with current  response node path 
                                switch (node.data.coreAction) {
                                    case 'Send Email':
                                        return sendMail(nodes, node, allNodes, flow)
                                    case 'Create Record':
                                        return createNewRecord(node.data.table)
                                    case 'Update Record':
                                        return updateRecord(node.data.table)
                                    case 'Delete Record':
                                        return deleteRecord(node.data.table)
                                    case 'Ask For Approval':
                                        return askForApproval()
                                    case 'Create Or Update Record':
                                        return createOrUpdateRecord()
                                    case 'Create Task':
                                        return createTask()
                                    case 'Get Email Header':
                                        return getEmailHeader()
                                    case 'Get Latest Response Text From Email':
                                        return getLRTFE()
                                    case 'Log':
                                        return log()
                                    case 'Lookup EmaiL Attachments':
                                        return lookupEA()
                                    case 'Lookup Record':
                                        return lookupRecord()
                                    case 'Lookup Records':
                                        return lookupRecords()
                                    case 'Get Notification Details':
                                        return getNotificationDetails()
                                    case 'Send Notification':
                                        return sendNotification()
                                    default:
                                        return null
                                }
                            }
                        } catch (err) {
                            console.log(err)
                        }
                        // console.log(previousNode.consitionIs === node.conditionIs)
                    } else { // if not a configure node execute the response node
                        switch (node.data.coreAction) {
                            case 'Send Email':
                                return sendMail(nodes, node, allNodes, flow)
                            case 'Create Record':
                                return createNewRecord(node.data.table)

                            case 'Update Record':
                                return updateRecord(node.data.table)
                            case 'Delete Record':
                                return deleteRecord(node.data.table)
                            case 'Ask For Approval':
                                return askForApproval()
                            case 'Create Or Update Record':
                                return createOrUpdateRecord()
                            case 'Create Task':
                                return createTask()
                            case 'Get Email Header':
                                return getEmailHeader()
                            case 'Get Latest Response Text From Email':
                                return getLRTFE()
                            case 'Log':
                                return log()
                            case 'Lookup EmaiL Attachments':
                                return lookupEA()
                            case 'Lookup Record':
                                return lookupRecord()
                            case 'Lookup Records':
                                return lookupRecords()
                            case 'Get Notification Details':
                                return getNotificationDetails()
                            case 'Send Notification':
                                return sendNotification()
                            default:
                                return null
                        }
                    }
                }

            } else { // if completed key-pair doesn't existed
                if (previousNode.type === 'configure') { // if previouse node is configure
                    try {
                        const status = await conditionsExecution(previousNode)
                        if (node.conditionIs && node.conditionIs === status) {
                            switch (node.data.coreAction) {
                                case 'Send Email':
                                    return sendMail(nodes, node, allNodes, flow)
                                case 'Create Record':
                                    return createNewRecord(node.data.table)

                                case 'Update Record':
                                    return updateRecord(node.data.table)
                                case 'Delete Record':
                                    return deleteRecord(node.data.table)
                                case 'Ask For Approval':
                                    return askForApproval()
                                case 'Create Or Update Record':
                                    return createOrUpdateRecord()
                                case 'Create Task':
                                    return createTask()
                                case 'Get Email Header':
                                    return getEmailHeader()
                                case 'Get Latest Response Text From Email':
                                    return getLRTFE()
                                case 'Log':
                                    return log()
                                case 'Lookup EmaiL Attachments':
                                    return lookupEA()
                                case 'Lookup Record':
                                    return lookupRecord()
                                case 'Lookup Records':
                                    return lookupRecords()
                                case 'Get Notification Details':
                                    return getNotificationDetails()
                                case 'Send Notification':
                                    return sendNotification()
                                default:
                                    return null
                            }
                        }
                    } catch (err) {
                        console.log(err)
                    }
                    // console.log(previousNode.consitionIs === node.conditionIs)
                } else {
                    switch (node.data.coreAction) {
                        case 'Send Email':
                            return sendMail(nodes, node, allNodes, flow)
                        case 'Create Record':
                            return createNewRecord(node.data.table)

                        case 'Update Record':
                            return updateRecord(node.data.table)
                        case 'Delete Record':
                            return deleteRecord(node.data.table)
                        case 'Ask For Approval':
                            return askForApproval()
                        case 'Create Or Update Record':
                            return createOrUpdateRecord()
                        case 'Create Task':
                            return createTask()
                        case 'Get Email Header':
                            return getEmailHeader()
                        case 'Get Latest Response Text From Email':
                            return getLRTFE()
                        case 'Log':
                            return log()
                        case 'Lookup EmaiL Attachments':
                            return lookupEA()
                        case 'Lookup Record':
                            return lookupRecord()
                        case 'Lookup Records':
                            return lookupRecords()
                        case 'Get Notification Details':
                            return getNotificationDetails()
                        case 'Send Notification':
                            return sendNotification()
                        default:
                            return null
                    }
                }
            }
        }
    }

    // siverging the node actions by the type of the node
    const DivergeNodeAction = (nodes, edges, emailFlowMailId, allNodes, flow) => {
        // console.log('diverging nodes')

        nodes.map(async node => {
            switch (node.type) {

                case 'trigger':
                    switch (node.data.trigger) {
                        case 'On Creation':
                            // return setTriggerSatisfied(checkForNewRecords(node.data.table))
                            triggerSatisfied = await checkForNewRecords(node.data.table)
                            break
                        case 'On Updation':
                            // return setTriggerSatisfied(checkTicketUpdation(updatingData.id, node.data.tableName))
                            triggerSatisfied = checkTicketUpdation(node.id, node.data.table)
                            break
                        case 'On Deletion':
                            // return setTriggerSatisfied(checkTicketDeletion(updatingData.id, updatingData.tableName))
                            triggerSatisfied = checkTicketUpdation(node.id, node.data.table)
                            break
                        case 'On Creation/Updation':
                            // return setTriggerSatisfied(checkForNewRecords(node.data.table) || checkTicketUpdation(updatingData.id, updatingData.tableName))
                            triggerSatisfied = checkForNewRecords(node.data.table) || checkTicketUpdation(node.id, node.data.table)
                            break
                        default:
                            return null
                    }
                    break

                case 'configure':
                    configureNodeExecution(node, allNodes, nodes, flow)
                    break;

                case 'response':
                    responseNodeExecution(node, allNodes, nodes, flow)
                    // }
                    break

                case 'schedule':
                    return

                case 'connect':
                    return

                default:
                    return null
            }
        }
        )
    }


    return switchFlowType(flowType)
}