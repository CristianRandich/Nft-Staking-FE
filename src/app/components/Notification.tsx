"use client";
import React from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
}

export default function Notification({ message, type = "info" }: NotificationProps) {
  let typeClass = "notificationInfo";
  if (type === "success") typeClass = "notificationSuccess";
  if (type === "error") typeClass = "notificationError";

  return (
    <div className={`notificationContainer ${typeClass}`}>
      {message}
    </div>
  );
}
