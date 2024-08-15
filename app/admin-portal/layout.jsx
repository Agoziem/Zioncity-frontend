import React from "react";
import Header from "@/components/header/Header";
import SideBar from "@/components/sidebar/SideBar";
import Main from "@/components/Main/Main";
import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import navList from "./navitem";
import { AdminAdmissionContextProvider } from "@/data/Admissions/AdminAdmissionContext";
import { AdminVirtualAssistantContextProvider } from "@/data/AiVirtualAssistant/AdminVirtualAssistant";
import { AdminAttendanceContextProvider } from "@/data/Attendance/AdminAttendanceContext";
import { AdminCBTContextProvider } from "@/data/CBT/AdminCBTContext";
import { AdminPaymentsContextProvider } from "@/data/Payments/AdminPaymentsContext copy";
import { AdminsResultsContextProvider } from "@/data/Results/AdminResultContext";
import { AdminsGPTContextProvider } from "@/data/EduGPT/AdminsGPT";
import { SchoolAnalyticsContextProvider } from "@/data/Analytics/SchoolAnalyticsContext";

const Adminlayout = ({ children }) => {
  return (
    <div>
      <Header portalname={"Admin Portal"} portallink={"admin-portal"} />
      <SideBar navList={navList} />
      <AdminAdmissionContextProvider>
        <AdminVirtualAssistantContextProvider>
          <AdminsGPTContextProvider>
            <AdminAttendanceContextProvider>
              <AdminCBTContextProvider>
                <AdminPaymentsContextProvider>
                  <AdminsResultsContextProvider>
                    <SchoolAnalyticsContextProvider>
                      <Main>{children}</Main>
                    </SchoolAnalyticsContextProvider>
                  </AdminsResultsContextProvider>
                </AdminPaymentsContextProvider>
              </AdminCBTContextProvider>
            </AdminAttendanceContextProvider>
          </AdminsGPTContextProvider>
        </AdminVirtualAssistantContextProvider>
      </AdminAdmissionContextProvider>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default Adminlayout;
