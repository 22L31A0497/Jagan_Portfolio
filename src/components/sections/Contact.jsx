import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconCheck,
  IconLoader2,
  IconSend,
} from "@tabler/icons-react";
import { Bio } from "../../data/constants";
import { AnimatedGradientText } from "../ui/AnimatedGradientText";
import { MovingBorder } from "../ui/MovingBorder";
import { BackgroundBeams } from "../ui/BackgroundBeams";
import { ShimmerButton } from "../ui/ShimmerButton";
import {
  fadeUpVariants,
  containerVariants,
} from "../../hooks/useScrollAnimation";

const FloatingInput = ({ label, name, type = "text", as = "input", rows }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const Cmp = as;
  const filled = focused || value.length > 0;
  return (
    <div className="relative">
      <Cmp
        type={type}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required
        className={`peer w-full ${
          as === "textarea" ? "min-h-[120px] resize-none" : ""
        } rounded-xl bg-[#0a0a0a] border border-white/10 px-4 pt-5 pb-2 text-white placeholder-transparent outline-none transition-all duration-300 focus:border-indigo-400/60 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.15)]`}
        placeholder={label}
      />
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          filled
            ? "top-1.5 text-[10px] text-indigo-300"
            : "top-3.5 text-sm text-neutral-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const SOCIALS = [
  { Icon: IconBrandGithub, href: Bio.github, label: "GitHub", color: "hover:bg-white/10 hover:border-white/30" },
  { Icon: IconBrandLinkedin, href: Bio.linkedin, label: "LinkedIn", color: "hover:bg-blue-500/20 hover:border-blue-400/40" },
  { Icon: IconBrandX, href: Bio.twitter, label: "X / Twitter", color: "hover:bg-white/10 hover:border-white/30" },
  { Icon: IconMail, href: "mailto:hello@example.com", label: "Email", color: "hover:bg-purple-500/20 hover:border-purple-400/40" },
];

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(
        "service_5zik5gm",
        "template_ebpmagf",
        formRef.current,
        "vLJ2AOwNIL8hYDr7t"
      )
      .then(
        () => {
          setStatus("success");
          formRef.current?.reset();
          setTimeout(() => setStatus("idle"), 4000);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 4000);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white py-20 md:py-32 px-5 sm:px-6 md:px-8 overflow-hidden"
    >
      <BackgroundBeams />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-3xl mx-auto"
      >
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-4">
          <AnimatedGradientText>{"// CONTACT"}</AnimatedGradientText>
        </motion.div>

        <motion.h2
          variants={fadeUpVariants}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4"
        >
          Let's <span className="text-gradient">build something</span>.
        </motion.h2>

        <motion.p
          variants={fadeUpVariants}
          className="text-center text-neutral-400 mb-10 max-w-xl mx-auto"
        >
          Have a project in mind, a question, or just want to say hi? Drop a
          message and I'll get back to you soon.
        </motion.p>

        <motion.div variants={fadeUpVariants}>
          <MovingBorder
            duration={5000}
            rx="1.5rem"
            ry="1.5rem"
            containerClassName="rounded-3xl"
            className="!p-0"
          >
            <div className="w-full p-5 sm:p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-emerald-300">
                  Available for opportunities
                </span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FloatingInput label="Your Name" name="from_name" />
                  <FloatingInput label="Your Email" name="from_email" type="email" />
                </div>
                <FloatingInput label="Subject" name="subject" />
                <FloatingInput label="Message" name="message" as="textarea" rows={5} />

                <ShimmerButton
                  type="submit"
                  className="w-full py-3 text-base"
                >
                  {status === "sending" && (
                    <span className="flex items-center justify-center gap-2">
                      <IconLoader2 size={18} className="animate-spin" />
                      Sending...
                    </span>
                  )}
                  {status === "success" && (
                    <span className="flex items-center justify-center gap-2">
                      <IconCheck size={18} /> Message Sent!
                    </span>
                  )}
                  {status === "error" && "Something went wrong. Try again."}
                  {status === "idle" && (
                    <span className="flex items-center justify-center gap-2">
                      <IconSend size={16} /> Send Message
                    </span>
                  )}
                </ShimmerButton>
              </form>

              <div className="my-8 flex items-center gap-4">
                <span className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-neutral-500 uppercase tracking-widest">
                  or reach out via
                </span>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="flex justify-center gap-4">
                {SOCIALS.map(({ Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-neutral-300 hover:text-white hover:scale-110 transition-all duration-300 ${color}`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </MovingBorder>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
