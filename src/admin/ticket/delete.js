import { useDispatch } from "react-redux";

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
        className=""
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalDelete: true });
          setIdTicket(item.id);
        }}
      >
        <svg
          className="h-5 w-5 text-red-500 font-bold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
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
                      className="bg-red-100 border-l-4 border-red-500 text-black-700 p-4"
                      role="alert"
                    >
                      <p>Kamu yakin ingin menghapus tiket ini ?</p>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm"
                    type="button"
                    onClick={() =>
                      setShowModal({ ...showModal, modalDelete: false })
                    }
                  >
                    Tidak
                  </button>
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg"
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
