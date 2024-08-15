import React from "react";
import Main from "@/components/Main/Main";
import BackToTop from "@/components/backtotopbutton/BackToTop";
import Footer from "@/components/footer/Footer";
import navList from "./navitem";
import { SchoolContextProvider } from "@/data/Schoolcontextdata";
import { StudentAdmissionContextProvider } from "@/data/Admissions/StudentAdmissionContext";
import { NewStudentCBTContextProvider } from "@/data/CBT/NewStudentCBTContext";

const NewStudentLayout = ({ children }) => {
  return (
    <div>
      <SchoolContextProvider>
        <StudentAdmissionContextProvider>
          <NewStudentCBTContextProvider>
            <Main>{children}</Main>
          </NewStudentCBTContextProvider>
        </StudentAdmissionContextProvider>
      </SchoolContextProvider>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default NewStudentLayout;
