import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapJs from "@/components/BootstrapJs";
import "./global.css";
import { SchoolContextProvider } from "@/data/Schoolcontextdata";
import { SidebartoggleRefProvider } from "@/components/sidebar/sideBarTogglerContext";
import { ChatroomContextProvider } from "@/data/Chat/ChatroomContext";
import { ElibraryContextProvider } from "@/data/Elibrary/ElibraryContext";
import { AlertsContextProvider } from "@/data/Messages/AlertsContext";
import { MessagesContextProvider } from "@/data/Messages/MessagesContext";
import { CartContextProvider } from "@/data/Payments/CartContext";
import { AdminContextProvider } from "@/data/Admincontextdata";
import { TeacherContextProvider } from "@/data/Teachercontextdata";
import { StudentsContextProvider } from "@/data/Studentcontextdata";
import { SchoolScheduleContextProvider } from "@/data/Schedules/SchoolScheduleContext";

export const metadata = {
  title: "City of Glory",
  description:
    "City of God App is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.",
};

const Rootlayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="body">
        <SchoolContextProvider>
          <AdminContextProvider>
            <TeacherContextProvider>
              <StudentsContextProvider>
                <ChatroomContextProvider>
                  <ElibraryContextProvider>
                    <AlertsContextProvider>
                      <MessagesContextProvider>
                        <CartContextProvider>
                          <SchoolScheduleContextProvider>
                            <SidebartoggleRefProvider>
                              {children}
                            </SidebartoggleRefProvider>
                          </SchoolScheduleContextProvider>
                        </CartContextProvider>
                      </MessagesContextProvider>
                    </AlertsContextProvider>
                  </ElibraryContextProvider>
                </ChatroomContextProvider>
              </StudentsContextProvider>
            </TeacherContextProvider>
          </AdminContextProvider>
        </SchoolContextProvider>
        <BootstrapJs />
      </body>
    </html>
  );
};

export default Rootlayout;
