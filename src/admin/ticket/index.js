import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get_ticket } from "../../client/_action/cari_ticket";

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
    <div className="container mx-auto px-4 sm:px-8">
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
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Nomor
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Kereta
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Stasiun Keberangkatan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Tujuan Keberangkatan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Waktu Perjalanan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              {!ticket ? (
                <>Loading</>
              ) : (
                getPaginatedData().map((item, index) => (
                  <tbody key={index}>
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.train_name.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.start_station.name}
                        </p>
                        <span>{item.startTime}</span>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.destina_tion.name}
                        </p>
                        <span>{item.arrivalTime}</span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          2j 0m
                        </p>
                      </td>

                      <td className="px-5 py-5 border-b border-gray-200 bg-white">
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
                            className="h-5 w-5 text-green-700"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path
                              fill-rule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clip-rule="evenodd"
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
                ))
              )}
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs: text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 ? true : false}
                  type="submit"
                  className={`${
                    currentPage === 1 ? "bg-gray-200" : "bg-gray-300"
                  } text-gray-800 font-semibold py-2 px-4 rounded-r`}
                >
                  Preve
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
                  disabled={currentPage === pages ? true : false}
                  type="submit"
                  onClick={goToNextPage}
                  className={`${
                    currentPage === pages ? "bg-gray-200" : "bg-gray-300"
                  } text-gray-800 font-semibold py-2 px-4 rounded-l`}
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
