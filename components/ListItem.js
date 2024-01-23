// check if media is loaded
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function ListItem(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // videos are a priority
    // if video is present, it uses that by default
    if (props.item.image && !props.item.video) {
      const img = new Image();
      img.src = props.item.image;
      img.onload = () => {
        setLoaded(true);
      };
    } else if (props.item.video) {
      const video = document.createElement("video");
      video.src = props.item.video;
      video.onloadeddata = () => {
        setLoaded(true);
      };
    } else {
      setLoaded(true);
    }
  }, []);

  return (
    <div
      role="list-item"
      className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[33.3%] rounded-xl p-4"
    >
      <a href={"/view/" + props.item.title} className="hover:opacity-90 transition">
        <div
          style={
            props.item.image && !props.item.video
              ? { backgroundImage: `url('${props.item.image}')` }
              : {}
          }
          className="relative w-full rounded-xl h-[250px] bg-cover bg-center border-[1px] border-light-100 dark:border-dark-500 border-solid transition duration-200 overflow-hidden"
          alt=""
        >
          {props.item.video && (
            <video
              className="ease block w-full h-full object-cover rounded-xl transition duration-200"
              playsInline=""
              autoPlay={true}
              loop={true}
              muted={true}
              src={props.item.video}
            />
          )}

          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
                  <animateTransform
                    attributeType="xml"
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animateTransform>
                </path>
              </svg>
            </div>
          )}
        </div>
      </a>

      <div className="flex justify-between items-center mt-2">
        <a href="" className="">
          <h2 className="text-dark-300 hover:text-dark-500  dark:text-white dark:hover:text-dark-100 transition duration-200">
            {props.item.title}
          </h2>
        </a>
        <div className="flex justify-end gap-2 font-normal">
          <button className="flex flex-1 justify-end items-center text-dark-300 dark:text-white hover:text-dark-500 dark:hover:text-dark-100 transition duration-200 text-[16px] gap-1 cursor-pointer hover:opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[20px]"
            >
              <path
                fillRule="evenodd"
                d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
