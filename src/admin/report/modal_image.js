import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { detailPayment } from "../../client/_action/payment";

const ModalImage = ({
  showModal,
  setShowModal,
  setIdTransaction,
  idTransaction,
  item,
  transaction,
}) => {
  const dispatch = useDispatch();
  const [proofPayment, setProofPayment] = useState();

  useEffect(() => {
    dispatch(detailPayment(idTransaction))
      .then(async (res) => {
        setProofPayment(res.value.attachment);
      })
      .catch((err) => {
        console.log("ERROR DETAIL TRANSACTION", err);
      });
  }, [dispatch, idTransaction, transaction]);

  return (
    <div>
      <button
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalImage: true });
          setIdTransaction(item.id);
        }}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <img
          src={require(`../../assets/${item.attachment}`)}
          alt="bukti-transaction"
          className="rounded w-20 h-20"
        />
      </button>
      {showModal.modalImage ? (
        <>
          <div className="mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Bukti Pembayaran</h3>
                  <button
                    onClick={() => {
                      setShowModal({ ...showModal, modalImage: false });
                    }}
                  >
                    <span className=" text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>

                {/*body*/}
                <div className="relative flex-auto border-b">
                  {!proofPayment ? (
                    <>Loading</>
                  ) : (
                    <img
                      src={require(`../../assets/${proofPayment}`)}
                      alt="bukti-transaction"
                      className="p-2 w-screen h-[32rem]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ModalImage;
