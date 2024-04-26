import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapJs from "@/components/BootstrapJs";
import "./global.css";
import { SchoolContextProvider } from "@/data/Schoolcontextdata";
import { TeacherContextProvider } from "@/data/Teachercontextdata";
import { StudentsContextProvider } from "@/data/Studentcontextdata";
import { AdminContextProvider } from "@/data/Admincontextdata";
import { AccountantContextProvider } from "@/data/Accountantcontextdata";
import { SidebartoggleRefProvider } from "@/components/sidebar/sideBarTogglerContext";
 
export const metadata = {
  title: "City of God",
  description:
    "City of God App is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="body">
        <SchoolContextProvider>
          <TeacherContextProvider>
            <StudentsContextProvider>
              <AdminContextProvider>
                <AccountantContextProvider>
                  <SidebartoggleRefProvider>
                  {children}
                  </SidebartoggleRefProvider>
                </AccountantContextProvider>
              </AdminContextProvider>
            </StudentsContextProvider>
          </TeacherContextProvider>
        </SchoolContextProvider>
        <BootstrapJs />
      </body>
    </html>
  );
};

export default Rootlayout;
