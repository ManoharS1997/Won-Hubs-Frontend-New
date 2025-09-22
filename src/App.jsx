import { useState, Suspense, useCallback, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';

import WonContext from "./context/WonContext";
import CheckAllChannels from "./utils/CheckAndExecuteFlows/CheckChannels"
import AlertList from "./shared/components/AlertsList.jsx";
// import { AlertProvider } from "./shared/hooks/alertHook.jsx";
import { useAlert } from "./shared/hooks/alertHook.jsx";
import { themes } from "./utils/themes.js";

// Define the global styles for the app
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=San+Francisco&display=swap');
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 13px;
  }
`

import "bootstrap/dist/css/bootstrap.min.css";
import "reactflow/dist/style.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import router from "./Router.jsx"

import {
  nodes as activeNodes,
  edges as activeEdges,
} from './modules/Admin-Portal/WorkflowAutomator/pages/WorkflowV2/ReactflowPro/ExpandAndCollapse/initialElements'

// Register background sync with service worker if supported
function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready
      .then(registration => registration.sync.register('backgroundSyncData'))
      .then(() => console.log('Background sync registered'))
      .catch(error => console.error('Error registering background sync:', error));
  } else {
    console.error('Background sync is not supported');
  }
}

// Apply the selected theme by updating CSS variables
function applyTheme(themeName) {
  const theme = themes[themeName];
  if (theme) {
    Object.keys(theme).forEach(variable => {
      document.documentElement.style.setProperty(variable, theme[variable]);
    });
  }
}

export default function App() {
  // App-wide state variables
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sideNavScrollPosition, setSideNavScrollPosition] = useState(localStorage.getItem('scrollPosition'))
  const [cart, setUserCart] = useState([])
  const [userType, setUserType] = useState("admin");
  const [activeUserData, setActiveUserData] = useState({})
  const [openSettings, setOpenSettings] = useState(false);
  const [activeNav, setActiveNav] = useState(localStorage.getItem("activeNav"));
  const [activeAdminOption, setAdminOption] = useState(localStorage.getItem("activeAdminOpt"));
  const [sendMail, setSendMail] = useState(false);
  const [istransferTicketOpen, setTransferTicketOpen] = useState(false)
  const [showAdminOptions, setAdminOpt] = useState(false);
  const [openInbox, toggleInbox] = useState(false);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isChatBotOpen, setChatBot] = useState(true)
  const [isReceiverChatBoxOpen, setReceiverChatBoxOpen] = useState(true)
  const [isSenderChatBoxOPen, setSenderChatBoxOpen] = useState(true)
  const [chatData, setChatBoxData] = useState([])
  const [activeFlowData, setactiveFlowData] = useState({ activeNodes, activeEdges })
  const [designPreviewData, setDesingPreviewData] = useState({})
  const [readEmails, setReadEmails] = useState([])
  const [newEmailRecords, setNewEmailRecords] = useState([])
  const [newIncommingEmails, setNewIncomingEmails] = useState([])
  const [triggerFlows, setFlowsTrigger] = useState(false)
  const [searchInputForArticles, setSearchInputForArticles] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState([])
  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'wonhub';
  });
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [ip, setIp] = useState('');

  // WebSocket state for real-time messaging
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  // Custom alert hook
  const { addAlert } = useAlert()

  // Effect: Handle online/offline status and WebSocket connection
  useEffect(() => {
    !isOnline && addAlert('You are on offline.', 'failure')

    const ws = new WebSocket('ws://localhost:3002')

    ws.onopen = () => {
      // WebSocket connected
    }

    ws.onmessage = (event) => {
      const message = event.data;
      // Handle server/database status messages
      if (message.server === false) {
        // addAlert('Server IS Offline', 'failure')
      } else if (message.database === false) {
        // addAlert('Database is disconnected', 'failure')
      }
      setMessages((prev) => [...prev, message]);
    };

    ws.onclose = () => {
      // WebSocket disconnected
    }

    setSocket(ws)

    return () => ws.close()
  }, [isOnline])

  // Effect: Fetch public IP address on mount
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIp(data.ip);  // This gives you the public IP address
        localStorage.setItem('localIp', data.ip)
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIp();
  }, []);

  // Effect: Apply and persist selected theme
  useEffect(() => {
    applyTheme(selectedTheme);
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [selectedTheme]);

  // Send a message through WebSocket
  const sendMessage = () => {
    if (socket && input) {
      socket.send(input);
      setInput('');
    }
  };

  // Effect: Periodically run flows (placeholder)
  useEffect(() => {
    const id = setInterval(() => {
      // Periodic tasks (e.g., check emails, run flows)
      // checkEmails()
      CheckAllChannels()
    }, 10 * 1000)

    return () => clearInterval(id)
  }, [])

  const apiUrl = import.meta.env.VITE_HOSTED_API_URL

  // Function to check emails via API
  const checkEmails = async () => {
    const url = `${apiUrl}/gmail-webhook`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: 'checking for the New enails' })
    }
    const response = await fetch(url, options)
    console.log('send push mesage', response.ok)
  }

  // Add new alert content to the alert list
  const updateAlertContent = (content) => {
    setAlertContent(prevState => [...prevState, { id: prevState.length, content: content }])
  }

  // User portal context states
  const [usersActiveTab, setUserActiveTab] = useState(0)

  // Update active flow data
  const updateActiveFlowData = data => setactiveFlowData(data)

  // Change user active tab
  const ChangeUserActivetab = (id) => setUserActiveTab(id)

  // Toggle user type between admin and user
  const updateUserType = () => userType === 'admin' ? setUserType('user') : setUserType('admin')

  // Update design preview data
  const updateDesingPreviewData = (value) => setDesingPreviewData(value)

  // Toggle inbox open/close
  const toggleInboxOpt = () => toggleInbox(!openInbox)

  // Toggle admin options open/close
  const toggleAdminOptions = () => setAdminOpt(!showAdminOptions)

  // Toggle settings modal
  const toggleSettings = () => setOpenSettings(!openSettings)

  // Set active admin option and persist to localStorage
  const OnSetActiveAdminOption = (id) => {
    setAdminOption(id)
    localStorage.setItem("activeAdminOpt", id)
  }

  // Set active navigation tab and persist to localStorage
  const ChangeActivetab = (id) => {
    setActiveNav(id)
    localStorage.setItem("activeNav", id)
  }

  // Toggle email compose container
  const toggleEmailContainer = () => setSendMail(!sendMail)

  // Change number of records per page
  const onChangeRecordsPageRecords = (records) => setRecordsPerPage(records)

  // Toggle chatbot open/close
  const toggleChatBot = () => setChatBot(!isChatBotOpen)

  // Add chat data to chat box
  const setChatData = (user, text) => {
    setChatBoxData((prevData) => [
      ...prevData,
      { User: user, Message: text }
    ])
  }

  // Toggle transfer ticket modal
  const toggleTransferTicket = () => setTransferTicketOpen(!istransferTicketOpen)

  // Update read emails
  const updateEmails = (mails) => setReadEmails(mails)

  // Update search input for articles
  const onChangeSearchInput = (value) => setSearchInputForArticles(value)

  // Update and persist side nav scroll position
  const onChangeScrollBarPosition = (scrollPosition) => {
    setSideNavScrollPosition(scrollPosition)
    localStorage.setItem('scrollPosition', scrollPosition)
  }

  // Add or remove items from cart
  const setCartItems = (cartItem, action) => {
    if (action === 'Add') {
      setUserCart((prevState) => ([
        ...prevState,
        cartItem
      ]))
    } else {
      const filteredItems = cart.filter((each) => each.ticketNo !== cartItem)
      setUserCart(filteredItems)
    }
  }

  // Main app render
  return (
    <>
      {/* Global styles applied */}
      <GlobalStyle />
      {/* Provide all state and handlers via context */}
      <WonContext.Provider
        value={{
          sideNavScrollPosition,
          userType,
          activeUserData,
          openSettings,
          sendMail,
          istransferTicketOpen,
          activeOption: activeNav,
          activeAdminOption,
          showAdminOptions,
          openInbox,
          recordsPerPage,
          designPreviewData,
          activeFlowData,
          usersActiveTab,
          isChatBotOpen,
          isReceiverChatBoxOpen,
          isSenderChatBoxOPen,
          chatData,
          readEmails,
          newEmailRecords,
          newIncommingEmails,
          triggerFlows,
          cart,
          searchInputForArticles,
          ip: ip,
          showAlert: showAlert,
          alertContent: alertContent,
          selectedTheme: selectedTheme,
          selectedDesign: selectedDesign,

          setSideNavScrollPosition: onChangeScrollBarPosition,
          setActiveUserData: setActiveUserData,
          toggleSettings: toggleSettings,
          changeActivetab: ChangeActivetab,
          setOpenMail: toggleEmailContainer,
          setOpenInbox: toggleInboxOpt,
          OnSetActiveAdminOption: OnSetActiveAdminOption,
          toggleAdminOptions: toggleAdminOptions,
          onChangeRecordsPageRecords: onChangeRecordsPageRecords,
          updateUserType: updateUserType,
          updateDesingPreviewData: updateDesingPreviewData,
          setactiveFlowData: updateActiveFlowData,
          setShowAlert: setShowAlert,
          setAlertContent: updateAlertContent,
          setSelectedTheme: setSelectedTheme,

          ChangeUserActivetab: ChangeUserActivetab,
          setChatBot: toggleChatBot,
          setChatData: setChatData,
          setTransferTicketOpen: toggleTransferTicket,
          setReadEmails: updateEmails,
          setNewEmailRecords: setNewEmailRecords,
          setFlowsTrigger: setFlowsTrigger,
          setUserCart: setCartItems,
          setSearchInputForArticles: onChangeSearchInput,
          setSelectedDesign: (design) => setSelectedDesign(design)
        }}
      >
        <div
          style={{ width: '100vw', height: '100vh ' }}
        >
          {/* Main router for the app */}
          <RouterProvider router={router} />
          {/* Global alert list */}
          <AlertList />
        </div>
      </WonContext.Provider>
    </>
  );
}