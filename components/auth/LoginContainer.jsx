"use client";

import ClientOnly from "../ClientOnly";
import Link from "next/link";

import { isEmpty } from "@/lib/utils/isEmpty";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RiUser4Line } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { loginController } from "@/lib/controllers/auth.controller";
import { fetchUserInfos } from "@/redux/slices/userSlice";
import { redirect, usePathname, useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginContainer() {
  const { push } = useRouter();
  const { user } = useSelector((state) => state.user);

  const path = usePathname();
  const form = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(user)) {
      redirect("/dashboard?active=general");
    }
  }, []);

  useEffect(() => {
    if (form?.current) {
      form.current.reset();
    }

    // validation email
    if (emailRegex.test(email.value.trim())) {
      setEmail((prev) => ({ ...prev, valid: true }));
    } else {
      setEmail((prev) => ({ ...prev, valid: false }));
    }

    // validation mot de passe
    if (!isEmpty(password.value) && password.value.length > 5) {
      setPassword((prev) => ({
        ...prev,
        valid: true,
      }));
    } else {
      setPassword((prev) => ({
        ...prev,
        valid: false,
      }));
    }
  }, [email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (email.valid && password.valid) {
      const res = await loginController({
        email: email.value,
        password: password.value,
      });

      if (res?.userNotFound) {
        setEmail((prev) => ({ ...prev, valid: false }));
      } else if (res?.passwordIncorrect) {
        setPassword((prev) => ({ ...prev, valid: false }));
      } else {
        dispatch(fetchUserInfos(res));
        window.location = "/dashboard";
      }
    }
  };

  return (
    <ClientOnly>
      <div className="flex justify-center items-center w-full min-h-[100vh] flex-col">
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-max"
        >
          <div className="w-full">
            <label htmlFor="" className="z-10 text-3xl text-white font-bold">
              Se connecter
            </label>
            <div className="h-1 bg-white rounded-xl w-3/5" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col relative justify-center">
              <input
                required
                type="text"
                placeholder="Adresse email"
                className={`rounded-3xl h-11 pl-5 pr-10 peer
                ${
                  isSubmit && !email.valid
                    ? "bg-red-400 text-slate-50 placeholder:text-slate-50 caret-slate-50"
                    : "border-transparent"
                }
                `}
                value={email.value}
                onChange={(e) =>
                  setEmail((prev) => ({ ...prev, value: e.target.value }))
                }
              />
              <i
                className={`absolute right-5
              ${isSubmit && !email.valid ? "text-slate-50" : "text-slate-400"}
              `}
              >
                <RiUser4Line size={"1rem"} />
              </i>
            </div>
            <div className="flex flex-col relative justify-center">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                className={`rounded-3xl h-11 pl-5 pr-10
                 ${
                   isSubmit && !password.valid
                     ? "bg-red-400 text-slate-50 placeholder:text-slate-50 caret-slate-50"
                     : "border-transparent"
                 }
                `}
                value={password.value}
                onChange={(e) =>
                  setPassword((prev) => ({ ...prev, value: e.target.value }))
                }
              />
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(false)}
                  className={`absolute right-5 cursor-pointer
                   ${
                     isSubmit && !password.valid
                       ? "text-slate-50"
                       : "text-slate-400"
                   }
                  `}
                >
                  <VscEye size={"1rem"} />
                </i>
              ) : (
                <i
                  onClick={() => setShowPassword(true)}
                  className={`absolute right-5 cursor-pointer
                   ${
                     isSubmit && !password.valid
                       ? "text-slate-50"
                       : "text-slate-400"
                   }
                  `}
                >
                  <VscEyeClosed size={"1rem"} />
                </i>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="text-white font-semibold h-11 rounded-3xl buttonGradient"
          >
            Envoyer
          </button>
        </form>
        <p className="text-white text-xs w-max py-2 flex items-center gap-2">
          N{"'"}as pas encore de compte ?
          <Link href={"/auth/register"} className="w-max group">
            <span className="text-xs text-slate-950 group-hover:underline">
              S{"'"}inscrire
            </span>
          </Link>
        </p>
      </div>
    </ClientOnly>
  );
}
