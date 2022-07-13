const Payment = () => {
  return (
    <div className="w-[100%] max-w-4xl mx-auto">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mx-auto">
        <label className="block text-gray-700 text-lg font-bold mb-2">
          Rincian Pesanan
        </label>
        <div className="">
          <div className="">
            <p className="mb-1 text-gray-700 font-bold">Pembayaran</p>
            <div className="mb-4 border shadow-md rounded-lg p-5 text-justify text-base font-medium">
              <p>
                Tiket bisa kamu bayar melalui rekening di bawah ini, kamu bisa
                transfer menggunakan ATM, Mobile Banking dan Internet Banking.
              </p>
              <p className="text-blue-500">Rekening BNI : 83218492194</p>
            </div>
            <p className="mb-2 text-gray-700 font-bold">Alamat</p>
            <div className="mb-4 text-base font-medium">
              {/* <table className="border-collapse border border-slate-400"> */}
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Handphone
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Alamat
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4"> Ibra Nurlette</td>
                      <td className="px-6 py-4">082110839417</td>
                      <td className="px-6 py-4">ibraputra843@gmail.com</td>
                      <td className="px-6 py-4">
                        Jl Salameb Tengah II Paseban Senen
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className="mb-2 text-gray-700 font-bold">Rute Kereta</p>
          <div className="border shadow-md rounded-lg py-5 bg-gray-50">
            <div className="lg:flex md:justify-around">
              <div>
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white sm:text-center">
                  Jayakarta
                </h5>
                <p className="text-gray-500 text-[15px] sm:text-center md:text-left sm:mb-4 md:mb-0">
                  Ekonomi
                </p>
              </div>
              <div className="md:flex md:justify-between text-center">
                <div className="md:mr-5">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    02:00
                  </h5>
                  <p className="text-gray-500 text-[15px]">Pasar Senen</p>
                </div>

                <div className="md:flex md:mr-5 sm:my-2 md:my-0">
                  <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                  <p className="text-gray-500 text-[15px] mt-4 mx-2">2j 0m</p>
                  <div className="h-0.5 bg-gray-300 md:w-5 sm:w-1 sm:h-5 md:h-1 md:mt-7 sm:mt-2 mx-auto" />
                </div>

                <div>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    04:00
                  </h5>
                  <p className="text-gray-500 text-[15px]">Lempuyangan</p>
                </div>
              </div>

              <div className="sm:mt-2">
                <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white md:text-right sm:text-center ">
                  Harga : Rp 2000
                </h5>
              </div>
            </div>
          </div>

          <p className="mt-3 mb-2 text-gray-700 font-bold">
            Upload Bukti Pembayaran
          </p>
          <div className="">
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="bukti_pembayaran"
                type="file"
              />
            </div>
            <div>
              <button
                className="bg-gray-900 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {}}
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
