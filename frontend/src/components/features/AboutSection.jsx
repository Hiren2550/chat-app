import React from "react";
import TermsPrivacy from "./TermsPrivacy";
import Navbar from "./Navbar";

const AboutSection = () => {
  return (
    <div>
      <div className="bg-muted flex flex-col items-center justify-center p-4 md:p-6">
        <h1 className="text-3xl font-bold mb-4 select-none ">About Us</h1>
        <div className="w-full max-w-sm md:max-w-5xl border border-slate-600 rounded-lg bg-white">
          <div className="max-w-4xl sm:mx-auto p-6 space-y-10 text-gray-800">
            <div className="m-2 sm:flex gap-5 justify-center items-center">
              <section>
                <h1 className="text-3xl font-bold mb-4 select-none">
                  Chat App
                </h1>
                <ul className="list-disc pl-6 space-y-2 select-none">
                  <li>
                    This chat application is designed for fast, secure, and
                    real-time communication.
                  </li>
                  <li>
                    Built using the MERN stack (MongoDB, Express, React,
                    Node.js) and integrated with WebSocket for live messaging.
                  </li>
                  <li>
                    Users can create accounts, manage profiles, and chat in
                    private or group rooms.
                  </li>
                  <li>
                    Messages are encrypted and stored securely to protect user
                    privacy.
                  </li>
                  <li>
                    The UI is responsive, clean, and designed for both mobile
                    and desktop users.
                  </li>
                  <li>
                    Real-time notifications and typing indicators enhance
                    interactivity.
                  </li>
                  <li>
                    Future updates will include media sharing, voice messages,
                    and status indicators.
                  </li>
                  <li>
                    This chat application is designed for fast, secure, and
                    real-time communication.
                  </li>
                  <li>
                    Inspired by modern messaging platforms like WhatsApp Web and
                    Discord.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
