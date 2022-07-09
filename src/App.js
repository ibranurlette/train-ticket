import "./App.css";

function App() {
  return (
    <div>
      <div className="w-full bg-gray-800	 text-white p-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ticket Train</h1>
        <div>
          <button className="bg-white text-black px-5 py-2 mx-3 rounded font-bold">
            Masuk
          </button>
          <button className="bg-white text-black px-5 py-2 rounded font-bold">
            Daftar
          </button>
        </div>
      </div>

      <div className="bg-gray-100	lg:flex lg:justify-around grid justify-items-center items-center text-center py-7">
        <div>
          <h1 className="text-3xl font-semibold">Hi Pencari Tiket</h1>
          <h1 className="font-medium">Daftar Sekarang!!</h1>
          <button className="bg-gray-800 text-white px-5 py-2 rounded mt-2 font-bold">
            Daftar
          </button>
        </div>
        <img
          src={require("./assets/iklan2.jpeg")}
          alt="iklan-bonus"
          className="lg:max-w-md sm:max-w-xs sm:mt-5"
        />
      </div>

      <div className="w-[100%] max-w-2xl mx-auto">
        <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-5">
            Cari Tiket Kereta Kamu
          </label>
          <div className="flex justify-center">
            <div className="md:mr-20 sm:mr-10">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="asal"
                >
                  Asal
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="asal"
                  type="text"
                  placeholder="Asal"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="tujuan"
                >
                  Keberangkatan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="keberangkatan"
                  type="date"
                />
              </div>
            </div>
            <div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="tujuan"
                >
                  Tujuan
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="tujuan"
                  type="text"
                  placeholder="Tujuan"
                />
              </div>

              <button
                className="bg-gray-800 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cari Tiket
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="overflow-x-scroll m-5">
        <table className="table-auto mx-auto ">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nomor</th>
              <th className="border px-4 py-2">Nama Kereta</th>
              <th className="border px-4 py-2">Berangkat</th>
              <th className="border px-4 py-2">Tiba</th>
              <th className="border px-4 py-2">Durasi</th>
              <th className="border px-4 py-2">Harga / Orang</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">agro wilis</td>
              <td className="border px-4 py-2">
                <p>stasiun manggarai</p>
                <p>07:00:00</p>
              </td>
              <td className="border px-4 py-2">
                <p>Stasiun Surabaya Pasarturi</p>
                <p>19:00:00</p>
              </td>
              <td className="border px-4 py-2">12 Jam 0 Menit</td>
              <td className="border px-4 py-2">Rp. 300000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">agro wilis</td>
              <td className="border px-4 py-2">
                <p>stasiun manggarai</p>
                <p>07:00:00</p>
              </td>
              <td className="border px-4 py-2">
                <p>Stasiun Surabaya Pasarturi</p>
                <p>19:00:00</p>
              </td>
              <td className="border px-4 py-2">12 Jam 0 Menit</td>
              <td className="border px-4 py-2">Rp. 300000</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">3</td>
              <td className="border px-4 py-2">agro wilis</td>
              <td className="border px-4 py-2">
                <p>stasiun manggarai</p>
                <p>07:00:00</p>
              </td>
              <td className="border px-4 py-2">
                <p>Stasiun Surabaya Pasarturi</p>
                <p>19:00:00</p>
              </td>
              <td className="border px-4 py-2">12 Jam 0 Menit</td>
              <td className="border px-4 py-2">Rp. 300000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center p-6 bg-gray-100	">
        <span>© 2021 Copyright:</span>
        <a
          className="text-gray-600 font-semibold"
          href="https://tailwind-elements.com/"
        >
          Ibra Nurlette
        </a>
      </div>
    </div>
  );
}

export default App;
