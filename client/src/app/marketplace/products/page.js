"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";
import getLanguage from "@/utils/language";


const IndexPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  useEffect(() => {
    getLanguage().then((language) => {
      setSelectedLanguage(language);
    });
  }, []);
    const [voiceInput, setVoiceInput] = useState("");
  const [listening, setListening] = useState(false);
  
  const startListening = (language) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.onstart = () => {
      setListening(true);
    };
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      console.log(transcript);
      getRoute(transcript);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.start();
  };
  return (
    <div>
      <Head>
        <title>Find Seeds, Chemicals, Pesticides, and Equipments</title>
        <meta
          name="description"
          content="Find Seeds, Chemicals, Pesticides, and Equipments"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-black py-4 text-center">
        <h1 className="text-xl font-bold">
          Find Seeds, Chemicals, Pesticides, and Equipments
        </h1>
      </header>

      <main>
        <div
          className="flex justify-center items-center w-screen border border-gray-600 rounded-lg"
          style={{
            width: "250px",
            height: "60px",
            margin: "auto",
            position: "relative",
          }}
        >
          <button className="pr-6">Button 1</button>

          <button className="">Button 2</button>
          <div
            className="absolute top-0 bottom-0 bg-gray-600 w-px"
            style={{ left: "50%", transform: "translateX(-50%)" }}
          ></div>
        </div>
      </main>
      <>
        {voiceInput.length > 3 && (
          <div className="fixed bottom-[80px] w-full px-[20px] py-[10px] pb-[25px]">
            <div className="px-[20px] py-[10px] border w-full bg-gray-100 rounded-[10px] text-black">
              {voiceInput}
            </div>
          </div>
        )}

        <div className="fixed bottom-0 w-full bg-white border shadow-lg bottom-navbar">
          <div className="flex justify-around gap-x-[5px] px-[30px] py-[10px] text-gray-400">
            <div
              className={`flex flex-col items-center hover:text-green-400 `}
              onClick={() => router.push("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
              {selectedLanguage === "english" ? (
                <>Home</>
              ) : selectedLanguage === "hindi" ? (
                <>होम</>
              ) : selectedLanguage === "marathi" ? (
                <>होम</>
              ) : selectedLanguage === "gujrati" ? (
                <>હોમ</>
              ) : selectedLanguage === "tamil" ? (
                <>ஹோம்</>
              ) : (
                ""
              )}
            </div>
            <div
              className={`flex items-center justify-center ${
                listening ? "bg-green-400" : "bg-blue-400"
              }  mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white`}
              onClick={() => startListening("en-US")}
            >
              {!listening ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-[35px] h-[35px]"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
                  />
                </svg>
              ) : (
                <ScaleLoader color="#ffffff" />
              )}
            </div>
            <div className="flex flex-col items-center hover:text-green-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-[35px] h-[35px]"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clip-rule="evenodd"
                />
              </svg>
              {selectedLanguage === "english" ? (
                <>Profile</>
              ) : selectedLanguage === "hindi" ? (
                <>प्रोफाइल</>
              ) : selectedLanguage === "marathi" ? (
                <>प्रोफाईल</>
              ) : selectedLanguage === "gujrati" ? (
                <>પ્રોફાઈલ</>
              ) : selectedLanguage === "tamil" ? (
                <>ப்ரோஃபைல்</>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default IndexPage;
