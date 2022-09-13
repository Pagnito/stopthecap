import React, { useState } from "react";
import { app } from "../app.config";
import emailjs, { init } from "emailjs-com";
import validateEmail from '../util/validateEmail';
import Image from "next/image";
init("user_7TRpE1ETxxdlRHzpPATZ1");

export default function Contact(props) {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");

  let [message, setMessage] = useState("");

  let [nameError, setNameError] = useState("");
  let [emailError, setEmailError] = useState("");
  let [messageError, setMessageError] = useState("");

  const sendEmail = () => {
    if (name.length < 2) {
      setName('');
      return setNameError('Provide name longer than 2 chars');
    } else if (!validateEmail(email)) {
      setEmail('');
      return setEmailError('Provide a real email');
    } else if (message.length < 10) {
      setMessage('')
      return setMessageError('Provide a message longer than 10 chars');
    }
    const templateParams = {
      name: name,
      email: email,
      subject: "Stop The Cap Inquiry",
      message: message,
    };

    emailjs
      .send("service_xlskzx7", "template_0u1j27d", templateParams)
      .then(function () {
        let animation = document.getElementById("contact-form-sent-ani");
        animation.classList.add("sent-ani");

        setTimeout(() => {
          setFormCounter(1);
          setMessageError("");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
          animation.classList.remove("sent-ani");
        }, 2000);
      })
      .catch(function (error) {
        alert("Oops... " + JSON.stringify(error));
      });
  }

  return (
    <div className="relative flex items-top justify-center min-h-screen xxs:items-center sm:pt-0">
      <Image src="/images/fashion-three.jpg" alt="Landing Image" loading="eager" layout="fill" objectFit="cover" />

      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 z-10">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="xxs:p-6 md:p-0 md:mr-2">
              <div className="md:p-6 xxs:p-4 border-white border-2 bg-theme-blue rounded">
                <h1 className="text-4xl sm:text-5xl text-white dark:text-white font-extrabold tracking-tight">Get in touch</h1>
                <p className="text-normal text-lg sm:text-2xl font-medium text-white dark:text-white mt-2">
                  Fill in the form to start a conversation
                </p>

                {/* <div className="flex items-center mt-8 text-white dark:text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">Acme Inc, Street, State, Postal Code</div>
              </div> */}

                <div className="flex items-center mt-4 text-white dark:text-white">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">{app.contact.number}</div>
                </div>

                <div className="flex items-center mt-2 text-white dark:text-white">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">{app.contact.email}</div>
                </div>
              </div>
            </div>
            <form className="md:px-6 md:pb-6 xxs:px-6 flex flex-col justify-center">
              <div className="flex flex-col">
                <label htmlFor="name" className="hidden">
                  Full Name
                </label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="name"
                  name="name"
                  id="name"
                  value={name}
                  placeholder={nameError ? nameError : `Full Name`}
                  className={`${nameError && name.length === 0 ? 'placeholder:text-red-500' : ''} w-100 py-3 px-3 rounded bg-theme-blue border-2 border-white text-white font-semibold focus:border-indigo-500 focus:outline-none`}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder={emailError ? emailError : "Email"}
                  className={`${emailError && email.length === 0 ? 'placeholder:text-red-500' : ''} w-100 mt-2 py-3 px-3 rounded bg-theme-blue border-2 border-white text-white font-semibold focus:border-indigo-500 focus:outline-none`}
                />
              </div>

              <div className="flex flex-col mt-2">

                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  id="message"
                  value={message}
                  placeholder={messageError ? messageError : "Message"}
                  className={`${messageError && message.length === 0 ? 'placeholder:text-red-500' : ''} h-16 w-100 mt-2 py-1 px-2 rounded bg-theme-blue border-2 border-white text-white font-semibold focus:border-indigo-500 focus:outline-none`}
                />
              </div>

              <button
                type="button"
                onClick={sendEmail}
                className="md:w-32 bg-red-500 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <video width="400" autoPlay={true} muted={true} loop={true} className="fixed top-0 h-screen w-full object-cover -z-10">
        <source src="/videos/graphic-3d.mp4" type="video/mp4" />
      </video> */}
    </div>
  );
}
