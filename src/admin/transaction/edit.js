const ModalEdit = ({
  showModal,
  setShowModal,
  handleEdit,
  setIdTransaction,
  id,
}) => {
  return (
    <div>
      <button
        className=""
        type="submit"
        onClick={() => {
          setShowModal({ ...showModal, modalEdit: true });
          setIdTransaction(id);
        }}
      >
        <svg
          className="h-5 w-5 text-yellow-500 font-bold"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
      {showModal.modalEdit ? (
        <>
          <div className="bg-transparent mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Setujui Transaksi</h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto border-b">
                  <div>
                    <div
                      className="bg-green-100 border-l-4 border-green-500 text-black-700 p-4"
                      role="alert"
                    >
                      <p>Bukti telah di upload, Setujui transaksi !!</p>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                      setShowModal({ ...showModal, modalEdit: false })
                    }
                  >
                    Tidak
                  </button>
                  <button
                    className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      handleEdit();
                    }}
                  >
                    Setujui
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

export default ModalEdit;
