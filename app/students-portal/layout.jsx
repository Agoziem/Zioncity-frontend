import React from "react";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import Main from "@/components/Main/Main";
import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import navList from "./navitem";
import { StudentVirtualAssistantContextProvider } from "@/data/AiVirtualAssistant/StudentVirtualAssistant";
import { StudentCBTContextProvider } from "@/data/CBT/StudentCBTContext";
import { StudentsGPTContextProvider } from "@/data/EduGPT/StudentsGPT";
import { StudentPaymentsContextProvider } from "@/data/Payments/StudentPaymentsContext";
import { StudentResultsContextProvider } from "@/data/Results/StudentResultContext";
import { PerformanceAnalyticsContextProvider } from "@/data/Analytics/PerformanceAnalyticsContext";
import { StudyScheduleContextProvider } from "@/data/Schedules/StudyScheduleContext";

const Studentslayout = ({ children }) => {
  return (
    <div>
      <Header portalname={"Students Portal"} portallink={"students-portal"} />
      <SideBar navList={navList} />
      <StudentVirtualAssistantContextProvider>
        <StudentCBTContextProvider>
          <StudentsGPTContextProvider>
            <StudentPaymentsContextProvider>
              <StudentResultsContextProvider>
                <PerformanceAnalyticsContextProvider>
                  <StudyScheduleContextProvider>
                    <Main>{children}</Main>
                  </StudyScheduleContextProvider>
                </PerformanceAnalyticsContextProvider>
              </StudentResultsContextProvider>
            </StudentPaymentsContextProvider>
          </StudentsGPTContextProvider>
        </StudentCBTContextProvider>
      </StudentVirtualAssistantContextProvider>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default Studentslayout;
