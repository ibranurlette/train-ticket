import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getOneTicket } from "../../client/_action/ticket";

const ModalDetail = ({
  showModal,
  setShowModal,
  setIdTicket,
  idTicket,
  item,
}) => {
  const dispatch = useDispatch();
  const [detail, setDetail] = useState();

  useEffect(() => {
    dispatch(getOneTicket(idTicket))
      .then(async (res) => {
        setDetail(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET DETAIL TICKET", err);
      });
  }, [dispatch, idTicket]);

  return (
    <div>
      <button
        className="bg-gray-300 md:mr-2 sm:mb-2 md:mb-0 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalDetail: true });
          setIdTicket(item.id);
        }}
      >
        Detail
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
                </div>
                {/*body*/}
                <div className="relative flex-auto">
                  <div className="border shadow-md rounded-lg bg-gray-50 p-5">
                    <div className="">
                      <div>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white ">
                          {detail.train_name.name}
                        </h5>
                        <p className="text-gray-500 text-[15px] sm:mb-4">
                          {detail.typeTrain.name}
                        </p>
                      </div>
                      <div className="md:flex md:justify-between">
                        <div className="">
                          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                            {detail.startTime}
                          </h5>
                          <p className="text-gray-500 text-[15px]">
                            {detail.start_station.name}
                          </p>
                        </div>

                        <div className="md:flex sm:my-2 md:my-0 md:mx-10">
                          <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                          <p className="text-gray-500 text-[15px] mt-4 mx-2">
                            {/* {detail.duration} */}
                            2j 0m
                          </p>
                          <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                        </div>

                        <div>
                          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-right">
                            {detail.arrivalTime}
                          </h5>
                          <p className="text-gray-500 text-[15px]">
                            {detail.destina_tion.name}
                          </p>
                        </div>
                      </div>
                      <div className="sm:mt-2 md:mt-2 text-right">
                        <p className="text-gray-500 text-[15px]">
                          Total Qty : {detail.totalQty} Tiket
                        </p>
                        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white ">
                          Total : Rp {detail.price}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 rounded-b">
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setShowModal({ ...showModal, modalDetail: false })
                    }
                  >
                    Tutup
                  </button>
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
