import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUsers } from "../../client/_action/user";
import { getOneTicket } from "../../client/_action/ticket";
import { updatePayment } from "../../client/_action/update_payment";
import { uploadProof } from "../../client/_action/upload";

import ModalFinishPayment from "../modal-finish-payment";

const Payment = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const ticket = state.ticket;
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [train, setTrain] = useState();
  const [file, setFile] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  useEffect(() => {
    dispatch(getUsers())
      .then(async (res) => {
        setUser(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET USER", err);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOneTicket(ticket.Train_id))
      .then(async (res) => {
        setTrain(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET DETAIL PAYMENT", err);
      });
  }, [dispatch, ticket.Train_id]);

  const handlePayment = (event) => {
    const data = {
      id: ticket.id,
      train: {
        status: "menunggu disetujui",
      },
    };
    event.preventDefault();
    dispatch(updatePayment(data))
      .then(async (res) => {
        setShowModal(true);
      })
      .catch((err) => {
        console.log("ERROR UPDATE PAYMENT", err);
      });
  };
  const handleUpload = (event, file) => {
    const formData = new FormData();
    formData.append("payment", file);

    event.preventDefault();
    dispatch(uploadProof(formData, ticket.id))
      .then(async (res) => {
        setIsUpload(true);
      })
      .catch((err) => {
        console.log("ERROR UPLOAD PROOF PAYMENT", err);
      });
  };

  return (
    <div className="w-[100%] max-w-4xl mx-auto">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <label className="block text-gray-700 text-lg font-bold mb-2">
          Rincian Pesanan
        </label>
        <div className="">
          <div className="">
            <p className="mb-1 text-gray-700 font-bold">Pembayaran</p>
            <div className="mb-4 border shadow-md rounded-lg p-5 text-justify text-base font-medium">
              <p>
                Tiket bisa kamu bayar melalui rekening di bawah ini, kamu bisa
                transfer menggunakan ATM, Mobile Banking dan Internet Banking.
              </p>
              <p className="text-blue-500">Rekening BNI : 83218492194</p>
            </div>
            <p className="mb-2 text-gray-700 font-bold">Alamat</p>
            {user ? (
              <div className="mb-4 text-base font-medium">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Handphone
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Alamat
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.phone}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.addres}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>Loading</>
            )}
          </div>
          <p className="mb-2 text-gray-700 font-bold">Rute Kereta</p>

          {train ? (
            <div className="border shadow-md rounded-lg py-5 bg-gray-50">
              <div className="lg:flex md:justify-around">
                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-center">
                    {train.train_name.name}
                  </h5>
                  <p className="text-gray-500 text-[15px] sm:text-center md:text-left sm:mb-4 md:mb-0">
                    {train.typeTrain.name}
                  </p>
                </div>
                <div className="md:flex md:justify-between text-center">
                  <div className="md:mr-5">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {train.startTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {train.start_station.name}
                    </p>
                  </div>

                  <div className="md:flex md:mr-5 sm:my-2 md:my-0">
                    <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                    <p className="text-gray-500 text-[15px] mt-4 mx-2">2j 0m</p>
                    <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                  </div>

                  <div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                      {train.arrivalTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {train.destina_tion.name}
                    </p>
                  </div>
                </div>

                <div className="sm:mt-2 md:mt-0 md:text-right sm:text-center">
                  <p className="text-gray-500 text-[15px]">
                    {ticket.qty} x Rp {train.price}
                  </p>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white ">
                    Total : Rp {ticket.Total_price}
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <>Loading</>
          )}

          <p className="mt-3 mb-2 text-gray-700 font-bold">
            Upload Bukti Pembayaran
          </p>
          <div className="">
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="bukti_pembayaran"
                type="file"
                name="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>

            <div className="flex justify-start">
              <button
                className={`${
                  isUpload ? "bg-gray-300" : "bg-gray-900"
                }  text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ml-2 ease-linear transition-all duration-150`}
                type="submit"
                disabled={isUpload ? true : false}
                onClick={(e) => {
                  handleUpload(e, file);
                }}
              >
                Upload
              </button>
              <ModalFinishPayment
                showModal={showModal}
                setShowModal={setShowModal}
                isUpload={isUpload}
                handlePayment={handlePayment}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
