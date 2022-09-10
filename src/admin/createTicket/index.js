import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUsers } from "../../client/_action/user";
import {
  Tambah_train,
  getListTrain,
  getListStation,
  getListTown,
} from "../../client/_action/train";

const CreateTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [listTrain, setListTrain] = useState([]);
  const [listStation, setListStation] = useState([]);
  const [listTown, setListTown] = useState([]);
  const [data, setData] = useState({
    nameTrain: "",
    dateStart: "",
    dateEndTravel: "",
    user_id: "",
    startStation: "",
    startTown: "",
    endTown: "",
    startTime: "",
    destination: "",
    arrivalTime: "",
    price: "",
    totalQty: "",
    qty: "",
    typeTrain_id: "",
  });

  console.log("data", data);

  useEffect(() => {
    dispatch(getUsers())
      .then(async (res) => {
        setUser(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET USER");
      });
  }, [dispatch]);

  const handleCreate = (event) => {
    event.preventDefault();
    dispatch(Tambah_train({ ...data, user_id: user.id }))
      .then(async (res) => {
        navigate("/list-ticket", { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    dispatch(getListTown())
      .then(async (res) => {
        setListTown(res.value);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListTrain())
      .then(async (res) => {
        setListTrain(res.value);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListStation())
      .then(async (res) => {
        setListStation(res.value);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }, [dispatch]);

  return (
    <div className="mx-auto my-5">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <label className="block text-gray-700 text-lg font-bold mb-5">
          Buat Tiket
        </label>
        {error ? (
          <div className="relative flex-auto border-b mb-4">
            <div
              className="bg-red-100 border-l-4 border-red-500 text-black-700 p-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
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
                <div className="relative">
                  <select
                    className="block sm:w-[145px] md:w-[210px] appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded"
                    id="name-train"
                    value={data.nameTrain}
                    onChange={(e) => {
                      setData({ ...data, nameTrain: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    {listTrain.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listTrain.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
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
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Jenis Kereta
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none sm:w-[145px] md:w-[210px] bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded"
                    id="type-train"
                    value={data.typeTrain_id}
                    onChange={(e) => {
                      setData({ ...data, typeTrain_id: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    <option value="1">Eksekutif</option>
                    <option value="2">Bisnis</option>
                    <option value="3">Ekonomi</option>
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

            <h2 className="block text-gray-700 text-md font-bold mb-2">
              Keberangkatan
            </h2>

            <div className="flex justify-between mb-4">
              <div className="mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-date-time"
                >
                  Tanggal
                </label>
                <input
                  className="shadow appearance-none sm:w-[145px] md:w-[210px] border rounded w-full py-2 px-3 text-gray-700 mb-3"
                  id="start-date-time"
                  type="date"
                  value={data.dateStart}
                  onChange={(e) => {
                    setData({ ...data, dateStart: e.target.value });
                  }}
                />
              </div>
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-time"
                >
                  Jam
                </label>
                <input
                  className="shadow appearance-none border rounded sm:w-[145px] md:w-[210px] py-2 px-4 text-gray-700 mb-3"
                  id="start-time"
                  type="time"
                  value={data.startTime}
                  onChange={(e) => {
                    setData({ ...data, startTime: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-6 mr-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="end-time"
                >
                  Kota
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none sm:w-[145px] md:w-[210px] bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4"
                    id="name-train"
                    value={data.startTown}
                    onChange={(e) => {
                      setData({ ...data, startTown: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    {listTown.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listTown.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
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

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-time"
                >
                  Stasiun
                </label>

                <div className="relative">
                  <select
                    className="block appearance-none sm:w-[145px] md:w-[210px] bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded"
                    id="name-train"
                    value={data.startStation}
                    onChange={(e) => {
                      setData({ ...data, startStation: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    {listStation.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listStation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
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
            <h2 className="block text-gray-700 text-md font-bold mb-2">
              Tujuan
            </h2>

            <div className="flex justify-between">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-time"
                >
                  Kota
                </label>

                <div className="relative">
                  <select
                    className="block appearance-none sm:w-[145px] md:w-[210px] bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded"
                    id="name-train"
                    value={data.endTown}
                    onChange={(e) => {
                      setData({ ...data, endTown: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    {listTown.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listTown.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
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

              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="end-time"
                >
                  Stasiun
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none sm:w-[145px] md:w-[210px] bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 rounded"
                    id="name-train"
                    value={data.destination}
                    onChange={(e) => {
                      setData({ ...data, destination: e.target.value });
                    }}
                  >
                    <option value="">Pilih</option>
                    {listStation.length === 0 ? (
                      <>Loading</>
                    ) : (
                      listStation.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    )}
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

            <div className="flex justify-between mb-4">
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="start-date-time"
                >
                  Tanggal
                </label>
                <input
                  className="shadow appearance-none border sm:w-[145px] md:w-[210px] rounded w-full py-2 px-3 text-gray-700 mb-3"
                  id="start-date-time"
                  type="date"
                  value={data.dateEndTravel}
                  onChange={(e) => {
                    setData({ ...data, dateEndTravel: e.target.value });
                  }}
                />
              </div>

              <div className="">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="end-time"
                >
                  Jam
                </label>
                <input
                  className="shadow appearance-none border rounded sm:w-[145px] md:w-[210px] py-2 px-4 text-gray-700 mb-3"
                  id="end-time"
                  type="time"
                  value={data.arrivalTime}
                  onChange={(e) => {
                    setData({ ...data, arrivalTime: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price-ticket"
                >
                  Harga Tiket (Rp)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
                  id="price-ticket"
                  type="number"
                  placeholder="Rp. 50.000"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
                  id="qty"
                  type="number"
                  placeholder="100"
                  value={data.totalQty}
                  onChange={(e) => {
                    setData({ ...data, totalQty: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="qty"
              >
                Minimal pembelian (1)
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3"
                id="qty"
                type="number"
                placeholder="1"
                value={data.qty}
                onChange={(e) => {
                  setData({ ...data, qty: e.target.value });
                }}
              />
            </div>
            <button
              className="bg-blue-700 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded"
              type="submit"
              onClick={(e) => handleCreate(e)}
            >
              Buat
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
