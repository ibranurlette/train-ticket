import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import ModalBuy from "../payments/modal-buy";

import { get_ticket } from "../client/_action/ticket";
import { getListStation } from "../client/_action/train";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [showTicket, setShowTicket] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dataTicket, setDataTicket] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [listStation, setListStation] = useState([]);
  // const [focused, setFocused] = React.useState(false);
  // const onFocus = () => setFocused(true);
  // const onBlur = () => setFocused(false);

  const [startStation, setStartStation] = useState();
  const [destination, setDestination] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [seeDetail, setSeeDetail] = useState();

  const handlSearch = (event) => {
    event.preventDefault();
    dispatch(get_ticket({ startStation, destination, dateStart }))
      .then(async (res) => {
        setFetch(true);
        setDataTicket(res.value);
      })
      .catch((err) => {
        console.log("ERROR SEARCH TICKET", err);
      });
  };

  useEffect(() => {
    dispatch(getListStation())
      .then(async (res) => {
        setListStation(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET LIST STATION", err);
      });
  }, [dispatch]);

  console.log("listStation", listStation);

  return (
    <div className="mb-auto">
      <div className="bg-gray-100	lg:flex lg:justify-around grid justify-items-center items-center text-center py-7">
        <div>
          <h1 className="text-3xl font-semibold">Hi Pencari Tiket</h1>
          {token ? (
            <h1 className="font-medium">Selamat Datang </h1>
          ) : (
            <>
              <h1 className="font-medium">Daftar Sekarang!!</h1>
              <button className="bg-blue-700 text-white px-5 py-2 rounded mt-2 font-bold">
                <Link to="register">Daftar</Link>
              </button>
            </>
          )}
        </div>
        <img
          src={require("../assets/iklan2.jpeg")}
          alt="iklan-bonus"
          className="lg:max-w-md sm:max-w-xs sm:mt-5"
        />
      </div>

      <div className="w-[100%] max-w-2xl mx-auto ">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 ">
          <label className="block text-gray-700 text-lg font-bold mb-5">
            Cari Tiket Kereta Kamu
          </label>
          <div className="flex justify-center">
            <div className="md:mr-20 sm:mr-10">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="asal"
                >
                  Asal
                </label>

                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="start-station"
                    onChange={(e) => {
                      setStartStation(e.target.value);
                    }}
                    value={startStation}
                  >
                    <option value="">Pilih</option>
                    {listStation.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listStation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="tujuan"
                >
                  Keberangkatan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="date-start"
                  type="date"
                  name="date-start"
                  value={dateStart}
                  onChange={(e) => {
                    setDateStart(e.target.value);
                  }}
                />
              </div>
            </div>
            <div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="destination"
                >
                  Tujuan
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    name="destination"
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                    value={destination}
                  >
                    <option value="">Pilih</option>
                    {listStation.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listStation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                className={`${
                  startStation === "" || destination === "" || dateStart === ""
                    ? "w-full bg-blue-400"
                    : "w-full bg-blue-700 focus:outline-none focus:shadow-outline"
                } mt-5 text-white font-bold py-2 px-4 rounded`}
                type="submit"
                onClick={(e) => {
                  handlSearch(e);
                }}
                disabled={
                  startStation === "" || destination === "" || dateStart === ""
                    ? true
                    : false
                }
              >
                Cari Tiket
              </button>
            </div>
          </div>
        </form>
      </div>

      {dataTicket.length === 0 && fetch === true ? (
        <div className="text-center my-5 font-bold text-lg text-red-500">
          Data Tidak Ditemukan
        </div>
      ) : (
        dataTicket.map((item, index) => {
          // Waktu Perjalanan
          let startTime = moment(item.startTime, "hh:mm:ss");
          let arrivalTime = moment(item.arrivalTime, "hh:mm:ss");
          const duration = moment.duration(arrivalTime.diff(startTime));
          const hours = parseInt(Math.abs(duration.asHours()));
          const minutes = parseInt(duration.asMinutes()) % 60;

          const dateStart = moment(item.dateStart).format("DD MMMM YYYY");
          const dateEndTravel = moment(item.dateEndTravel).format(
            "DD MMMM YYYY"
          );
          return (
            <div
              key={index}
              className="mx-auto mb-5 p-6 max-w-3xl bg-white rounded-lg border border-blue-700 rounded shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="md:flex md:justify-around">
                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-center">
                    {item.train_name.name}
                  </h5>
                  <p className="text-gray-500 text-[15px]">
                    {item.typeTrain.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.startTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {item.start_station.name}
                    </p>
                  </div>

                  <div className="text-gray-700 items-center mr-5 mt-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>

                  <div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.arrivalTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {item.destina_tion.name}
                    </p>
                  </div>
                </div>

                <div className="flex mr-5">
                  <div className="h-10 bg-gray-300 w-0.5 mt-2" />
                  <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mt-3 mx-2">
                    {hours}j {minutes}m
                  </p>
                </div>

                <div className="sm:mt-2">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                    Rp {item.price}
                  </h5>
                  <ModalBuy
                    showModal={showModal}
                    setShowModal={setShowModal}
                    item={item}
                    index={index}
                    setDataTicket={setDataTicket}
                    dataTicket={dataTicket}
                    setSeeDetail={setSeeDetail}
                    seeDetail={seeDetail}
                  />
                </div>
              </div>
              {/* Main modal */}

              <div className="mt-5 text-center ">
                <button
                  onClick={() => {
                    setShowTicket(!showTicket);
                    setSeeDetail(dataTicket[index]);
                  }}
                >
                  <p className="text-[15px] text-gray-900 mb-2 font-semibold">
                    Lihat Detail Perjalanan
                  </p>
                </button>
                {showTicket && seeDetail.id === item.id ? (
                  <div className="h-1 w-28 bg-gray-900 mx-auto" />
                ) : (
                  <></>
                )}
              </div>

              {showTicket && seeDetail.id === item.id ? (
                <div>
                  <div className="h-px bg-gray-300" />
                  <div className="lg:flex lg:justify-start mt-5">
                    <div className="sm:text-center lg:text-left lg:mr-16 ">
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.train_name.name}
                      </h5>
                      <p className="text-gray-500 font-semibold text-[14px]">
                        {item.typeTrain.name}
                      </p>
                    </div>
                    <div className="sm:flex sm:justify-start">
                      <div className="mr-5 mt-2">
                        <div className="w-3 h-3 rounded-full  border border-sky-500" />
                        <div className="w-px h-16 ml-1 my-1 border-dashed border border-gray-500" />
                        <div className="w-3 h-3 rounded-full  bg-sky-500" />
                      </div>
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                          {item.startTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {dateStart}
                        </p>
                        <p className="text-gray-500 text-[14px] my-2">8j 13m</p>

                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.arrivalTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {dateEndTravel}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white">
                          Jakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.start_station.name}
                        </p>

                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                          Yogyakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.destina_tion.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
