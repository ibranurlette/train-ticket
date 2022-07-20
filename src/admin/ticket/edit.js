import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateTicket } from "../../client/_action/ticket";

const EditTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const ticket = state.ticket;

  const [data, setData] = useState({
    nameTrain: ticket.nameTrain,
    dateStart: ticket.dateStart,
    startStation: ticket.startStation,
    startTime: ticket.startTime,
    destination: ticket.destination,
    arrivalTime: ticket.arrivalTime,
    price: ticket.price,
    totalQty: ticket.totalQty,
    typeTrain_id: ticket.typeTrain.id.toString(),
  });

  const handleEdit = (event) => {
    const ticket2 = {
      id: ticket.id,
      data2: data,
    };
    event.preventDefault();
    dispatch(updateTicket(ticket2))
      .then(async (res) => {
        navigate("/list-ticket", { replace: true });
      })
      .catch((err) => {
        console.log("ERROR CARI DATA", err);
      });
  };

  return (
    <div className="mx-auto my-5">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <label className="block text-gray-700 text-lg font-bold mb-5">
          Edit Tiket
        </label>
        <div className="">
          <div>
            <div className="flex justify-between">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name-train"
                >
                  Nama Kereta
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name-train"
                  type="text"
                  value={data.nameTrain}
                  onChange={(e) => {
                    setData({ ...data, nameTrain: e.target.value });
                  }}
                  placeholder="Nama Kereta"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Jenis Kereta
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="type-train"
                    value={data.typeTrain_id}
                    onChange={(e) => {
                      setData({ ...data, typeTrain_id: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    <option value="1">Eksekutif</option>
                    <option value="2">Ekonomi</option>
                    <option value="3">Bisnis</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="start-date-time"
              >
                Tanggal Keberangkatan
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="start-date-time"
                type="date"
                value={data.dateStart}
                onChange={(e) => {
                  setData({ ...data, dateStart: e.target.value });
                }}
              />
            </div>
            <div className="flex">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-time"
                >
                  Stasiun Keberangkatan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="start-station"
                  type="text"
                  value={data.startStation}
                  onChange={(e) => {
                    setData({ ...data, startStation: e.target.value });
                  }}
                  placeholder="Stasiun Keberangkatan"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="end-time"
                >
                  Stasiun Tujuan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="end-station"
                  type="text"
                  value={data.destination}
                  onChange={(e) => {
                    setData({ ...data, destination: e.target.value });
                  }}
                  placeholder="Stasiun Tujuan"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-time"
                >
                  Jam Keberangkatan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="start-time"
                  type="time"
                  value={data.startTime}
                  onChange={(e) => {
                    setData({ ...data, startTime: e.target.value });
                  }}
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="end-time"
                >
                  Jam Tiba
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="end-time"
                  type="time"
                  value={data.arrivalTime}
                  onChange={(e) => {
                    setData({ ...data, arrivalTime: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price-ticket"
                >
                  Harga Tiket (Rp)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="price-ticket"
                  type="number"
                  value={data.price}
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="qty"
                >
                  Stok Tersedia
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="qty"
                  type="number"
                  value={data.totalQty}
                  onChange={(e) => {
                    setData({ ...data, totalQty: e.target.value });
                  }}
                />
              </div>
            </div>
            <button
              className="bg-gray-800 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleEdit(e)}
            >
              Edit Tiket
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
