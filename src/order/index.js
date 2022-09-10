import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { getPayment } from "../client/_action/payment";

const Order = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [order, setOrder] = useState([]);

  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showTicket, setShowTicket] = useState(false);
  const [seeDetail, setSeeDetail] = useState();

  useEffect(() => {
    setPages(Math.ceil(order.length === 0 ? 1 : order.length / 5));
  }, [order]);

  useEffect(() => {
    dispatch(getPayment(search))
      .then(async (res) => {
        setOrder(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET LIST ORDER", err);
      });
  }, [dispatch, search]);

  const handlebuy = (item) => {
    navigate("/payment", {
      state: { ticket: item },
    });
  };

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * 5 - 5;
    const endIndex = startIndex + 5;
    return order && order.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="sm:w-[20rem] md:w-[50rem] mx-auto sm:mt-5">
      <p className="mb-2 text-lg font-bold">Daftar Pesanan Kamu</p>

      <div className="my-2 flex sm:flex-row flex-col">
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-current text-gray-500"
            >
              <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
            </svg>
          </span>
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="pending"
            className="border border-blue-700 py-2 px-8 rounded"
          />
        </div>
      </div>
      {order.length === 0 ? (
        <div className="my-5 font-bold text-center border py-4 text-lg">
          Belum Ada Tiket Yang Kamu Order
        </div>
      ) : (
        getPaginatedData().map((item, index) => {
          let startTime = moment(item.train.startTime, "hh:mm:ss");
          let arrivalTime = moment(item.train.arrivalTime, "hh:mm:ss");
          const duration = moment.duration(arrivalTime.diff(startTime));
          const hours = parseInt(Math.abs(duration.asHours()));
          const minutes = parseInt(duration.asMinutes()) % 60;

          const dateStart = moment(item.train.dateStart).format("DD MMMM YYYY");
          const dateEndTravel = moment(item.train.dateEndTravel).format(
            "DD MMMM YYYY"
          );

          console.log("ITEMMMMMMMM", item);

          return (
            <div
              key={index}
              className="mb-5 p-6 bg-white rounded-lg border border-blue-700 rounded shadow-md"
            >
              <div className="md:flex md:justify-between">
                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    {item.train.train_name.name}
                  </h5>
                  <p className="text-gray-500 text-[15px]">
                    {item.train.typeTrain.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.train.startTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {item.train.start_station.name}
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
                      {item.train.arrivalTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {item.train.destina_tion.name}
                    </p>
                  </div>
                </div>

                <div className="md:flex md:mr-5 sm:text-center">
                  <div className="md:h-10 md:bg-gray-300 md:w-0.5 md:mt-2" />
                  <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mt-3 md:mx-2">
                    {hours}j {minutes}m
                  </p>
                </div>

                <div className="sm:mt-2 items-center	sm:border-t md:border-none sm:pt-4 md:pt-0">
                  <h5 className="text-sm text-gray-900 md:mb-2">
                    {item.qty} x Rp {item.train.price} :
                  </h5>
                  <h5 className="text-lg font-bold text-gray-900 mb-2">
                    Rp {item.Total_price}
                  </h5>
                </div>
              </div>
              {/* Main modal */}

              <div className="">
                <h5 className="text-md font-bold text-gray-900 mb-2">
                  {item.status}
                </h5>
                {item.status !== "menunggu disetujui" && (
                  <button
                    className="sm:w-full md:w-40  bg-blue-700 text-white font-bold text-sm py-2 rounded shadow hover:shadow-lg"
                    type="submit"
                    onClick={() => {
                      console.log("item", item);
                      handlebuy(item);
                    }}
                  >
                    Bayar Sekarang
                  </button>
                )}
              </div>
              <div className="mt-5 text-center ">
                <button
                  onClick={() => {
                    setShowTicket(!showTicket);
                    setSeeDetail(getPaginatedData()[index]);
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
                    <div className="lg:mr-16 ">
                      <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.train.train_name.name}
                      </h5>
                      <p className="text-gray-500 font-semibold text-[14px]">
                        {item.train.typeTrain.name}
                      </p>
                    </div>
                    <div className="sm:flex sm:justify-center">
                      <div className="mr-5 mt-2">
                        <div className="w-3 h-3 rounded-full  border border-sky-500" />
                        <div className="w-px h-16 ml-1 my-1 border-dashed border border-gray-500" />
                        <div className="w-3 h-3 rounded-full  bg-sky-500" />
                      </div>
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                          {item.train.startTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {dateStart}
                        </p>
                        <p className="text-gray-500 text-[14px] my-2">
                          {hours}j {minutes}m
                        </p>

                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.train.arrivalTime}
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
                          {item.train.start_station.name}
                        </p>

                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                          Yogyakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.train.destina_tion.name}
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

      <div className="flex justify-center mb-5">
        <button
          className={`${
            currentPage === 1 ? "bg-blue-300" : "bg-blue-700"
          }  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg`}
          disabled={currentPage === 1 ? true : false}
          type="submit"
          onClick={goToPreviousPage}
        >
          Prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            className={`${
              currentPage === item ? "border border-blue-700 font-bold " : null
            } rounded mx-2`}
            onClick={changePage}
          >
            <span className="px-5">{item}</span>
          </button>
        ))}

        <button
          className={`${
            currentPage === pages ? "bg-blue-300" : "bg-blue-700"
          }  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg `}
          disabled={currentPage === pages ? true : false}
          type="submit"
          onClick={goToNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Order;
