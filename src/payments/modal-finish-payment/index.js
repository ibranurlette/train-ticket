import { Link } from "react-router-dom";

const ModalFinishPayment = ({
  showModal,
  setShowModal,
  isUpload,
  attachment,
  handlePayment,
}) => {
  return (
    <div>
      <button
        disabled={isUpload || attachment ? false : true}
        className={`${
          isUpload || attachment
            ? "active:bg-emerald-600 bg-gray-900"
            : "bg-gray-300"
        }  text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ml-2 ease-linear transition-all duration-150`}
        type="submit"
        onClick={(event) => handlePayment(event)}
      >
        Bayar Sekarang
      </button>
      {showModal ? (
        <>
          <div className="mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl font-semibold">Pembayaran</h3>
                </div>
                {/*body*/}
                <div className="relative flex-auto border-b">
                  <div>
                    <div
                      className="bg-green-100 border-l-4 border-green-500 text-black-700 p-4"
                      role="alert"
                    >
                      <p className="font-bold">Selamat</p>
                      <p>
                        Pembayaran telah berhasil, silahkan tunggu !! pembayaran
                        sedang di proses
                      </p>
                    </div>
                  </div>
                </div>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    <Link to="/">Kembali ke Beranda</Link>
                  </button>
                  <button
                    className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {}}
                  >
                    <Link to="/order">Lihat Transaksi kamu</Link>
                  </button>
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

export default ModalFinishPayment;
