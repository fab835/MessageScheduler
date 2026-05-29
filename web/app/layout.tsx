import type { Metadata } from "next";
import type { ReactNode } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Message Scheduler",
  description: "Schedule messages and track their delivery status."
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
    </head>
    <body>{children}</body>
  </html>
);

export default RootLayout;
