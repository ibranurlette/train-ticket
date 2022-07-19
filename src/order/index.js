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

  useEffect(() => {
    setPages(Math.round(order ? order.length / 5 : 1));
  }, [order]);

  useEffect(() => {
    dispatch(getPayment())
      .then(async (res) => {
        setOrder(res.value);
      })
      .catch((err) => {
        console.log("ERROR CARI DATA", err);
      });
  }, [dispatch]);

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
                  {item.train.nameTrain}
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
                    {item.train.startStation}
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
                    {item.train.destination}
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
            <div className="md:ml-14 mt-2 sm:text-center md:text-left">
              <p className="text-gray-900 text-[15px] font-semibold mb-2">
                Menunggu Pembayaran
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
          <>
            <button
              className={`${
                currentPage === item ? "bg-blue-500" : null
              } rounded`}
              key={index}
              onClick={changePage}
            >
              <span className="px-5">{item}</span>
            </button>
          </>
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
