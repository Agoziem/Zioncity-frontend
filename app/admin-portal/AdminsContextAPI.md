Below is a Markdown file (`AdminsContextAPI.md`) documenting the `AdminLayout` component and its context providers.


# AdminLayout Component Overview

The `AdminLayout` component is designed for the Admin Portal in the application. It provides a structured layout that includes various context providers specific to administrative functions, ensuring smooth management of admissions, payments, results, and more.

## Table of Contents
- [Component Structure](#component-structure)
- [Header](#header)
- [SideBar](#sidebar)
- [Main Content Area](#main-content-area)
- [Context Providers](#context-providers)
  - [Admin Admission Context](#admin-admission-context)
  - [Admin Virtual Assistant Context](#admin-virtual-assistant-context)
  - [Admins GPT Context](#admins-gpt-context)
  - [Admin Attendance Context](#admin-attendance-context)
  - [Admin CBT Context](#admin-cbt-context)
  - [Admin Payments Context](#admin-payments-context)
  - [Admins Results Context](#admins-results-context)
  - [School Analytics Context](#school-analytics-context)
- [BackToTop Button](#backtotop-button)
- [Footer](#footer)

---

## Component Structure

The `AdminLayout` component is organized into several key parts:

- **Header**: Displays the portal name and provides a link to the Admin Portal homepage.
- **SideBar**: A navigational sidebar containing links relevant to the admin functionalities.
- **Main Content Area**: The primary area where the content (children components) is rendered.
- **Context Providers**: Multiple context providers manage various aspects of the Admin Portal.
- **BackToTop Button**: A button to scroll back to the top of the page.
- **Footer**: The footer section of the portal.

### Component Code Example

```jsx
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
import { AdminPaymentsContextProvider } from "@/data/Payments/AdminPaymentsContext";
import { AdminsResultsContextProvider } from "@/data/Results/AdminResultContext";
import { AdminsGPTContextProvider } from "@/data/EduGPT/AdminsGPT";
import { SchoolAnalyticsContextProvider } from "@/data/Analytics/SchoolAnalyticsContext";

const AdminLayout = ({ children }) => {
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

export default AdminLayout;
```

---

## Header

**Component:** `Header`

The `Header` component is responsible for displaying the name of the portal ("Admin Portal") and providing a link back to the portal's homepage.

### Props
- **portalname:** A string that specifies the name of the portal.
- **portallink:** A string that defines the URL for the portal's homepage.

---

## SideBar

**Component:** `SideBar`

The `SideBar` component serves as a navigational menu, displaying a list of links pertinent to the Admin Portal's features. The links are specified via the `navList` prop.

### Props
- **navList:** An array of navigation items relevant to the admin functionalities.

---

## Main Content Area

**Component:** `Main`

The `Main` component is where the main content of the Admin Portal is displayed. It renders the children components passed to the `AdminLayout`.

### Props
- **children:** The content or components to be rendered within the main area.

---

## Context Providers

The `AdminLayout` component integrates multiple context providers, each managing different parts of the admin functionalities within the portal.

### Admin Admission Context

**Provider:** `AdminAdmissionContextProvider`

This context manages the state and data related to the admissions process, enabling administrators to handle admissions efficiently within the portal.

### Admin Virtual Assistant Context

**Provider:** `AdminVirtualAssistantContextProvider`

The `AdminVirtualAssistantContextProvider` manages the state related to the AI-driven virtual assistant, providing automated support and assistance to administrators.

### Admins GPT Context

**Provider:** `AdminsGPTContextProvider`

This context handles the state and operations of GPT-powered functionalities for the Admin Portal, including content generation and AI-assisted tasks.

### Admin Attendance Context

**Provider:** `AdminAttendanceContextProvider`

The `AdminAttendanceContextProvider` manages the state related to attendance tracking and management, allowing admins to monitor attendance records.

### Admin CBT Context

**Provider:** `AdminCBTContextProvider`

This context provider manages the Computer-Based Testing (CBT) functionalities, enabling admins to oversee and manage exams conducted through the portal.

### Admin Payments Context

**Provider:** `AdminPaymentsContextProvider`

The `AdminPaymentsContextProvider` handles the financial aspects of the Admin Portal, managing payments, fees, and other transactions.

### Admins Results Context

**Provider:** `AdminsResultsContextProvider`

This context manages the state related to student results, enabling administrators to oversee and manage result records within the portal.

### School Analytics Context

**Provider:** `SchoolAnalyticsContextProvider`

The `SchoolAnalyticsContextProvider` handles the data and state related to school-wide analytics, providing insights and reports on various metrics.

---

## BackToTop Button

**Component:** `BackToTop`

The `BackToTop` component provides a button that, when clicked, scrolls the page back to the top. It enhances user navigation, especially on long pages.

---

## Footer

**Component:** `Footer`

The `Footer` component is the bottom section of the portal, typically containing links, copyright information, and other relevant details.

---

This Markdown file serves as a comprehensive guide to the `AdminLayout` component, detailing its structure, functionality, and the context providers that ensure efficient state management for various administrative tasks.


### Usage:
- **Copy and Paste** the content into a `.md` file in your project, e.g., `admin_layout_overview.md`.
- **Expand as Needed**: Add more details or sections if there are additional functionalities or complexities.
- **Keep Updated**: Ensure this documentation is maintained as the `AdminLayout` component evolves. 

This file helps in understanding how the `AdminLayout` component is structured and how each context provider contributes to the overall functionality of the Admin Portal.