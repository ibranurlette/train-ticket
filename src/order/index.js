import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getPayment } from "../client/_action/payment";

const Order = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [order, setOrder] = useState();

  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPages(Math.ceil(order ? order.length / 5 : 1));
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
      <p className="mb-2 text-gray-700 font-bold">Daftar Pesanan Kamu</p>

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
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
          />
        </div>
      </div>
      {!order ? (
        <>Loading</>
      ) : (
        getPaginatedData().map((item, index) => (
          <div
            key={index}
            className="border shadow-md rounded-lg py-2 bg-gray-50 mb-5"
          >
            <div className="md:flex md:justify-around border-b pb-2">
              <div>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-center md:text-left">
                  {item.train.train_name.name}
                </h5>
                <p className="text-gray-500 text-[15px] sm:text-center md:text-left sm:mb-4 md:mb-0">
                  {item.train.typeTrain.name}
                </p>
              </div>
              <div className="md:flex md:justify-between text-center">
                <div className="md:mr-5">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.train.startTime}
                  </h5>
                  <p className="text-gray-500 text-[15px]">
                    {item.train.start_station.name}
                  </p>
                </div>

                <div className="md:flex md:mr-5 sm:my-2 md:my-0">
                  <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                  <p className="text-gray-500 text-[15px] mt-4 mx-2">
                    {/* {item.duration} */}
                    2j 0m
                  </p>
                  <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
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
              <div className="sm:mt-2 md:mt-0">
                <p className="text-gray-500 text-[15px]">
                  {item.qty} x Rp {item.train.price}
                </p>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-right sm:text-center ">
                  Total : Rp {item.Total_price}
                </h5>
              </div>
            </div>
            <div className="md:ml-10 mt-2 sm:text-center md:text-left">
              <p className="text-gray-900 text-[15px] font-semibold mb-2">
                {item.status}
              </p>
              <button
                className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                onClick={() => {
                  handlebuy(item);
                }}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-center mb-5">
        <button
          className={`${
            currentPage === 1 ? "bg-gray-300" : "bg-gray-900"
          }  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150`}
          disabled={currentPage === 1 ? true : false}
          type="submit"
          onClick={goToPreviousPage}
        >
          Prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            className={`${currentPage === item ? "bg-blue-500" : null} rounded`}
            onClick={changePage}
          >
            <span className="px-5">{item}</span>
          </button>
        ))}

        <button
          className={`${
            currentPage === pages ? "bg-gray-300" : "bg-gray-900"
          }  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ml-2 ease-linear transition-all duration-150`}
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
