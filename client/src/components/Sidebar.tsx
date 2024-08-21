import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { IoAnalytics } from "react-icons/io5";
import { SiPowerpages } from "react-icons/si";
import { ImUpload3 } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { Image } from "@nextui-org/react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("/");

  const handleTabClick = (path: string) => {
    navigate(path);
    setSelectedTab(path);
  }

  const getTabClasses = (path: string) => {
    return path === window.location.pathname ? 'bg-[#ffffff]' : 'text-[#fff]';
  }
  
  return (
    <aside className="h-screen bg-darkGreen w-[15rem] fixed">
      <nav className='h-full flex flex-col shadow-sm'>
        <h1 className="py-4 flex justify-center items-center gap-x-2 text-2xl font-bold text-[#fff]">Fin Fusion</h1>
        <div className={`py-4 m-2 rounded-full flex items-center cursor-pointer w-[14rem] ${getTabClasses('/bhasha-admin')}`} onClick={()=> {handleTabClick('/bhasha-admin')}}>
          <IoAnalytics style={{color: window.location.pathname === '/bhasha-admin' ? "#172554" : "#fff"}} className={`ml-4 mr-2 w-6 h-6} `} />
          <h1 className={`font-semibold ${window.location.pathname === '/bhasha-admin' ? 'text-navyBlue' : 'text-white'} 'w-20'`}>Analytics</h1>
        </div>
        <div className={`py-4 m-2 rounded-full flex items-center cursor-pointer w-[14rem] ${getTabClasses('/bhasha-admin/paragraphs')}`} onClick={()=> {handleTabClick('/bhasha-admin/paragraphs')}}>
          <SiPowerpages style={{color: window.location.pathname === '/bhasha-admin/paragraphs' ? "#172554" : "#fff"}} className={`ml-4 mr-2 w-6 h-6} `} />
          <h1 className={`font-semibold ${window.location.pathname === '/bhasha-admin/paragraphs' ? 'text-navyBlue' : 'text-white'} 'w-20'`}>Paragraphs</h1>
        </div>
        <div className={`py-4 m-2 rounded-full flex items-center cursor-pointer w-[14rem] ${getTabClasses('/bhasha-admin/submissions')}`} onClick={()=> {handleTabClick('/bhasha-admin/submissions')}}>
          <ImUpload3 style={{color: window.location.pathname === '/bhasha-admin/submissions' ? "#172554" : "#fff"}} className={`ml-4 mr-2 w-6 h-6} `} />
          <h1 className={`font-semibold ${window.location.pathname === '/bhasha-admin/submissions' ? 'text-navyBlue' : 'text-white'} 'w-20'`}>Submissions</h1>
        </div>
        <div className={`py-4 m-2 rounded-full flex items-center cursor-pointer w-[14rem] ${getTabClasses('/bhasha-admin/users')}`} onClick={()=> {handleTabClick('/bhasha-admin/users')}}>
          <FaUserAlt style={{color: window.location.pathname === '/bhasha-admin/users' ? "#172554" : "#fff"}} className={`ml-4 mr-2 w-6 h-6} `} />
          <h1 className={`font-semibold ${window.location.pathname === '/bhasha-admin/users' ? 'text-navyBlue' : 'text-white'} 'w-20'`}>Users</h1>
        </div>
        <div className={`py-4 m-2 rounded-full flex items-center cursor-pointer w-[14rem] ${getTabClasses('/bhasha-admin/upload')}`} onClick={()=> {handleTabClick('/bhasha-admin/upload')}}>
          <FaPlus style={{color: window.location.pathname === '/bhasha-admin/upload' ? "#172554" : "#fff"}} className={`ml-4 mr-2 w-6 h-6} `} />
          <h1 className={`font-semibold ${window.location.pathname === '/bhasha-admin/upload' ? 'text-navyBlue' : 'text-white'} 'w-22'`}>New Page</h1>
        </div>
      </nav>
    </aside>
  )
};

export default Sidebar;