import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getReport } from "../../client/_action/report";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { saveAs } from "file-saver";

const XLSX = require("xlsx");

const Report = () => {
  const dispatch = useDispatch();
  const [report, setReport] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNama, setSearchNama] = useState("");
  const [searchNik, setSearchNik] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPages(Math.ceil(report ? report.length / 5 : 1));
  }, [report]);

  useEffect(() => {
    dispatch(getReport())
      .then(async (res) => {
        setReport(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET ALL REPORT", err);
      });
  }, [dispatch]);

  const handleSearchNama = (event) => {
    setSearchNama(event.target.value);
  };

  const handleSearchNik = (event) => {
    setSearchNik(event.target.value);
  };

  const filteredData = report.filter((item) => {
    const namaPpksMatch = item.profil_ppks_name
      .toLowerCase()
      .includes(searchNama.toLowerCase());
    const nikPpksMatch = item.profil_ppks_nik
      .toLowerCase()
      .includes(searchNik.toLowerCase());

    return namaPpksMatch && nikPpksMatch;
  });

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * 5 - 5;
    const endIndex = startIndex + 5;

    if (searchNama || searchNik) {
      return filteredData;
    } else {
      return report && report.slice(startIndex, endIndex);
    }
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  const handleExport = () => {
    // Filter data berdasarkan tanggal
    const filteredData = report.filter((item) => {
      const startDateObj = new Date(startDate);
      startDateObj.setHours(0, 0, 0, 0); // Set waktu mulai ke 00:00:00.000

      const endDateObj = new Date(endDate);
      endDateObj.setHours(23, 59, 59, 999); // Set waktu selesai ke 23:59:59.999

      const date = new Date(item.created_at);
      return date >= new Date(startDateObj) && date <= new Date(endDateObj);
    });

    // Membuat worksheet dengan data yang telah difilter
    const worksheet = XLSX.utils.json_to_sheet(filteredData);

    // Membuat workbook dan menambahkan worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Mengkonversi workbook ke bentuk binary XLSX
    const excelData = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });

    // Mengubah binary XLSX menjadi blob
    const buffer = new ArrayBuffer(excelData.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < excelData.length; i++) {
      view[i] = excelData.charCodeAt(i) & 0xff;
    }

    // Menyimpan file Excel
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "data.xlsx");
  };

  return (
    <div className="px-4 sm:px-8 lg:grid h-screen place-items-center">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">
            Semua Laporan
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Export
          </button>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-gray-300">
            <table className="min-w-full leading-normal" id="dataTable">
              <thead className="bg-blue-700 text-white text-left text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Nama PPKS</th>
                  <th className="px-5 py-3">Nik PPKS</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Tanggal Laporan</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
                <tr>
                  <th className="px-5 py-3"></th>
                  <th className="px-5 py-3">
                    <input
                      type="text"
                      value={searchNama}
                      onChange={handleSearchNama}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      placeholder="Cari Nama PPKS..."
                    />
                  </th>
                  <th className="px-5 py-3">
                    <input
                      type="text"
                      value={searchNik}
                      onChange={handleSearchNik}
                      className="w-full p-2 border border-gray-300 rounded text-black"
                      placeholder="Cari NIK PPKS..."
                    />
                  </th>
                  <th className="px-5 py-3"></th>
                  <th className="px-5 py-3"></th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {!report ? (
                  <>Loading</>
                ) : (
                  getPaginatedData().map((item, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.id}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.profil_ppks_name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.profil_ppks_nik}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white  ">
                        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          {/* <span
                            aria-hidden
                            className={`${
                              item.status === "pending"
                                ? "bg-yellow-400"
                                : item.status === "menunggu disetujui"
                                ? "bg-sky-400"
                                : "bg-emerald-400"
                            } absolute inset-0 opacity-50 rounded`}
                          ></span> */}
                          <span className="relative">PENDING</span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white">
                        detail
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-4 rounded-md">
                  <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Filter Tanggal</h2>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                  <div className="flex mb-4">
                    <div className="mr-4">
                      <label
                        htmlFor="start-date"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Tanggal Mulai
                      </label>
                      <input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-48"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="end-date"
                        className="block text-gray-700 font-semibold mb-2"
                      >
                        Tanggal Selesai
                      </label>
                      <input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-48"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleExport}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Export
                  </button>
                </div>
              </div>
            )}

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs: text-gray-900">
                Showing 1 to {getPaginatedData().length} of {report.length}{" "}
                Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 ? true : false}
                  type="submit"
                  className={`${
                    currentPage === 1 ? "bg-blue-300" : "bg-blue-700"
                  } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg`}
                >
                  Prev
                </button>
                {getPaginationGroup().map((item, index) => (
                  <button
                    key={index}
                    className={`${
                      currentPage === item
                        ? "border border-blue-700 font-bold "
                        : null
                    } rounded mx-2`}
                    onClick={changePage}
                  >
                    <span className="px-5">{item}</span>
                  </button>
                ))}
                <button
                  disabled={currentPage === pages ? true : false}
                  type="submit"
                  onClick={goToNextPage}
                  className={`${
                    currentPage === pages ? "bg-blue-300" : "bg-blue-700"
                  } text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg `}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
