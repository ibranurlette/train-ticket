import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

import { detailPayment } from "../../client/_action/payment";

const ModalDetail = ({
  showModal,
  setShowModal,
  setIdTransaction,
  idTransaction,
  item,
  transaction,
}) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();

  useEffect(() => {
    dispatch(detailPayment(!idTransaction ? transaction[0].id : idTransaction))
      .then(async (res) => {
        setDetail(res.value);
      })
      .catch((err) => {
        console.log("ERROR DETAIL TRANSACTION", err);
      });
  }, [dispatch, idTransaction, transaction]);

  const dateStart = moment(detail && detail.train.dateStart).format(
    "DD MMMM YYYY"
  );
  const dateEndTravel = moment(detail && detail.train.dateEndTravel).format(
    "DD MMMM YYYY"
  );

  let startTime = moment(detail && detail.train.startTime, "hh:mm:ss");
  let arrivalTime = moment(detail && detail.train.arrivalTime, "hh:mm:ss");
  const duration = moment.duration(arrivalTime.diff(startTime));
  const hours = parseInt(Math.abs(duration.asHours()));
  const minutes = parseInt(duration.asMinutes()) % 60;

  return (
    <div>
      <button
        className=""
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalDetail: true });
          setIdTransaction(item.id);
        }}
      >
        <svg
          className="h-5 w-5 text-sky-500 font-bold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {showModal.modalDetail && detail ? (
        <>
          <div className="bg-transparent mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Detail Transaksi</h3>
                  <button
                    onClick={() =>
                      setShowModal({ ...showModal, modalDetail: false })
                    }
                  >
                    <span className="text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto border-b">
                  <div>
                    <div className="lg:flex lg:justify-start">
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-10">
                          {detail.train.train_name.name}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {detail.train.typeTrain.name}
                        </p>
                      </div>
                      <div className="sm:flex sm:justify-start">
                        <div className="mr-5 mt-2">
                          <div className="w-3 h-3 rounded-full  border border-blue-600" />
                          <div className="w-px h-16 ml-1 my-1 border-dashed border border-gray-500" />
                          <div className="w-3 h-3 rounded-full  bg-blue-600" />
                        </div>
                        <div>
                          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                            {detail.train.startTime}
                          </h5>
                          <p className="text-gray-500 font-semibold text-[14px]">
                            {dateStart}
                          </p>
                          <p className="text-gray-500 text-[14px] my-2">
                            {hours}j - {minutes}m
                          </p>

                          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                            {detail.train.arrivalTime}
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
                            {detail.train.start_station.name}
                          </p>

                          <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                            Yogyakarta
                          </h5>
                          <p className="text-gray-500 font-semibold text-[14px]">
                            {detail.train.destina_tion.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="sm:mt-2 md:mt-2 border-t pt-4">
                      <p className="text-gray-500 text-[15px]">
                        {detail.qty} x Rp {detail.train.price}
                      </p>
                      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white ">
                        Total : Rp {detail.Total_price}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-5 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : showModal.modalDetail && !detail ? (
        <>LOADING</>
      ) : null}
    </div>
  );
};

export default ModalDetail;
