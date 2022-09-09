import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import moment from "moment";

import { Beli_ticket } from "../../client/_action/payment";

const ModalBuy = ({
  showModal,
  setShowModal,
  setDataTicket,
  dataTicket,
  setSeeDetail,
  seeDetail,
  item,
  index,
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dateStart = moment(item.dateStart).format("DD MMMM YYYY");
  const dateEndTravel = moment(item.dateEndTravel).format("DD MMMM YYYY");

  let startTime = moment(item.startTime, "hh:mm:ss");
  let arrivalTime = moment(item.arrivalTime, "hh:mm:ss");
  const duration = moment.duration(arrivalTime.diff(startTime));
  const hours = parseInt(Math.abs(duration.asHours()));
  const minutes = parseInt(duration.asMinutes()) % 60;

  const handleIncreament = (ticket_id) => {
    setDataTicket((dataTicket) =>
      dataTicket.map((item) =>
        ticket_id === item.id ? { ...item, qty: parseInt(item.qty) + 1 } : item
      )
    );
  };

  const handleDecreament = (ticket_id) => {
    setDataTicket((dataTicket) =>
      dataTicket.map((item) =>
        ticket_id === item.id
          ? {
              ...item,
              qty: parseInt(item.qty) - (parseInt(item.qty) > 1 ? 1 : 0),
            }
          : item
      )
    );
  };

  const handlebuy = () => {
    dispatch(
      Beli_ticket({
        Train_id: item.id,
        qty: item.qty,
        Total_price: parseInt(item.price) * parseInt(item.qty),
        status: "pending",
      })
    )
      .then(async (res) => {
        navigate("/payment", {
          state: { ticket: res.value },
        });
      })
      .catch((err) => {
        console.log("ERROR BUY TICKET", err);
      });
  };

  return (
    <div>
      <button
        className="sm:w-full bg-blue-700 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
        data-modal-toggle="defaultModal"
        type="button"
        onClick={() => {
          setShowModal(true);
          setSeeDetail(dataTicket[index]);
        }}
      >
        Pilih
      </button>
      {showModal && seeDetail.id === item.id ? (
        <>
          <div className="mx-2 justify-center fade items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {token ? "Beli Tiket" : "Peringatan"}
                  </h3>
                  <button onClick={() => setShowModal(false)}>
                    <span className="text-red-500 h-6 w-6 text-2xl block outline-none">
                      x
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto border-b">
                  <div>
                    {token ? (
                      <div className="md:flex md:justify-start">
                        <div className="sm:text-center md:text-left">
                          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white md:mr-10">
                            {item.train_name.name}
                          </h5>
                          <p className="text-gray-500 font-semibold text-[14px]">
                            {item.typeTrain.name}
                          </p>
                        </div>
                        <div className="sm:flex sm:justify-center">
                          <div className="mr-5 mt-2">
                            <div className="w-3 h-3 rounded-full  border border-blue-600" />
                            <div className="w-px h-16 ml-1 my-1 border-dashed border border-gray-500" />
                            <div className="w-3 h-3 rounded-full  bg-blue-600" />
                          </div>
                          <div>
                            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white mr-24">
                              {item.startTime}
                            </h5>
                            <p className="text-gray-500 font-semibold text-[14px]">
                              {dateStart}
                            </p>
                            <p className="text-gray-500 text-[14px] my-2">
                              {hours}j - {minutes}m
                            </p>

                            <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                              {item.arrivalTime}
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
                              {item.start_station.name}
                            </p>

                            <h5 className="text-md font-medium tracking-tight text-gray-900 dark:text-white mt-9">
                              Yogyakarta
                            </h5>
                            <p className="text-gray-500 font-semibold text-[14px]">
                              {item.destina_tion.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        Kamu belum login, Silahkan login terlebih dahulu
                      </div>
                    )}
                  </div>
                </div>
                {token ? (
                  <div className="flex justify-between items-center mx-5 my-3">
                    <div className="flex justify-start items-center">
                      <button
                        type="button"
                        className="border border-blue-700 text-center text-blue-700 font-bold rounded w-10 h-10"
                        onClick={() => {
                          handleDecreament(item.id);
                        }}
                      >
                        -
                      </button>

                      <input
                        className="shadow border border-blue-700 rounded py-2 mx-2 text-blue-700 leading-snug text-center w-20"
                        id="qty"
                        type="number"
                        placeholder="1"
                        value={parseInt(item.qty)}
                        onChange={() => {}}
                      />

                      <button
                        type="button"
                        className="border border-blue-700 text-center text-blue-700 font-bold rounded w-10 h-10"
                        onClick={() => {
                          handleIncreament(item.id);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white text-right">
                      Rp {parseInt(item.price) * parseInt(item.qty)}
                    </h5>
                  </div>
                ) : null}
                {/*footer*/}
                <div className="mx-3 border-t border-solid border-slate-200 py-2 flex">
                  {!token && (
                    <div className="p-2">
                      <button
                        className="bg-blue-700 text text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-2"
                        type="submit"
                        onClick={() => {}}
                      >
                        <Link to="/login">Login Sekarang !!</Link>
                      </button>
                    </div>
                  )}

                  <div className="p-2">
                    <button
                      className="bg-blue-700 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none mr-2"
                      type="submit"
                      onClick={token && handlebuy}
                    >
                      {token ? (
                        "Beli Sekarang"
                      ) : (
                        <Link to="/register">Buat Akun Dulu !!</Link>
                      )}
                    </button>

                    {token && (
                      <button
                        className="text-red-500 font-bold uppercase px-6 py-3 text-sm border border-red-500 rounded hover:shadow-lg"
                        type="submit"
                        onClick={() => setShowModal(false)}
                      >
                        Tutup
                      </button>
                    )}
                  </div>
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
