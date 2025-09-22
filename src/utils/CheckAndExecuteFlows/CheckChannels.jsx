
import { FetchMails, useGmailFetch, UpdateNewMails, FetchEmailLogs } from "../APIFetches/APIFetches"
import { createNewTicket, updateTicket, deleteTicket, getAllUsers, createEmailLog, CreateNewUser, updateUser, deleteUser, getTableData } from "./CRUDoperations"

import ExecuteFlows from "./ExecuteFlow";

export default function CheckAllChannels() {

  // checks the new Gmail inbox and email_logs table to compare and create new records in tickets table
  const checkMailtriggers = async () => {
    console.log('checking for new email')

    // checks if the user in registered in the platform or not
    const authenticateUser = async (mail, senderMailId) => {
      const usersData = await getAllUsers()
      const isUserRegistered = !usersData.error ? usersData.users.find(user => user.email === senderMailId) : undefined
      return isUserRegistered
    }

    // send the registeration mail for unregistered users
    const SendRegistrationMail = async (mailId) => {
      // console.log(mailId)
      const url = `${import.meta.env.VITE_HOSTED_API_URL}/api/send-registration-email`
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: mailId })
      }

      const response = await fetch(url, options)
      console.log('Sent Registration Mail:', response.ok)
    }

    try {
      const gmailsData = await FetchMails()
      const emailLogsData = await FetchEmailLogs()

      if (!Array.isArray(emailLogsData)) {
        gmailsData.forEach(async mail => {
          const headers = mail.payload.headers;
          const getHeader = (name) => headers.find(item => item.name === name)?.value || null;
          const senderMailId = getHeader('From').split(' ').at(-1).slice(1, -1);
          const receiverMailId = getHeader('To');
          const cc = getHeader('Cc');
          const bcc = getHeader('Bcc');
          const subjectText = getHeader('Subject');

          await SendRegistrationMail(senderMailId)
          const receivedDate = getHeader('Date');

          createEmailLog(
            1, receivedDate, receiverMailId, senderMailId,
            null, mail.payload.body, 'true', cc, bcc, 'null', subjectText,
            mail.id, 'null'
          );
        });
      }

      const emailIds = Array.isArray(emailLogsData) ? emailLogsData.map(log => log.message_id) : []
      const newIncomingEmails = gmailsData.filter(mail => !emailIds.includes(mail.id))

      // console.log('gmailsData: ', gmailsData.length)

      if (newIncomingEmails.length > 0) {
        newIncomingEmails.forEach(async mail => {
          const senderMailId = mail.payload.headers.find(item => item.name === 'From').value.split(' ').at(-1).slice(1, -1);
          const isUserExisted = await authenticateUser(mail, senderMailId);

          const getHeader = (name) => mail.payload.headers.find(item => item.name === name)?.value || null
          const receivedDate = getHeader('Date');
          const receiverMailId = getHeader('To');
          const cc = getHeader('Cc');
          const bcc = getHeader('Bcc');
          const subjectText = getHeader('Subject');

          createEmailLog(
            1, receivedDate, senderMailId, receiverMailId,
            null, mail.payload.body, 'true', cc, bcc, 'null', subjectText,
            mail.id, 'null'
          );

          if (isUserExisted !== undefined) {
            ExecuteFlows('email_flow', { from_address: senderMailId, type: 'email', user: isUserExisted, subjectText });
          } else {
            const isPreviouselySentRegMail = emailLogsData.find(log => log.from === senderMailId)
            !isPreviouselySentRegMail ? await SendRegistrationMail(senderMailId) : null
          }
        })
      } else {
        console.log('No new emails found')
      }
    } catch (error) {
      console.error('Error checking new emails:', error);
    }
  }

  // checks if any raised tickets recently
  const CheckPortalRaisedTickets = async () => {
    // console.log('checking portal raised tickets')
    try {
      const portalTickets = await getTableData('ticket');
      const raisedAndInprogressTickets = portalTickets.ticket.filter(ticket => ticket.state === 'raised' || ticket.state === 'in_progress' || ticket.state === 'solved' || ticket.state === 'resolved' || ticket.state === 'closed') || [];
      // console.log(raisedAndInprogressTickets)
      if (raisedAndInprogressTickets.length > 0) {
        raisedAndInprogressTickets.forEach(async ticket => {
          ExecuteFlows('platform_raised', ticket)
        })
      }
    } catch (error) {
      console.error('Error checking portal raised tickets:', error);
    }
  }

  // checks if any raised issuesb by chatbot recently
  const CheckChatbotRaisedIssues = async () => {
    try {
      const portalTickets = await getTableData('ticket');
      const raisedTickets = portalTickets.ticket.filter(ticket => ticket.status === 'raised' && ticket.mode === 'chatbot');
      if (raisedTickets.length > 0) {
        raisedTickets.forEach(async ticket => {
          ExecuteFlows('chat_bot')
        })
      }
    } catch (error) {
      console.error('Error checking portal raised tickets:', error);
    }
  }

  const CheckAllChannels = () => {
    // checkMailtriggers()
    CheckPortalRaisedTickets()
    // CheckChatbotRaisedIssues()
  }

  return CheckAllChannels()
}