// Import the createBrowserRouter function from react-router-dom
import { createBrowserRouter } from "react-router-dom";

// Import all page and component modules used in the routes
import LoginPage from "./modules/LoginPage/pages/login.jsx";
import ProtectedRoute from "./modules/ProtectedRoute/ProtectedRoute.jsx";

// Admin Testing modules
import Admin from "./modules/Admin-Portal/Admin/pages/Admin";
import AdminDashboard from "./modules/Admin-Portal/Admin/pages/AdminDashboard";
import Alerts from "./modules/Admin-Portal/Alerts/pages/Alerts.jsx";
import AllDesigns from "./modules/Admin-Portal/Design/pages/AllDesigns";
import AllFeedbacks from "./modules/Admin-Portal/Feedback/pages/AllFeedbacks.jsx";
import AllNotifications from "./modules/Admin-Portal/Notifications/pages/AllNotifications.jsx";
import AllReports from "./modules/Admin-Portal/Reports/ReportsTable/AllReports.jsx";
import AllTemplates from "./modules/Admin-Portal/Templates/pages/AllTemplates";
import AllWorkflows from "./modules/Admin-Portal/WorkflowAutomator/pages/AllWorkflows";
import Apps from "./modules/Admin-Portal/Apps/pages/Apps";

// Import additional admin portal components
import Catalogs from "./modules/Admin-Portal/Design/components/Catalogs/Catalogs.jsx";
import CMDBTable from "./modules/Admin-Portal/Tables/CMDBTable/pages/CMDBTable.jsx";
import CompaniesTable from "./modules/Admin-Portal/Tables/CompaniesTable/CompaniesTable.jsx";
import CompanyDetailedView from "./modules/Admin-Portal/Tables/CompaniesTable/CompanyDetailedView/CompanyDetailedView.jsx";
import ConnectionsDetailView from "./modules/Admin-Portal/Tables/ConnectionsTable/pages/ConnectionsDetailedView";
import ConnectionsTable from "./modules/Admin-Portal/Tables/ConnectionsTable/pages/ConnectionTable.jsx";
import ContactUs from "./modules/Admin-Portal/SendEmail/ContactUs.jsx";
import CreateAlerts from "./modules/Admin-Portal/Alerts/pages/CreateAlerts.jsx";
import CreateCompany from "./modules/Admin-Portal/Tables/CompaniesTable/CreateCompany/CreateCompany.jsx";
import ChooseConnectionType from "./modules/Admin-Portal/Tables/ConnectionsTable/pages/ChooseConnectionType";
import CreateDepartment from "./modules/Admin-Portal/Tables/DepartmentsTable/CreateDepartment/CreateDepartment.jsx";
import CreateFeedback from "./modules/Admin-Portal/Feedback/pages/CreateFeedback.jsx";
import CreateFeedbackScreens from "./modules/Admin-Portal/Feedback/pages/CreateFeedbackScreens.jsx";
import CreateLocations from "./modules/Admin-Portal/Tables/LocationsTable/CreateLocations/CreateLocations";
import CreateNotification from "./modules/Admin-Portal/Notifications/pages/CreateNotification.jsx";
import CreateTemplate from "./modules/Admin-Portal/Templates/pages/CreateTemplate.jsx";
import CreateUser from "./modules/Admin-Portal/Tables/UsersTable/CreateUser/CreateUser.jsx";
import CustomDateTimePicker from "./modules/Admin-Portal/WorkflowAutomator/pages/WorkflowV2/NodeConfigs/DateTimePicker/CustomDatePicker";
import ChatBot from "./modules/UserPortal/UserPortal-InternalFlow/Chat/Chat";
import CreateTable from "./modules/Admin-Portal/Tables/CreateNewTable/CreateTable.jsx";
import CreateConnection from "./modules/Admin-Portal/Tables/ConnectionsTable/pages/CreateConnection.jsx";

import DepartmentDetailsView from "./modules/Admin-Portal/Tables/DepartmentsTable/DepartmentDetailsView/DepartmentDetailsView.jsx";
import DepartmentsListView from "./modules/Admin-Portal/Tables/DepartmentsTable/DepartmentsListView.jsx";
import DesignForm from "./modules/Admin-Portal/Design/pages/CreateDesign.jsx";
import DesignTemplates from "./modules/Admin-Portal/Design/components/DesignTemplates/DesignTemplates.jsx";
import EmailModel from "./modules/Admin-Portal/SendEmail/pages/EmailModal.jsx";
import FeedBackTemplate from "./modules/Admin-Portal/Feedback/pages/FeedBackTemplate.jsx";
import FeedbackDetailedView from "./modules/Admin-Portal/Feedback/pages/FeedbackDetailedView.jsx";
import FeedBack from "./modules/Admin-Portal/Feedback/pages/Feedback.jsx";
import FeedbackUserView from "./modules/Admin-Portal/Feedback/pages/FeedbackUserView.jsx";

import HomePage from "./modules/GreetingPage/pages/HomePage.jsx";
import DemoForm from "./modules/GreetingPage/pages/DemoForm.jsx";
import GroupTableCreateView from "./modules/Admin-Portal/Tables/GroupTable/GroupTableCreateView/GroupTableCreateView.jsx";
import GroupTableDetailView from "./modules/Admin-Portal/Tables/GroupTable/GroupTableDetailView/GroupTableDetailView.jsx";
import GroupTableListView from "./modules/Admin-Portal/Tables/GroupTable/GroupTableListView.jsx";

import Help from "./modules/Admin-Portal/Help/pages/Help.jsx";

import LocationDetailView from "./modules/Admin-Portal/Tables/LocationsTable/LocationDetailView/LocationDetailView";
import LocationsTableListView from "./modules/Admin-Portal/Tables/LocationsTable/LocationsTableListView";
import LinkedInSignInButton from "./modules/Admin-Portal/Apps/components/LinkedIn/LinkedIn.jsx";

import MyGroupTickets from "./modules/Admin-Portal/MyGroupsTickets/pages/MyGroupTickets.jsx";
import MyTickets from "./modules/Admin-Portal/MyTickets/pages/MyTickets.jsx";
import MyCalendar from "./modules/Admin-Portal/Calender/pages/Calender";

import NotificationTemplates from "./modules/Admin-Portal/Notifications/pages/NotificationTemplates";

import PreviewNotification from "./modules/Admin-Portal/Notifications/pages/PreviewNotification.jsx";
import PreviewTemplate from "./modules/Admin-Portal/Templates/pages/TemplatePreview";
import PreviewFeedback from "./modules/Admin-Portal/Feedback/pages/PreviewFeedback.jsx";

import Recieved from "./modules/Admin-Portal/Inbox/Recieved/Recieved";
import Register from "./modules/SignupPage/pages/Register.jsx";
import RoleDetailedView from "./modules/Admin-Portal/Tables/RolesTable/pages/RoleDetailedView.jsx";
import RolesTable from "./modules/Admin-Portal/Tables/RolesTable/pages/Rolestable.jsx";
import CreateRole from "./modules/Admin-Portal/Tables/RolesTable/pages/CreateRole.jsx";

import Scheduled from "./modules/Admin-Portal/Inbox/Scheduled/Scheduled";
import Send from "./modules/Admin-Portal/Inbox/Send/Send";
import TemplateCards from "./modules/Admin-Portal/Templates/pages/TemplateCards";
import TicketDetailsView from "./modules/Admin-Portal/TicketDetailsView/TicketDetailsView";
import Trash from "./modules/Admin-Portal/Inbox/Trash/Trash";

import UserDetailedView from "./modules/Admin-Portal/Tables/UsersTable/UserDetailedView/UserDetailedView.jsx";
import UsersTable from "./modules/Admin-Portal/Tables/UsersTable/UsersTable.jsx";

import WorkflowComponent from "./modules/Admin-Portal/WorkflowAutomator/pages/WorkflowV2/WorkflowV2";
import WorkflowTemplateCards from "./modules/Admin-Portal/WorkflowAutomator/pages/WorkflowTemplateCards/WorkflowTemplateCards";
import WhatsApp from "./modules/Admin-Portal/Apps/components/WhatsApp/WhatsApp.jsx";
import EventsTable from "./modules/Admin-Portal/Events/pages/EventsTable.jsx";
import EventDetailedView from "./modules/Admin-Portal/Events/pages/EventDetailedView.jsx";
import CMDBRelTable from "./modules/Admin-Portal/Tables/Relations/pages/AllRelations.jsx";
import CreateRelation from "./modules/Admin-Portal/Tables/Relations/pages/CreateRelation.jsx";
import RelationMap from "./modules/Admin-Portal/Tables/Relations/pages/RelationMap.jsx";
import AddAdminForm from "./modules/SuperAdmin/pages/AddAdminForm.jsx";
import SuperAdminFeatures from "./modules/SuperAdmin/pages/SuperAdminFeatures.jsx";
import InstanceTable from "./modules/SuperAdmin/pages/Instances.jsx";
import CommunityPage from "./modules/Community/pages/CommunityPage.jsx";
import CommunityLayout from "./modules/Community/pages/CommunityLayout.jsx";
import CommunityHome from "./modules/Community/pages/Home.jsx";
import CategoriesPage from "./modules/Community/pages/CategoriesPage.jsx";
import CategoryDetailPage from "./modules/Community/pages/CategoryDetailsPage.jsx";
import PostDetailPage from "./modules/Community/pages/PostDetailPage.jsx";
import NewPostPage from "./modules/Community/pages/NewPostPage.jsx";
import UserProfilePage from "./modules/Community/pages/UserProfile.jsx";
import GuidelinesPage from "./modules/Community/pages/CommunityGuidelines.jsx";
import DocsHomePage from "./modules/Docs/pages/DocsHomePage.jsx";
import AdminDocsPage from "./modules/Docs/pages/AdminDocsPage.jsx";
import AdminArticlePage from "./modules/Docs/pages/AdminArticlePage.jsx";
import DocsCategoryPage from "./modules/Docs/pages/DocsCategoryPage.jsx";
import DocsArticlePage from "./modules/Docs/pages/DocsArticlePage.jsx";
import LearningPage from "./modules/TrainingAndLearning/pages/TrainingPage.jsx";
import ExternalUserRegistration from "./modules/SignupPage/pages/ExternalUserRegistration.jsx";
import ChangePassword from "./modules/Admin-Portal/Account/pages/ChangePassword.jsx";
import IndustriesHome from "./modules/Industries/pages/IndustriesHome.jsx";
import PartnersHome from "./modules/Partners/pages/PartnersHome.jsx";
import BecomePartner from "./modules/Partners/pages/BecomePartner.jsx";

// ############################### USER PORTAL IMPORTS ###############################
import Announcements from "./modules/UserPortal/UserPortal-InternalFlow/Announcements/Announcements";
import Articles from "./modules/UserPortal/UserPortal-InternalFlow/Articles/Articles";
import Cart from "./modules/UserPortal/UserPortal-InternalFlow/Cart/Cart";
import ChatWindow from "./modules/UserPortal/UserPortal-InternalFlow/Chat/ChatWindow";
import Favourites from "./modules/UserPortal/UserPortal-InternalFlow/Favouries/Favourites";
import Feedback from "./modules/UserPortal/UserPortal-InternalFlow/Feedback/Feedback";
import Home from "./modules/UserPortal/UserPortal-InternalFlow/Home/Home";
import RaiseTicketForm from "./modules/UserPortal/UserPortal-InternalFlow/RaiseATicket/RaiseTicketForm";
import RaiseTicketDepartment from "./modules/UserPortal/UserPortal-InternalFlow/RaiseATicket/RaiseTicketDepartment/RaiseTicketDepartment";
import ReceiverWindow from "./modules/UserPortal/UserPortal-InternalFlow/Chat/ReceiverWindow";
import UserTickets from "./modules/UserPortal/UserPortal-InternalFlow/UserTickets/UserTickets";
import UserTicketDetailedView from "./modules/UserPortal/UserTicketDetailedView/UserTicketDetailedView";
import MFA from "./modules/MFA/MFApage.jsx";
import MFAProtectedRoute from "./modules/ProtectedRoute/MFAProtectedRoute.jsx";

import ReportCardSelection from "./modules/Admin-Portal/Reports/pages/ReportCardSelection.jsx";
import ArticlesDetailedView from "./modules/UserPortal/UserPortal-InternalFlow/Articles/ArticlesDetailedView.jsx";
import AnnouncementDetailView from "./modules/UserPortal/UserPortal-InternalFlow/Announcements/AnnouncementDetailView/AnnouncementDetailedView.jsx";
import MFAEmailLogin from "./modules/MFA/MFAEmailLogin.jsx";
import MFAKeyLogin from "./modules/MFA/MFAKeyLogin.jsx";
import PhoneNumberLogin from "./modules/LoginPage/components/PhoneNumberLogin.jsx";
import AuthenticatorApp from "./modules/MFA/AuthenticatorApp.jsx";
import BiometricAuth from "./modules/MFA/BiometricAuth.jsx";
import PhoneCall from "./modules/MFA/PhoneCall.jsx";
import Settings from "./modules/Admin-Portal/Settings/pages/Settings.jsx";
import IntegrationsTable from "./modules/Integrations/pages/IntegrationsTable.jsx";
import FlowEditor from "./modules/Integrations/pages/CreateIntegration.jsx";
import ChooseIntegraionmodes from "./modules/Integrations/pages/ChooseMode.jsx";
import Administration from "./modules/Administration/Administration.jsx";
import AllWebhooks from "./modules/Administration/Webhooks/pages/AllWebhooks.jsx";
import AdminAccount from "./modules/Admin-Portal/Account/pages/AdminAccount.jsx";
import CIRecordForm from "./modules/Admin-Portal/Tables/CMDBTable/pages/AddCIRecord.jsx";
import ChooseCIType from "./modules/Admin-Portal/Tables/CMDBTable/pages/ChooseCIType.jsx";

import Layout from "../Layout/layout.jsx";
import UserLayout from "../Layout/UserLayout.jsx";
import CreateWebhook from "./modules/Administration/Webhooks/pages/CreateWebhook.jsx";
import AllAPIKeys from "./modules/Administration/APIKeys/pages/AllAPIKeys.jsx";
import CreateAPIKey from "./modules/Administration/APIKeys/pages/CreateAPIKey.jsx";
import LoginUser from "./shared/components/TestLogin.jsx";
import WebhookHits from "./modules/Administration/Webhooks/pages/WebhookHits.jsx";
import SourceForm from "./modules/Admin-Portal/SourceForm.jsx";
import FormDesignerPage from "./modules/Admin-Portal/form/formDesignerPage.jsx";
const router = createBrowserRouter([
  // Public routes (no authentication required)
  {
    path: "/login",
    element: <LoginPage />,
    index: true,
  },
  {
    path: "/login2",
    element: <LoginUser />,
    index: true,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/request/demo",
    element: <DemoForm />,
  },
  {
    path: "/register",
    element: <Register />,
    index: true,
  },
  {
    path: "/community",
    element: <CommunityPage />,
  },
  // Community routes with nested layout
  {
    element: <CommunityLayout />,
    children: [
      {
        path: "/community/home",
        element: <CommunityHome />,
      },
      {
        path: "/community/categories",
        element: <CategoriesPage />,
      },
      {
        path: "/community/categories/:id",
        element: <CategoryDetailPage />,
      },
      {
        path: "/community/posts/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/community/posts/new",
        element: <NewPostPage />,
      },
      {
        path: "/community/user/profile",
        element: <UserProfilePage />,
      },
      {
        path: "/community/guidelines",
        element: <GuidelinesPage />,
      },
    ],
  },
  // Documentation routes
  {
    path: "/docs",
    element: <DocsHomePage />,
  },
  {
    path: "/docs/admin",
    element: <AdminDocsPage />,
  },
  {
    path: "/docs/admin/:articleId",
    element: <AdminArticlePage />,
  },
  {
    path: "/docs/:categoryId",
    element: <DocsCategoryPage />,
  },
  {
    path: "/docs/:categoryId/:articleId",
    element: <DocsArticlePage />,
  },
  // Other public routes
  {
    path: "/industries",
    element: <IndustriesHome />,
  },
  {
    path: "/global-partners",
    element: <PartnersHome />,
  },
  {
    path: "/tutorials",
    element: <LearningPage />,
  },
  {
    path: "/learing-and-training/:contentName",
    element: <LearningPage />,
  },
  {
    path: "/external/register",
    element: <ExternalUserRegistration />,
  },
  {
    path: "/become-a-partner",
    element: <BecomePartner />,
  },
  // MFA authentication routes
  {
    path: "/email-MFA",
    element: <MFAEmailLogin />,
  },
  {
    path: "/passkey-MFA",
    element: <MFAKeyLogin />,
  },
  {
    path: "/sms-MFA",
    element: <PhoneNumberLogin />,
  },
  {
    path: "/authenticator-MFA",
    element: <AuthenticatorApp />,
  },
  {
    path: "/biometric-MFA",
    element: <BiometricAuth />,
  },
  {
    path: "/call-MFA",
    element: <PhoneCall />,
  },
  // MFA protected route
  {
    element: <MFAProtectedRoute />,
    children: [
      {
        path: "MFA",
        element: <MFA />,
      },
    ],
  },
  // Protected routes (require authentication)
  {
    element: <ProtectedRoute />,
    children: [
      // Admin layout routes
      {
        element: <Layout />,
        children: [
          // Super admin and admin routes
          {
            path: "/newsourcefile",
            element: <SourceForm />,
          },
          {
            path: "/Super Admin",
            element: <SuperAdminFeatures />,
          },
          {
            path: "/add/admin",
            element: <AddAdminForm />,
          },
          {
            path: "/all/instances",
            element: <InstanceTable />,
          },
          {
            path: "/Dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/Admin",
            element: <Administration />,
          },
          {
            path: "/form-designer",
            element: <FormDesignerPage />,
          },
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/admin/profile",
            element: <AdminAccount />,
          },
          {
            path: "/webhooks",
            element: <AllWebhooks />,
          },
          {
            path: "/create-webhook",
            element: <CreateWebhook />,
          },
          {
            path: "/webhook/:id",
            element: <WebhookHits />,
          },
          {
            path: "/api-keys",
            element: <AllAPIKeys />,
          },
          {
            path: "/create-api-key",
            element: <CreateAPIKey />,
          },
          {
            path: "/All Flows",
            element: <AllWorkflows />,
          },
          {
            path: "/All Alerts",
            element: <Alerts />,
          },
          {
            path: "/create/alert",
            element: <CreateAlerts />,
          },
          {
            path: "/All Designs",
            element: <AllDesigns />,
          },
          {
            path: "/All Notifications",
            element: <AllNotifications />,
          },
          {
            path: "/apps",
            element: <Apps />,
          },
          {
            path: "/All Feedbacks",
            element: <AllFeedbacks />,
          },
          {
            path: "/All Reports",
            element: <AllReports />,
          },
          {
            path: "/All Templates",
            element: <AllTemplates />,
          },
          {
            path: "/all-relations",
            element: <CMDBRelTable />,
          },
          {
            path: "/create/new-relation",
            element: <CreateRelation />,
          },
          {
            path: "/relation-map/:id",
            element: <RelationMap />,
          },
          {
            path: "/chatbot",
            element: <ChatBot />,
          },
          {
            path: "/Companies",
            element: <CompaniesTable />,
          },

          {
            path: "/company/:id",
            element: <CompanyDetailedView />,
          },
          {
            path: "/CMDB",
            element: <CMDBTable />,
          },
          {
            path: "/create/choose/CIType",
            element: <ChooseCIType />,
          },
          {
            path: "/cmdb/:type",
            element: <CIRecordForm />,
          },
          {
            path: "/CMDB/:id",
            element: <CIRecordForm />,
          },
          {
            path: "/create/company",
            element: <CreateCompany />,
          },
          {
            path: "create/location",
            element: <CreateLocations />,
          },
          {
            path: "/create/department",
            element: <CreateDepartment />,
          },
          {
            path: "/create/new-integration",
            element: <ChooseIntegraionmodes />,
          },
          {
            path: "/integration-editor/:mode/:id",
            element: <FlowEditor />,
          },
          {
            path: "/Connections",
            element: <ConnectionsTable />,
          },
          {
            path: "/create/new-connection",
            element: <ChooseConnectionType />,
          },
          {
            path: "/new/connection/:method/:app/:label/:type",
            element: <CreateConnection />,
          },
          {
            path: "/connection/:id",
            element: <ConnectionsDetailView />,
          },
          {
            path: "/All Events",
            element: <EventsTable />,
          },
          {
            path: "/admin/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/send-email",
            element: <ContactUs />,
          },
          {
            path: "/feedback-detailed-view",
            element: <FeedbackDetailedView />,
          },
          {
            path: "/feedback-user-view",
            element: <FeedbackUserView />,
          },
          {
            path: "/create/feedback",
            element: <FeedBackTemplate />,
          },
          {
            path: "/feedback/:id",
            element: <CreateFeedback />,
          },
          {
            path: "/Create Feedback Screens",
            element: <CreateFeedbackScreens />,
          },
          {
            path: "/feedback",
            element: <FeedBack />,
          },
          {
            path: "/create/report",
            element: <ReportCardSelection />,
          },
          {
            path: "create/group",
            element: <GroupTableCreateView />,
          },
          {
            // path: '/event/:id',by kartheek
            path: "create/event/",
            element: <EventDetailedView />,
          },
          {
            path: "/group/:id",
            element: <GroupTableDetailView />,
          },
          {
            path: "/Groups",
            element: <GroupTableListView />,
          },
          {
            path: "/All Integrations",
            element: <IntegrationsTable />,
          },
          {
            path: "/locations",
            element: <LocationsTableListView />,
          },
          {
            path: "/location/:id",
            element: <LocationDetailView />,
          },
          {
            path: "/help",
            element: <Help />,
          },
          {
            path: "/roles",
            element: <RolesTable />,
          },
          {
            path: "/create/role",
            element: <CreateRole />,
          },
          {
            path: "/role/:id",
            element: <RoleDetailedView />,
          },
          {
            path: "/departments",
            element: <DepartmentsListView />,
          },
          {
            path: "/department/:id",
            element: <DepartmentDetailsView />,
          },
          {
            path: "/users",
            element: <UsersTable />,
          },
          {
            path: "/user/:id",
            element: <UserDetailedView />,
          },
          {
            path: "/create/new-user",
            element: <CreateUser />,
          },
          {
            path: "/create-table",
            element: <CreateTable />,
          },
          {
            path: "/My Items",
            element: <MyTickets />,
          },
          {
            path: "/my-group-tickets",
            element: <MyGroupTickets />,
          },
          {
            path: "/ticket/:id",
            element: <TicketDetailsView />,
          },
          {
            path: "/inbox/recieved",
            element: <Recieved />,
          },
          {
            path: "/inbox/scheduled",
            element: <Scheduled />,
          },
          {
            path: "/inbox/send",
            element: <Send />,
          },
          {
            path: "/inbox/trash",
            element: <Trash />,
          },
          {
            path: "/Calender",
            element: <MyCalendar />,
          },
          {
            path: "/email-modal",
            element: <EmailModel />,
          },
          {
            path: "/create/template",
            element: <TemplateCards />,
          },
          {
            path: "/template-creation",
            element: <CreateTemplate />,
          },
          {
            path: "/template-preview",
            element: <PreviewTemplate />,
          },
          {
            path: "/create/notification",
            element: <NotificationTemplates />,
          },
          {
            path: "/notifications/:id",
            element: <CreateNotification />,
          },
          {
            path: "/notification-preview",
            element: <PreviewNotification />,
          },
          {
            path: "/PreviewFeedback",
            element: <PreviewFeedback />,
          },
          {
            path: "/catalogs",
            element: <Catalogs />,
          },
          {
            path: "/create/new/design/:id",
            element: <DesignForm />,
          },
          {
            path: "/create/new/design",
            element: <DesignTemplates />,
          },
          {
            path: "/datetime-picker",
            element: <CustomDateTimePicker />,
          },
          {
            path: "/flows/:id",
            element: <WorkflowComponent />,
          },
          {
            path: "/create/workflows",
            element: <WorkflowTemplateCards />,
          },
          {
            path: "/linkedin-signin",
            element: <LinkedInSignInButton />,
          },
          {
            path: "/whatsapp",
            element: <WhatsApp />,
          },
          {
            path: "/Settings",
            element: <Settings />,
          },
          {
            path: "/apps",
            element: <Apps />,
          },
        ],
      },
      // User portal layout routes
      {
        element: <UserLayout />,
        children: [
          // ############################### USER PORTAL ROUTES ###############################
          {
            path: "/user/home",
            element: <Home />,
          },
          {
            path: "/user/home/user-internal/Articles/:id",
            element: <ArticlesDetailedView />,
          },
          {
            path: "/user-internal/Announcements",
            element: <Announcements />,
          },
          {
            path: "/user-internal/Announcements/:id",
            element: <AnnouncementDetailView />,
          },
          {
            path: "/user-internal/Articles",
            element: <Articles />,
          },
          {
            path: "/user-internal/Articles/:id",
            element: <ArticlesDetailedView />,
          },
          {
            path: "/user-internal/cart",
            element: <Cart />,
          },
          {
            path: "/chat-window",
            element: <ChatWindow />,
          },
          {
            path: "/user/favouritesList",
            element: <Favourites />,
          },
          {
            path: "/user/feedback",
            element: <Feedback />,
          },
          {
            path: "/user/raise-ticket/new",
            element: <RaiseTicketForm />,
          },
          {
            path: "/user-internal/RaiseTicketDepartment",
            element: <RaiseTicketDepartment />,
          },
          {
            path: "/receiver-window",
            element: <ReceiverWindow />,
          },
          {
            path: "/user/tickets",
            element: <UserTickets />,
          },
          {
            path: "/user/ticket/:id",
            element: <UserTicketDetailedView />,
          },
        ],
      },
    ],
  },
  // Catch-all route for 404 Not Found
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center w-screen h-screen bg-white text-black">
        <p className="text-lg flex flex-col items-center gap-4">
          <span className="text-8xl text-[#e5e5e5]">404</span>
          Looks like You have Lost you way!
          <button
            className="!px-2 !py-1 md:!py-2 md:!px-4 text-white !bg-black !rounded-full font-semibold
             hover:!bg-white hover:!text-black hover:!shadow-md transition-all 
             duration-500"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
          <span className="text-sm text-gray-500">
            If you think this is an error, please contact support.
          </span>
        </p>
      </div>
    ),
  },
]);

// Export the router configuration as default
export default router;
