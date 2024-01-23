import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Inter } from "next/font/google";
import List from "@/components/List";
const inter = Inter({ subsets: ["latin"] });

export default function View() {
  const router = useRouter();
  const { slug } = router.query;
  const [viewItem, setViewItem] = useState({});

  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    } else {
      setDarkMode(false);
    }

    if (slug) {
      fetch("/api/data")
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            let filtered = data.filter(
              (item) => item.title.toLowerCase() === slug.toLowerCase()
            );

            if (filtered.length > 0) {
              setViewItem(filtered[0]);
            } else {
              router.push("/404");
            }
          } else {
            router.push("/404");
          }
        });
    }
  }, [slug]);

  return (
    <div className={`${inter.className} ${darkMode ? "dark" : ""}`}>
      <div className="flex dark:bg-black">
        {/* sidebar */}
        <Sidebar showSidebar={showSidebar} />

        {/* view details here */}
        <div className="main w-full max-h-[100vh] scrollbar-hide overflow-y-auto">
          <Header
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          {/* hero */}
          <div className="p-10 max-w-[600px] text-center mx-auto mt-20 xl:mt-auto">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              {viewItem.title}
            </h1>
            <p className="text-dark-200 dark:text-gray-400 my-4">
              {viewItem.description}
            </p>
            <a href={viewItem.link} target="_blank">
              <button className="py-2 text-sm bg-white border border-1 border-[#e3e3e3] text-black px-5 rounded-full flex items-center gap-2 mx-auto hover:bg-light-100 transition-all duration-300">
                Visit website
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </a>
          </div>

          {/* media */}
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-[80%] p-5">
              {viewItem.video ? (
                <video
                  className="w-full rounded-lg"
                  src={viewItem.video}
                  autoPlay
                  muted
                ></video>
              ) : (
                <img
                  className="w-full rounded-lg"
                  src={viewItem.image}
                  alt={viewItem.title}
                />
              )}
            </div>
          </div>

          {/* list similar items */}
          <div className="flex justify-center items-center mt-20 mb-5 w-full">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Similar websites
            </h2>
          </div>
          {/* list */}
          <List />
        </div>
      </div>
    </div>
  );
}
