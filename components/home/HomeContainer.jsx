"use client";

import { useState } from "react";
import ClientOnly from "../ClientOnly";
import { createUserController } from "@/lib/controllers/user.controller";

export default function HomeContainer() {
  const [name, setName] = useState({ value: "", valid: false });
  const [username, setUsername] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await createUserController({
      name: name.value,
      username: username.value,
      email: email.value,
    });

    console.log("res:", res);
  };

  return (
    <ClientOnly>
      <div className="min-h-[100vh] flex items-center justify-center flex-col">
        <div className="flex flex-col w-max">
          <p className="w-max px-4">User</p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center p-4 rounded-md gap-2"
          >
            <div className="flex items-center justify-center ">
              <input
                value={name.value}
                type="text"
                placeholder="Nom"
                className="w-[24rem]"
                onChange={(e) => {
                  setName((prev) => {
                    let newState = { ...prev };
                    newState.value = e.target.value;
                    return newState;
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <input
                value={username.value}
                type="text"
                placeholder="Prenom"
                className="w-[24rem]"
                onChange={(e) => {
                  setUsername((prev) => {
                    let newState = { ...prev };
                    newState.value = e.target.value;
                    return newState;
                  });
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <input
                value={email.value}
                type="text"
                placeholder="Email"
                className="w-[24rem]"
                onChange={(e) => {
                  setEmail((prev) => {
                    let newState = { ...prev };
                    newState.value = e.target.value;
                    return newState;
                  });
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-primary py-2 rounded-md text-textWhite mt-2"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </ClientOnly>
  );
}
