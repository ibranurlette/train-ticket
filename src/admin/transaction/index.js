import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getPayment } from "../../client/_action/payment";
import { updatePayment } from "../../client/_action/update_payment";
import ModalEdit from "./edit";
const Transaction = () => {
  const dispatch = useDispatch();
  const [transaction, setTransaction] = useState();
  const [showModal, setShowModal] = useState(false);
  const [idTransaction, setIdTransaction] = useState("");

  useEffect(() => {
    dispatch(getPayment())
      .then(async (res) => {
        setTransaction(res.value);
      })
      .catch((err) => {
        console.log("ERROR CARI DATA", err);
      });
  }, [dispatch]);

  const handleEdit = () => {
    const data = {
      idTransaction,
      train: {
        status: "disepakati",
      },
    };

    dispatch(updatePayment(data))
      .then(async (res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR PAYMENT", err);
      });
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Semua Transaksi
          </h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
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
                <option>All</option>
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
          </div>
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
                    Pemesan
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Nama Kereta
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Bukti Pembayaran
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {!transaction ? (
                  <>Loading</>
                ) : (
                  transaction.map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {index + 1}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.user.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.train.nameTrain}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        {item.attachment ? (
                          <img
                            src={require(`../../assets/${item.attachment}`)}
                            alt="bukti-transaction"
                            className="rounded"
                          />
                        ) : (
                          <p className="text-gray-900 whitespace-no-wrap">
                            Belum Ada Bukti
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white ">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">{item.status}</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white flex ">
                        <ModalEdit
                          setIdTransaction={setIdTransaction}
                          id={item.id}
                          setShowModal={setShowModal}
                          showModal={showModal}
                          handleEdit={handleEdit}
                        />
                        <button className="bg-gray-300 md:mr-2 sm:mb-2 md:mb-0 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                          Detail
                        </button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs: text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                <button className=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
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
