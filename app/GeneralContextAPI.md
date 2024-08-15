# General Context APIs Overview for City of Glory App

This document provides an overview of the various context providers used in the City of Glory App. These context APIs manage global state and data across the application, facilitating data sharing between components without the need to pass props down multiple levels.

## Table of Contents
- [School Context](#school-context)
- [Admins Context](#admin-context)
- [Teachers Context](#teacher-context)
- [Students Context](#students-context)
- [Chatroom Context](#chatroom-context)
- [E-library Context](#e-library-context)
- [Alerts Context](#alerts-context)
- [Messages Context](#messages-context)
- [Cart Context](#cart-context)
- [School Schedule Context](#school-schedule-context)
- [Sidebar Toggle Ref Context](#sidebar-toggle-ref-context)

---

## School Context
**Provider:** `SchoolContextProvider`

The **School Context** manages data related to the overall school, such as school information, settings, and other relevant data that needs to be shared across different parts of the application. It serves as the main context for accessing school-level data.

```js
import { SchoolContextProvider } from "@/data/Schoolcontextdata";
```

---

## Admin Context
**Provider:** `AdminContextProvider`

The **Admin Context** is used for managing administrative data and functionalities across the app. It allows components to access and manipulate data related to admin users, permissions, and roles.

```js
import { AdminContextProvider } from "@/data/Admincontextdata";
```

---

## Teacher Context
**Provider:** `TeacherContextProvider`

The **Teacher Context** handles data and operations specific to teachers. This includes accessing teacher profiles, managing classroom data, and interacting with student data.

```js
import { TeacherContextProvider } from "@/data/Teachercontextdata";
```

---

## Students Context
**Provider:** `StudentsContextProvider`

The **Students Context** manages student-specific data and functionalities. This context is essential for accessing student profiles, academic records, attendance, and other student-related information.

```js
import { StudentsContextProvider } from "@/data/Studentcontextdata";
```

---

## Chatroom Context
**Provider:** `ChatroomContextProvider`

The **Chatroom Context** is responsible for managing chat-related data and operations, enabling real-time communication between users. It supports functionalities such as sending and receiving messages, managing chatrooms, and notifications.

```js
import { ChatroomContextProvider } from "@/data/Chat/ChatroomContext";
```

---

## E-library Context
**Provider:** `ElibraryContextProvider`

The **E-library Context** handles data related to the digital library, including managing electronic resources such as books, journals, and other learning materials. It allows components to access and interact with the e-library resources.

```js
import { ElibraryContextProvider } from "@/data/Elibrary/ElibraryContext";
```

---

## Alerts Context
**Provider:** `AlertsContextProvider`

The **Alerts Context** manages system-wide alerts and notifications. This context is used to create, display, and manage alert messages across different components in the application.

```js
import { AlertsContextProvider } from "@/data/Messages/AlertsContext";
```

---

## Messages Context
**Provider:** `MessagesContextProvider`

The **Messages Context** is used for managing user messages, including inbox, sent messages, and other communication-related data. It provides a centralized state for handling user-to-user messaging within the application.

```js
import { MessagesContextProvider } from "@/data/Messages/MessagesContext";
```

---

## Cart Context
**Provider:** `CartContextProvider`

The **Cart Context** manages shopping cart functionalities within the application, especially for handling payments. It includes operations like adding items to the cart, calculating totals, and processing payments.

```js
import { CartContextProvider } from "@/data/Payments/CartContext";
```

---

## School Schedule Context
**Provider:** `SchoolScheduleContextProvider`

The **School Schedule Context** is responsible for managing school schedules, including class timetables, exam schedules, and other calendar events. It provides a global state for accessing and manipulating schedule-related data.

```js
import { SchoolScheduleContextProvider } from "@/data/Schedules/SchoolScheduleContext";
```

---

## Sidebar Toggle Ref Context
**Provider:** `SidebartoggleRefProvider`

The **Sidebar Toggle Ref Context** manages the state of the sidebar, including toggling its visibility. It provides a reference that allows components to control the sidebar's open/close state.

```js
import { SidebartoggleRefProvider } from "@/components/sidebar/sideBarTogglerContext";
```

---

## Conclusion

This document provides a quick reference guide to the various context providers used in the City of Glory App. Each context serves a specific purpose, helping to manage and share data across different components efficiently. For more detailed information about each context, refer to the corresponding implementation files.


### How to Use This Markdown File:
- **Copy and Paste** the content into a `.md` file in your project (e.g., `context_apis_overview.md`).
- **Expand** each section as needed with more details about specific methods, state values, or interactions that each context provider offers.
- **Maintain** this document as you add, update, or remove context providers to ensure your documentation stays accurate and helpful for developers working on the project.

This file serves as a helpful reference for developers to understand the purpose and usage of each context API in your application.