import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPayment } from "../../client/_action/payment";
import { updatePayment } from "../../client/_action/payment";

import ModalEdit from "./edit";
import ModalDetail from "./detail";
import ModalImage from "./modal_image";

const Transaction = () => {
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState();
  const [showModal, setShowModal] = useState({
    modalEdit: false,
    modalDetail: false,
    modalImage: false,
  });
  const [idTransaction, setIdTransaction] = useState("");
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPages(Math.ceil(transaction ? transaction.length / 5 : 1));
  }, [transaction]);

  useEffect(() => {
    dispatch(getPayment(search))
      .then(async (res) => {
        setTransaction(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET ALL TRANSACTION", err);
      });
  }, [dispatch, search]);

  const handleEdit = () => {
    const data = {
      id: idTransaction,
      train: {
        status: "disetujui",
      },
    };

    dispatch(updatePayment(data))
      .then(async (res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR UPDATE TRANSACTION", err);
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
    return transaction && transaction.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="px-4 sm:px-8 lg:grid h-screen place-items-center">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Semua Transaksi
          </h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          {/* <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
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
            <div className="relative">
              <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option>Pilih</option>
                <option>Semua</option>
                <option>Active</option>
                <option>Inactive</option>
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
          </div> */}
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
              className="border border-blue-700 py-2 px-8 rounded"
            />
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-blue-700">
            <table className="min-w-full leading-normal ">
              <thead className="bg-blue-700 text-white text-left text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Nomor</th>
                  <th className="px-5 py-3">Pemesan</th>
                  <th className="px-5 py-3">Nama Kereta</th>
                  <th className="px-5 py-3">Bukti Pembayaran</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {!transaction ? (
                  <>Loading</>
                ) : (
                  getPaginatedData().map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.user.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.train.train_name.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white ">
                        {item.attachment ? (
                          <ModalImage
                            showModal={showModal}
                            setIdTransaction={setIdTransaction}
                            idTransaction={idTransaction}
                            item={item}
                            transaction={transaction}
                            setShowModal={setShowModal}
                          />
                        ) : (
                          <p className="text-gray-900">Belum Ada Bukti</p>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white  ">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className={`${
                              item.status === "pending"
                                ? "bg-yellow-400"
                                : item.status === "menunggu disetujui"
                                ? "bg-sky-400"
                                : "bg-emerald-400"
                            } absolute inset-0 opacity-50 rounded`}
                          ></span>
                          <span className="relative">{item.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-blue-700 bg-white">
                        <ModalDetail
                          setIdTransaction={setIdTransaction}
                          idTransaction={idTransaction}
                          item={item}
                          setShowModal={setShowModal}
                          showModal={showModal}
                          transaction={transaction}
                        />
                        {item.status === "menunggu disetujui" && (
                          <ModalEdit
                            setIdTransaction={setIdTransaction}
                            id={item.id}
                            setShowModal={setShowModal}
                            showModal={showModal}
                            handleEdit={handleEdit}
                          />
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
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

export default Transaction;
