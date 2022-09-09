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
        className=""
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalDetail: true });
          setIdTicket(item.id);
        }}
      >
        <svg
          className="h-5 w-5 text-blue-700 font-bold"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10,6.978c-1.666,0-3.022,1.356-3.022,3.022S8.334,13.022,10,13.022s3.022-1.356,3.022-3.022S11.666,6.978,10,6.978M10,12.267c-1.25,0-2.267-1.017-2.267-2.267c0-1.25,1.016-2.267,2.267-2.267c1.251,0,2.267,1.016,2.267,2.267C12.267,11.25,11.251,12.267,10,12.267 M18.391,9.733l-1.624-1.639C14.966,6.279,12.563,5.278,10,5.278S5.034,6.279,3.234,8.094L1.609,9.733c-0.146,0.147-0.146,0.386,0,0.533l1.625,1.639c1.8,1.815,4.203,2.816,6.766,2.816s4.966-1.001,6.767-2.816l1.624-1.639C18.536,10.119,18.536,9.881,18.391,9.733 M16.229,11.373c-1.656,1.672-3.868,2.594-6.229,2.594s-4.573-0.922-6.23-2.594L2.41,10l1.36-1.374C5.427,6.955,7.639,6.033,10,6.033s4.573,0.922,6.229,2.593L17.59,10L16.229,11.373z"
            clipRule="evenodd"
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
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
