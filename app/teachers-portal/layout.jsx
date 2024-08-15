import React from "react";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import Main from "@/components/Main/Main";
import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import navList from "./navitem";
import { TeacherVirtualAssistantContextProvider } from "@/data/AiVirtualAssistant/TeacherVirtualAssistant";
import { TeacherAttendanceContextProvider } from "@/data/Attendance/TeacherAttendanceContext";
import { TeachersGPTContextProvider } from "@/data/EduGPT/TeachersGPT";
import { TeachersResultContextProvider } from "@/data/Results/TeacherResultContext";

const TeachersLayout = ({ children }) => {
  return (
    <div>
      <Header portalname={"Teachers Portal"} portallink={"teachers-portal"} />
      <SideBar navList={navList} />
      <TeacherVirtualAssistantContextProvider>
        <TeacherAttendanceContextProvider>
          <TeachersGPTContextProvider>
            <TeachersResultContextProvider>
              <Main>{children}</Main>
            </TeachersResultContextProvider>
          </TeachersGPTContextProvider>
        </TeacherAttendanceContextProvider>
      </TeacherVirtualAssistantContextProvider>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default TeachersLayout;
