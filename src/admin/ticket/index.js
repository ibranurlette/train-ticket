import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { get_ticket } from "../../client/_action/ticket";

import ModalDetail from "./detail";
import ModalDelete from "./delete";

const ListTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState();
  const [showModal, setShowModal] = useState({
    modalDelete: false,
    modalDetail: false,
  });

  const [idTicket, setIdTicket] = useState();
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [startStation, setStartStation] = useState("");
  const [destination, setDestination] = useState("");
  const [dateStart, setDateStart] = useState("");

  useEffect(() => {
    setPages(Math.ceil(ticket ? ticket.length / 5 : 1));
  }, [ticket]);

  useEffect(() => {
    dispatch(get_ticket({ startStation, destination, dateStart }))
      .then(async (res) => {
        setTicket(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET LIST TICKET", err);
      });
  }, [dispatch, startStation, destination, dateStart]);

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
    return ticket && ticket.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  const handleNavigate = (item) => {
    navigate("/edit-ticket", {
      state: { ticket: item },
    });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:grid h-screen place-items-center">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Semua Tiket</h2>
        </div>
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
              onChange={(e) => setStartStation(e.target.value)}
              placeholder="Search"
              className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
          </div>
        </div>
        <div className="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-gray-300">
            <table className="min-w-full leading-normal">
              <thead className="bg-blue-700 text-white text-left text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nomor</th>
                  <th className="px-5 py-3">Nama Kereta</th>
                  <th className="px-5 py-3">Stasiun Keberangkatan</th>
                  <th className="px-5 py-3">Tujuan Keberangkatan</th>
                  <th className="px-5 py-3">Waktu Perjalanan</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              {!ticket ? (
                <>Loading</>
              ) : (
                getPaginatedData().map((item, index) => {
                  let startTime = moment(item.startTime, "hh:mm:ss");
                  let arrivalTime = moment(item.arrivalTime, "hh:mm:ss");
                  const duration = moment.duration(arrivalTime.diff(startTime));
                  const hours = parseInt(Math.abs(duration.asHours()));
                  const minutes = parseInt(duration.asMinutes()) % 60;
                  return (
                    <tbody key={index}>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {index + 1}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.train_name.name}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.start_station.name}
                          </p>
                          <span>{item.startTime}</span>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.destina_tion.name}
                          </p>
                          <span>{item.arrivalTime}</span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {hours}j - {minutes}m
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-300 bg-white">
                          <ModalDetail
                            setIdTicket={setIdTicket}
                            idTicket={idTicket}
                            item={item}
                            setShowModal={setShowModal}
                            showModal={showModal}
                          />

                          <button
                            className=""
                            type="submit"
                            onClick={() => {
                              handleNavigate(item);
                            }}
                          >
                            <svg
                              className="h-5 w-5 text-yellow-500 font-bold"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>

                          <ModalDelete
                            setIdTicket={setIdTicket}
                            idTicket={idTicket}
                            item={item}
                            setShowModal={setShowModal}
                            showModal={showModal}
                          />
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              )}
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs: text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 ? true : false}
                  type="submit"
                  className={`${
                    currentPage === 1 ? "bg-blue-300" : "bg-blue-700"
                  } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg`}
                >
                  Preve
                </button>
                {getPaginationGroup().map((item, index) => (
                  <button
                    key={index}
                    className={`${
                      currentPage === item
                        ? "border border-blue-700 font-bold "
                        : null
                    } rounded mx-2`}
                    onClick={changePage}
                  >
                    <span className="px-5">{item}</span>
                  </button>
                ))}
                <button
                  disabled={currentPage === pages ? true : false}
                  type="submit"
                  onClick={goToNextPage}
                  className={`${
                    currentPage === pages ? "bg-blue-300" : "bg-blue-700"
                  } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg `}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListTicket;
