"use client";

import { isEmpty } from "@/lib/utils/isEmpty";
import { createContext, useState, useEffect } from "react";

// icons
import { IoClose } from "react-icons/io5";

export const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const timer = 6000;

  const timers = messages.map((_, index) => {
    return setTimeout(() => {
      setMessages((prev) => {
        let newState = [...prev];
        newState.splice(index, 1);
        return newState;
      });
    }, timer);
  });

  useEffect(() => {
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [messages, timers]);

  const handleShowToast = ({ value, type, strong }) => {
    setMessages((prev) => {
      let newMessage = { value, type, strong };
      let newState = [newMessage, ...prev];
      return newState;
    });
  };

  return (
    <ToastContext.Provider value={{ handleShowToast }}>
      <div className="w-full relative">
        {children}

        {!isEmpty(messages) && (
          <div
            className={`fixed flex left-0 z-20 w-[100vw] h-[100vh] min-w-[100vw] min-h-[100vh] rounded-xl pointer-events-none`}
            style={{
              top: "0",
              alignItems: "flex-end",
            }}
          >
            {messages.map((mes, index) => (
              <div
                key={index}
                style={{
                  maxWidth: "20rem",
                  bottom: `${0.5 + index * 0.15}rem`,
                  left: `${0.5 + index * 0.15}rem`,
                }}
                className={`relative rounded-lg shadow-md px-4 py-3 flex gap-2 items-center ${
                  mes.type === "error" ? "bg-red-400" : "bg-green-400"
                }`}
              >
                <div className="w-full">
                  <p className="text-white whitespace-normal text-sm">
                    {mes.value}{" "}
                    <span className="font-bold text-sm">{mes.strong}</span>
                  </p>
                </div>
                <i
                  onClick={() => {
                    setMessages((prev) => {
                      let newState = [...prev];
                      newState.splice(index, 1);
                      return newState;
                    });
                  }}
                  style={{
                    background: "rgba(255, 255, 255, 0.25)",
                  }}
                  className="text-white rounded-full cursor-pointer flex justify-center items-center w-8 h-8 min-w-8 min-h-8"
                >
                  <IoClose size={"1.5rem"} />
                </i>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
}
