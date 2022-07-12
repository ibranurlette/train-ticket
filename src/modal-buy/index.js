import { Link } from "react-router-dom";

const ModalBuy = ({ showModal, setShowModal, setDataTicket, item }) => {
  const handleIncreament = (ticket_id) => {
    setDataTicket((dataTicket) =>
      dataTicket.map((item) =>
        ticket_id === item.id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };
  const handleDecreament = (ticket_id) => {
    setDataTicket((dataTicket) =>
      dataTicket.map((item) =>
        ticket_id === item.id
          ? { ...item, qty: item.qty - (item.qty > 1 ? 1 : 0) }
          : item
      )
    );
  };
  return (
    <div>
      <button
        className="sm:w-full bg-gray-800 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
        data-modal-toggle="defaultModal"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Pilih
      </button>
      {showModal ? (
        <>
          <div className="mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Beli Tiket</h3>
                  <button onClick={() => setShowModal(false)}>
                    <span className=" text-gray-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto border-b">
                  <div>
                    <div className="flex justify-start">
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-16">
                          {item.trainName}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.class}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                          {item.startTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          10 Juli 2022
                        </p>
                        <p className="text-gray-500 text-[14px] my-2">
                          {item.duration}
                        </p>

                        <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.endTime}
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          11 Juli 2022
                        </p>
                      </div>

                      <div>
                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white">
                          Jakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.startStation}
                        </p>

                        <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                          Yogyakarta
                        </h5>
                        <p className="text-gray-500 font-semibold text-[14px]">
                          {item.endStation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center mx-5">
                  <div className="flex justify-start items-center">
                    <button
                      type="button"
                      className="bg-gray-900 text-center text-white font-bold rounded w-10 h-10"
                      onClick={() => {
                        handleDecreament(item.id);
                      }}
                    >
                      -
                    </button>

                    <input
                      className="shadow w-20 appearance-none border rounded py-2 my-3 mx-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="qty"
                      type="number"
                      placeholder="1"
                      value={item.qty}
                      onChange={() => {}}
                    />

                    <button
                      type="button"
                      className="bg-gray-900 text-center text-white font-bold rounded w-10 h-10"
                      onClick={() => {
                        handleIncreament(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>

                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-right">
                    Rp {item.price * item.qty}
                  </h5>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Tutup
                  </button>
                  <button
                    className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {}}
                  >
                    <Link to="/payment">Beli Sekarang</Link>
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

export default ModalBuy;
