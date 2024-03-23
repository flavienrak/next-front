"use client";

import ClientOnly from "@/components/ClientOnly";
import Link from "next/link";

import { useEffect, useState } from "react";
import {
  createUserController,
  getUsersController,
} from "@/lib/controllers/user.controller";

export default function HomeContainer() {
  const [name, setName] = useState({ value: "", valid: false });
  const [username, setUsername] = useState({ value: "", valid: false });
  const [email, setEmail] = useState({ value: "", valid: false });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getUsersController();
      setUsers(res);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUserController({
      name: name.value,
      username: username.value,
      email: email.value,
    });

    const res = await getUsersController();
    setUsers(res);
  };

  return (
    <ClientOnly>
      <div className="min-h-[100vh] gap-4 flex items-center justify-center flex-col w-full">
        <div className="w-full flex items-center justify-center py-2">
          <Link
            href={"/dashboard"}
            className="text-primaryColor hover:underline transition-all w-max"
          >
            Dashboard
          </Link>
        </div>
        <div className="h-max relative flex items-center justify-evenly w-full">
          <section className="flex h-auto flex-col w-[22rem]">
            <p className="w-max px-2">Add new user</p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center py-4 rounded-md gap-2"
            >
              <div className="flex items-center justify-center ">
                <input
                  value={name.value}
                  type="text"
                  placeholder="Nom"
                  className="w-full border focus:border-gray-500 transition-all duration-100"
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
                  className="w-full  border focus:border-gray-500 transition-all duration-100"
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
                  className="w-full  border focus:border-gray-500 transition-all duration-100"
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
                className="bg-primary py-2 rounded-md text-textWhite mt-2 "
              >
                Envoyer
              </button>
            </form>
          </section>
          <section className="w-[28rem] h-full flex flex-col gap-4">
            <p className="px-2 bg-primary rounded-md py-2 w-full text-center text-textWhite">
              All users
            </p>
            <div>
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex gap-2 items-center border-b w-full justify-between p-2"
                >
                  <input type="checkbox" className="h-auto w-max" />
                  <p className=" w-max">{user.name}</p>
                  <p className=" w-max">{user.username}</p>
                  <label className=" w-max">{user.email}</label>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ClientOnly>
  );
}
