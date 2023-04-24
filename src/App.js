import React, { useState, useEffect } from "react";
import "./styles.css";

function App() {
  const [shows, setShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState();
  const [pertularKey, setPertularKey] = useState("");

  const fetchData = async () => {
    try {
      // Fetch the schedule for the current day in the US
      const response = await fetch(
        "https://api.tvmaze.com/schedule?country=US&date=2023-04-24"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      // Set the list of shows in the state
      setShows(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowClick = async (show, key) => {
    try {
      // Fetch the show's metadata using the TVmaze API
      setPertularKey(key);
      const response = await fetch(
        `https://api.tvmaze.com/shows/${show.show.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const showData = await response.json();
      // Set the selected show in the state
      setSelectedShow(showData);
    } catch (error) {
      console.error("Error fetching data in details:", error);
    }
  };

  return (
    <>
      <h2 className="font-bold text-lg mb-2 text-center">TV Show</h2>
      <div className="bg-gray-100 pt-5 gap-4 flex-wrap flex justify-center items-center">
        {shows.map((show, key) => (
          <>
            <div className="w-60 p-5 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              <img
                className="rounded-xl"
                src={show.show.image?.medium}
                alt={show.name}
              />
              <div className="p-2">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold mb-2">{show.name}</h2>
                  <p className="text-right">
                    {show.airdate}
                    {show.airtime}
                  </p>
                </div>
                <p className="text-sm text-gray-600">
                  {show.show.summary.replace(/(<([^>]+)>)/gi, "")}
                </p>
              </div>
              <div className="m-2">
                <button
                  onClick={() => handleShowClick(show, key)}
                  className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700"
                >
                  Learn More
                </button>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="bg-gray-100 pt-5 gap-4 flex-wrap flex justify-center items-center">
        {selectedShow && (
          <div className="m-4">
            <div className=" p-5 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-5">
                Programme Detail ({shows[pertularKey].name})
              </h2>
              <div className="p-2">
                <div className="flex justify-between">
                  <h2 className="text-lg font-bold mb-2">
                    {shows[pertularKey].name}
                  </h2>
                  <p className="text-right">
                    {shows[pertularKey].airdate}
                    {shows[pertularKey].airtime}
                  </p>
                </div>
              </div>
              <img
                src={selectedShow.image.medium}
                alt={selectedShow.name}
                className="rounded-xl w-full"
              />
              <div className="mb-3 mt-10 ">
                <span className="text-white uppercase bg-orange-600 text-base px-3 py-1 rounded-md">
                  TYPE : {selectedShow.type}
                </span>
              </div>
              <div className="mb-3 mt-5 ">
                <span className="text-white uppercase bg-orange-600 text-base px-3 py-1 rounded-md">
                  LANGUAGE : {selectedShow.language}
                </span>
              </div>
              <div className="mb-3 mt-5 ">
                <span className="text-white uppercase bg-sky-500 text-base px-3 py-1 rounded-md">
                  NETWORK : {selectedShow.network.name}
                </span>
              </div>
              <p className="mt-4">
                <strong>Geners:</strong>{" "}
                <div className="mb-3 mt-3 ">
                  <span className="text-white uppercase bg-purple-500 text-base px-3 py-1 rounded-md">
                    {selectedShow.genres[0]}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {selectedShow.summary.replace(/(<([^>]+)>)/gi, "")}
                </p>
              </p>
              <h2 className="text-1xl mb-3 mt-3">
                Schedule : {selectedShow.schedule.time}
              </h2>

              {selectedShow.schedule.days.map((day) => {
                return (
                  <>
                    <span className="text-justify uppercase pr-3">{day}</span>
                  </>
                );
              })}
              <div className="mt-5">
                <div>
                  <a href={selectedShow.url} className="underline ">
                    Click here for Office Site
                  </a>
                </div>
                <div className="mt-3">
                  <a href={shows[pertularKey].url} className="underline ">
                    Click to watch on site.
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <a href={shows[pertularKey]._links.previousepisode}>
                  <button className="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">
                    Previous Episode
                  </button>
                </a>

                <a
                  href={shows[pertularKey]._links.nextepisode}
                  className="float-right"
                >
                  <button className="text-white  bg-amber-500 px-3 py-1 rounded-md hover:bg-amber-700">
                    Next Episode
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
