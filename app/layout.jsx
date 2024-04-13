import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "../utils/Provider";
import BootstrapJs from "@/components/BootstrapJs";
import "./global.css";

export const metadata = {
    title: 'City of God',
    description: 'City of God App is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.'
};

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body className='body'>
                <Provider>
                        {children}
                </Provider>
                <BootstrapJs />
            </body>
        </html>
    );
};

export default Rootlayout;
