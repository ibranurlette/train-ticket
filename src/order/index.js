import ticket from "../ticket.json";
import { Link } from "react-router-dom";
const Order = () => {
  return (
    <div className="sm:w-[20rem] md:w-[50rem] mx-auto sm:mt-5">
      <p className="mb-2 text-gray-700 font-bold">Daftar Pesanan Kamu</p>
      {ticket.map((item, index) => (
        <div
          key={index}
          className="border shadow-md rounded-lg py-2 bg-gray-50 mb-5"
        >
          <div className="md:flex md:justify-around border-b pb-2">
            <div>
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-center md:text-left">
                {item.trainName}
              </h5>
              <p className="text-gray-500 text-[15px] sm:text-center md:text-left sm:mb-4 md:mb-0">
                {item.class}
              </p>
            </div>
            <div className="md:flex md:justify-between text-center">
              <div className="md:mr-5">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.startTime}
                </h5>
                <p className="text-gray-500 text-[15px]">{item.startStation}</p>
              </div>

              <div className="md:flex md:mr-5 sm:my-2 md:my-0">
                <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                <p className="text-gray-500 text-[15px] mt-4 mx-2">
                  {item.duration}
                </p>
                <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
              </div>

              <div>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.endTime}
                </h5>
                <p className="text-gray-500 text-[15px]">{item.endStation}</p>
              </div>
            </div>

            <div className="sm:mt-2">
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-right sm:text-center">
                Rp {item.price}
              </h5>
            </div>
          </div>
          <div className="md:ml-14 mt-2 sm:text-center md:text-left">
            <p className="text-gray-900 text-[15px] font-semibold mb-2">
              Menunggu Pembayaran
            </p>
            <button
              className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => {}}
            >
              <Link to="/payment">Bayar Sekarang</Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
