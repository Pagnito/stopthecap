import shopify from "../shopify/shopify-funcs";
import {useState} from 'react';

export default function useNewsletter() {
  let [email, setEmail] = useState("");
  let [notif, setNotif] = useState({
    message: "",
    color: "text-gray-400",
  });

  let emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const changeEmailValue = (value) => {
    setNotif({
      message: "",
      color: "text-gray-400",
    });
    setEmail(value);
  };

  const submitEmail = async () => {
    console.log(email)
    if (emailRegex.test(email)) {
      let response = shopify.createSubscription(email);
      setEmail("");
      setNotif({
        color: "text-gray-400",
        message: "Sent!",
      });

      if (response === 200) {
        setNotif({
          color: "text-gray-400",
          message: "You're all set!",
        });
        setTimeout(() => {
          setNotif({
            color: "text-gray-400",
            message: "",
          });
        }, 2000);
      } else {
        setEmail("");
        setNotif({
          message: response.message,
          color: "bg-red-500",
        });
      }
    } else {
      setEmail("");
      setNotif({
        message: `You've entered an invalid email`,
        color: "bg-red-500",
      });
    }
  };
  const submitEmailOnEnter = async (e) => {
    if (e.code === "Enter") {
      let submittion = await shopify.createSubscription(email);
      console.log(submittion)
      // submitEmail(email);
    }
  };
  return {
    submitEmailOnEnter,
    submitEmail,
    changeEmailValue,
    setEmail,
    setNotif,
    notif,
    email
  };
}
