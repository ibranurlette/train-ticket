import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import ModalBuy from "../payments/modal-buy";

import { get_ticket } from "../client/_action/cari_ticket";
import { getListStation } from "../client/_action/list_station";

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

  const handlSearch = () => {
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
              <button className="bg-gray-800 text-white px-5 py-2 rounded mt-2 font-bold">
                Daftar
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

      <div className="w-[100%] max-w-2xl mx-auto">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
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
                className="bg-gray-800 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handlSearch}
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
        dataTicket.map((item, index) => (
          <div
            key={index}
            className="mx-auto mb-5 p-6 max-w-3xl bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
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

                <div className="flex mr-5">
                  <div className="h-0.5 bg-gray-300 w-5 mt-7" />
                  <p className="text-gray-500 text-[15px] mt-4 mx-2">
                    {/* {item.duration} */}2j 0
                  </p>
                  <div className="h-0.5 bg-gray-300 w-5 mt-7" />
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

              <div className="sm:mt-2">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-right">
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
                <p className="text-[15px] text-gray-900 mb-2">
                  Detail Perjalanan
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
                <div className="flex justify-start mt-5">
                  <div>
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-16">
                      {item.train_name.name}
                    </h5>
                    <p className="text-gray-500 font-semibold text-[14px]">
                      {item.typeTrain.name}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                      {item.startTIme}
                    </h5>
                    <p className="text-gray-500 font-semibold text-[14px]">
                      {item.dateStart}
                    </p>
                    <p className="text-gray-500 text-[14px] my-2">8j 13m</p>

                    <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.arrivalTime}
                    </h5>
                    <p className="text-gray-500 font-semibold text-[14px]">
                      11 Juli 2022
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
            ) : (
              <></>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
