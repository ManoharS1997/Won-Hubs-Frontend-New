import { BsPersonWorkspace, BsPersonRolodex, BsCalendarDateFill } from "react-icons/bs";
import { HiViewBoards, HiDotsHorizontal } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi2";
import {
  RiSettings5Fill, RiDeleteBinLine, RiBarChartBoxAiLine, RiFeedbackLine, RiAlertFill,
  RiTeamFill, RiUserCommunityLine
} from "react-icons/ri";
import { RxOpenInNewWindow } from "react-icons/rx";
import { ImFileText2, ImInsertTemplate, ImTable2, ImCalendar } from "react-icons/im";
import { TfiTimer } from "react-icons/tfi";
import {
  MdOutlineManageAccounts, MdOutlineHub, MdSecurity, MdContentCopy,
  MdAddLink, MdOutlineOpenInNew, MdAccessibilityNew, MdDeleteOutline,
  MdOutlineEditNote, MdOutlineFeedback, MdEventAvailable, MdModeEditOutline,
  MdOutlineDomainAdd, MdOutlineMail, MdPassword, MdBusiness, MdOutlinePhotoCameraFront,
  MdOutlineDescription, MdDoubleArrow
} from "react-icons/md";
import { CiUser } from "react-icons/ci";
import {
  IoMdAdd, IoIosArrowBack, IoIosClose, IoIosArrowRoundForward, IoMdMail,
} from "react-icons/io";
import {
  IoKey, IoAddOutline, IoNotificationsOutline, IoChevronBack, IoExitOutline,
  IoEye, IoEyeOff, IoSchool, IoGlobe, IoChevronBackOutline
} from "react-icons/io5";
import {
  GrRadialSelected, GrMore, GrResources, GrShieldSecurity, GrIntegration,
  GrAppsRounded, GrDocumentUpdate
} from "react-icons/gr";
import { FaStarOfLife, FaMinus, FaUserShield, FaSearch, FaHospitalAlt, FaTools, FaBuilding,FaUserCheck,
 FaTasks,FaPaperclip,FaDollarSign,FaUsersCog,FaBook,FaUser,
  FaCalendarDay,FaObjectGroup,FaHashtag
} from "react-icons/fa";
import {
  TbApi, TbHeartRateMonitor, TbAlertTriangle, TbReportAnalytics, TbReportSearch,
  TbTemplate, TbUsers, TbTransform, TbLayoutDashboardFilled, TbSettingsCog, TbUserCode,
  TbUserQuestion, TbTimezone, TbNumber123
} from "react-icons/tb";
import { GiServerRack, GiHamburgerMenu } from "react-icons/gi";
import { SiAmazonsimpleemailservice, SiTestcafe, SiDatabricks } from "react-icons/si";
import {
  PiWebhooksLogoFill, PiPlugsConnected, PiUsersFourFill, PiPasswordBold,
  PiUserGearBold, PiPhoneFill, PiBuildingOfficeLight
} from "react-icons/pi";
import { LuFileClock, LuGitPullRequestCreateArrow, LuSearch, LuLink2 } from "react-icons/lu";
import { BiCode } from "react-icons/bi";
import { FcWorkflow, FcDepartment } from "react-icons/fc";
import { BsCalendar4Event, BsFillPersonVcardFill } from "react-icons/bs";
import { GoProjectTemplate, GoGrabber } from "react-icons/go";
import { TiFlowMerge } from "react-icons/ti";
import { FaBuildingShield, FaHandshakeSimple, FaStore, FaRocket, FaUserLarge, FaU } from "react-icons/fa6";
import { SlLocationPin, SlCloudUpload } from "react-icons/sl";
import { VscTools } from "react-icons/vsc";
import { AiOutlineSwap } from "react-icons/ai";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { RiKey2Line } from "react-icons/ri";
import { RiAdminLine } from "react-icons/ri";
import { FaSitemap ,FaPassport,FaMoneyBills,FaCrosshairs,FaUserTag } from "react-icons/fa6";
import { BiDetail } from "react-icons/bi";
import { FaPhoneAlt,FaFax  } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { TiTabsOutline } from "react-icons/ti";
import { BsFillCaretDownFill,BsFillCaretUpFill  } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { GrChannel } from "react-icons/gr";
const iconMap = {
  BsPersonWorkspace, HiViewBoards, HiUserGroup, RiSettings5Fill, HiDotsHorizontal,
  RxOpenInNewWindow, MdOutlineManageAccounts, RiDeleteBinLine, IoMdAdd, GrRadialSelected,
  GrMore, FaStarOfLife, FaMinus, TbApi, MdOutlineHub, MdSecurity, GrResources, GiServerRack,
  SiAmazonsimpleemailservice, GrShieldSecurity, PiWebhooksLogoFill, MdAddLink, SiTestcafe,
  LuFileClock, MdOutlineOpenInNew, IoKey, MdAccessibilityNew, TbHeartRateMonitor,
  MdContentCopy, MdDeleteOutline, BiCode, MdOutlineEditNote, FcWorkflow, GoProjectTemplate,
  MdOutlineFeedback, TbAlertTriangle, BsCalendar4Event, PiPlugsConnected, IoAddOutline,
  RiBarChartBoxAiLine, RiFeedbackLine, ImFileText2, IoNotificationsOutline, RiAlertFill,
  TbReportAnalytics, MdEventAvailable, TbReportSearch, TbTemplate, TiFlowMerge, ImInsertTemplate,
  IoChevronBack, TbUsers, PiUsersFourFill, FaBuildingShield, BsFillPersonVcardFill, SlLocationPin,
  FcDepartment, SiDatabricks, GrIntegration, ImTable2, MdModeEditOutline, IoExitOutline,
  TbTransform, LuGitPullRequestCreateArrow, IoIosArrowBack, IoIosClose, TbLayoutDashboardFilled,
  BsPersonRolodex, FaUserShield, GrAppsRounded, ImCalendar, TbSettingsCog, MdOutlineDomainAdd,
  FaSearch, MdOutlineMail, TbUserCode, PiPasswordBold, MdPassword, IoEye, IoEyeOff, PiUserGearBold,
  IoIosArrowRoundForward, PiPhoneFill, IoMdMail, GrDocumentUpdate, TbUserQuestion, MdBusiness,
  BsCalendarDateFill, MdOutlinePhotoCameraFront, TbTimezone, FaHospitalAlt, IoSchool, FaHandshakeSimple,
  FaStore, FaRocket, GiHamburgerMenu, LuSearch, PiBuildingOfficeLight, LuLink2, TfiTimer, RiTeamFill,
  MdOutlineDescription, FaTools, FaUserLarge, RiUserCommunityLine, TbNumber123, CiUser, VscTools,
  SlCloudUpload, IoGlobe, GoGrabber, IoChevronBackOutline, MdDoubleArrow, AiOutlineSwap, CgArrowsExchangeAltV,
  RiKey2Line,RiAdminLine ,FaSitemap,FaPassport,BiDetail,FaPhoneAlt,FaFax ,FaMoneyBills ,RiShieldKeyholeLine,
  FaCrosshairs ,FaUserTag,TiTabsOutline,BsFillCaretDownFill,BsFillCaretUpFill ,GoTriangleDown,IoNewspaperOutline,
  GrChannel,FaBuilding,FaUserCheck,FaDollarSign,FaUserTag,FaTasks,FaHashtag,FaUsersCog,FaBook,FaCalendarDay,FaObjectGroup,FaUser

};

export default function renderIcons(icon, size = 20, color = "#000") {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent size={size} style={{ color }} /> : null;
}
