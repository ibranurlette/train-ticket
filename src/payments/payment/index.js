import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";

import { getUsers } from "../../client/_action/user";
import { getOneTicket } from "../../client/_action/ticket";
import { updatePayment } from "../../client/_action/payment";
import { uploadProof } from "../../client/_action/payment";

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
  const [showTicket, setShowTicket] = useState(false);

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

  let startTime = moment(train && train.startTime, "hh:mm:ss");
  let arrivalTime = moment(train && train.arrivalTime, "hh:mm:ss");
  const duration = moment.duration(arrivalTime.diff(startTime));
  const hours = parseInt(Math.abs(duration.asHours()));
  const minutes = parseInt(duration.asMinutes()) % 60;

  const dateStart = moment(train && train.dateStart).format("DD MMMM YYYY");
  const dateEndTravel = moment(train && train.dateEndTravel).format(
    "DD MMMM YYYY"
  );

  console.log("train", train);

  return (
    <div className="w-[100%] max-w-4xl mx-auto">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <label className="block text-lg font-bold mb-2">Rincian Pesanan</label>
        <div className="">
          <div className="">
            <p className="mb-1 font-bold">Pembayaran</p>
            <div className="mb-4 border shadow-md rounded-lg p-5 text-justify text-base font-medium">
              <p>
                Tiket bisa kamu bayar melalui rekening di bawah ini, kamu bisa
                transfer menggunakan ATM, Mobile Banking dan Internet Banking.
              </p>
              <p className="text-blue-500">Rekening BNI : 83218492194</p>
            </div>
            <p className="mb-2 font-bold">Alamat</p>
            {user ? (
              <div className="mb-4 text-base font-medium">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                  <table className="w-full text-sm text-left ">
                    <thead className="font-bold bg-blue-500 text-white">
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
                      <tr className="bg-white border-b text-black">
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
          <p className="mb-2 font-bold">Rute Kereta</p>

          {train ? (
            <div className="mb-5 p-6 bg-white rounded-lg border border-blue-500 rounded shadow-md">
              <div className="md:flex md:justify-around">
                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    {train.train_name.name}
                  </h5>
                  <p className="text-gray-500 text-[15px]">
                    {train.typeTrain.name}
                  </p>
                </div>
                <div className="flex justify-between">
                  <div className="mr-5">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      {train.startTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {train.start_station.name}
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
                      {train.arrivalTime}
                    </h5>
                    <p className="text-gray-500 text-[15px]">
                      {train.destina_tion.name}
                    </p>
                  </div>
                </div>

                <div className="md:flex md:mr-5 sm:text-center">
                  <div className="md:h-10 md:bg-gray-300 md:w-0.5 md:mt-2" />
                  <p className="text-lg font-bold tracking-tight text-gray-900 dark:text-white mt-3 md:mx-2">
                    {hours}j {minutes}m
                  </p>
                </div>

                <div className="sm:mt-2 sm:border-t md:border-none sm:pt-4 md:pt-0">
                  <h5 className="text-sm  text-gray-500 dark:text-white md:mb-2">
                    {train.qty} x Rp. {train.price}
                  </h5>
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white md:mb-2">
                    Rp. {train.price}
                  </h5>
                </div>
              </div>
              {/* Main modal */}

              <div className="mt-5 text-center ">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTicket(!showTicket);
                  }}
                >
                  <p className="text-[15px] text-gray-900 mb-2 font-semibold">
                    Lihat Detail Perjalanan
                  </p>
                </button>
                {showTicket && train ? (
                  <div className="h-1 w-28 bg-gray-900 mx-auto" />
                ) : (
                  <></>
                )}
              </div>

              {showTicket && train ? (
                <div>
                  <div className="h-px bg-gray-300" />
                  <div className="lg:flex lg:justify-start mt-5">
                    <div className="lg:mr-16 ">
                      <h5 className="text-md font-bold tracking-tight text-gray-900">
                        {train.train_name.name}
                      </h5>
                      <p className="text-gray-500 font-semibold text-[14px]">
                        {train.typeTrain.name}
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
                          {train.startTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {dateStart}
                        </p>
                        <p className="text-gray-500 text-[14px] my-2">
                          {hours}j {minutes}m
                        </p>

                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {train.arrivalTime}
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
                          {train.start_station.name}
                        </p>

                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                          Yogyakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {train.destina_tion.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <>Loading</>
          )}

          <p className="mt-3 mb-2 font-bold">Upload Bukti Pembayaran</p>
          <div className="">
            <div>
              {ticket.attachment ? (
                <p className="mt-3 mb-2 font-bold">Bukti Sudah di Upload</p>
              ) : (
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="bukti_pembayaran"
                  type="file"
                  name="file"
                  // value={ticket.attachment}
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              )}
            </div>

            <div className="flex justify-start">
              <button
                className={`${
                  isUpload || ticket.attachment
                    ? "bg-blue-300"
                    : "active:bg-emerald-600 bg-blue-700"
                }  text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                type="submit"
                disabled={isUpload || ticket.attachment ? true : false}
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
                attachment={ticket.attachment}
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
