import "./globals.css";
import Nav from "../components/Headers/Nav";
import Provider from "../utils/Provider";

export const metadata = {
    title: 'City of God',
    description: 'City of God App is a Software for School management, including portal for students, teachers and management. It also includes a platform for online learning, payment and exams.'
};

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default Rootlayout;
