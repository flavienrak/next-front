"use client";

import ClientOnly from "../ClientOnly";
import Link from "next/link";

import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineAlternateEmail } from "react-icons/md";

import { RiUser4Line } from "react-icons/ri";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { isEmpty } from "@/lib/utils/isEmpty";
import { registerController } from "@/lib/controllers/auth.controller";
import { redirect, useRouter } from "next/navigation";
import { ToastContext } from "@/providers/ToastProvider";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterContainer() {
  const { push } = useRouter();
  const { handleShowToast } = useContext(ToastContext);
  const { user } = useSelector((state) => state.user);

  const form = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [nom, setNom] = useState({
    value: "",
    valid: false,
  });
  const [prenom, setPrenom] = useState({
    value: "",
    valid: false,
  });
  const [email, setEmail] = useState({
    value: "",
    valid: false,
  });
  const [password, setPassword] = useState({
    value: "",
    valid: false,
  });

  useEffect(() => {
    if (!isEmpty(user)) {
      redirect("/dashboard?active=general");
    }
  }, []);

  useEffect(() => {
    if (form?.current) {
      form.current.reset();
    }

    // validation nom
    if (nom.value.trim().length > 2) {
      setNom((prev) => ({ ...prev, valid: true }));
    } else {
      setNom((prev) => ({ ...prev, valid: false }));
    }

    // validation prenom
    if (prenom.value.trim().length > 2) {
      setPrenom((prev) => ({ ...prev, valid: true }));
    } else {
      setPrenom((prev) => ({ ...prev, valid: false }));
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
  }, [nom.value, prenom.value, email.value, password.value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (nom.valid && prenom.valid && email.valid && password.valid) {
      const res = await registerController({
        nom: nom.value,
        prenom: prenom.value,
        email: email.value,
        password: password.value,
      });

      if (res?.user) {
        handleShowToast({
          value: "Votre compte a été créé avec succès",
          strong: "Connectez-vous.",
          type: "success",
        });
        push("/auth/login");
      } else {
        handleShowToast({
          value: "Une erreur est survenue lors de la création de votre compte.",
          strong: "Réessayez.",
          type: "error",
        });
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
              Créer un compte
            </label>
            <div className="h-1 bg-white rounded-xl w-4/6" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col relative justify-center">
              <input
                required
                type="text"
                placeholder="Nom"
                className={`rounded-3xl h-11 pl-5 pr-10 peer
                ${
                  isSubmit && !nom.valid
                    ? "bg-red-400 text-slate-50 placeholder:text-slate-50 caret-slate-50"
                    : "border-transparent"
                }
                `}
                value={nom.value}
                onChange={(e) =>
                  setNom((prev) => ({ ...prev, value: e.target.value }))
                }
              />
              <i
                className={`absolute right-5
              ${isSubmit && !nom.valid ? "text-slate-50" : "text-slate-400"}
              `}
              >
                <RiUser4Line size={"1rem"} />
              </i>
            </div>
            <div className="flex flex-col relative justify-center">
              <input
                required
                type="text"
                placeholder="Prénom(s)"
                className={`rounded-3xl h-11 pl-5 pr-10 peer
                ${
                  isSubmit && !prenom.valid
                    ? "bg-red-400 text-slate-50 placeholder:text-slate-50 caret-slate-50"
                    : "border-transparent"
                }
                `}
                value={prenom.value}
                onChange={(e) =>
                  setPrenom((prev) => ({ ...prev, value: e.target.value }))
                }
              />
              <i
                className={`absolute right-5
              ${isSubmit && !prenom.valid ? "text-slate-50" : "text-slate-400"}
              `}
              >
                <RiUser4Line size={"1rem"} />
              </i>
            </div>
            <div className="flex flex-col relative justify-center">
              <input
                required
                type="text"
                id="email"
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
                <MdOutlineAlternateEmail size={"1rem"} />
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
          A déjà un compte ?
          <Link href={"/auth/login"} className="w-max group">
            <span className="text-xs text-slate-950 group-hover:underline">
              Se connecter
            </span>
          </Link>
        </p>
      </div>
    </ClientOnly>
  );
}
