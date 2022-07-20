import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { deleteTicket } from "../../client/_action/ticket";

const ModalDelete = ({
  showModal,
  setShowModal,
  setIdTicket,
  idTicket,
  item,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteTicket(idTicket))
      .then(async (res) => {
        setShowModal({ ...showModal, modalDelete: false });
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR DELETE DATA", err);
      });
  };
  return (
    <div>
      <button
        className="bg-gray-300 md:mr-2 sm:mb-2 md:mb-0 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalDelete: true });
          setIdTicket(item.id);
        }}
      >
        Hapus
      </button>
      {showModal.modalDelete ? (
        <>
          <div className="bg-transparent mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Hapus Tiket</h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto border-b">
                  <div>
                    <div
                      className="bg-yellow-100 border-l-4 border-yellow-500 text-black-700 p-4"
                      role="alert"
                    >
                      <p>Kamu yakin ingin menghapus tiket ini ?</p>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setShowModal({ ...showModal, modalDelete: false })
                    }
                  >
                    Tutup
                  </button>
                  <button
                    className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={(e) => {
                      handleDelete(e);
                    }}
                  >
                    Ya, Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-10 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default ModalDelete;
