import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getUsers } from "../../client/_action/user-app";

const UserApp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPages(Math.ceil(user ? user.length / 5 : 1));
  }, [user]);

  useEffect(() => {
    dispatch(getUsers())
      .then(async (res) => {
        setUser(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET ALL USER", err);
      });
  }, [dispatch]);

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

    return user && user.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 3) * 3;
    return new Array(pages).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div className="px-4 sm:px-8 lg:grid h-screen place-items-center">
      <div className="py-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold leading-tight">
            Semua User App
          </h2>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden border border-gray-300">
            <table className="min-w-full leading-normal" id="dataTable">
              <thead className="bg-blue-700 text-white text-left text-sm font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Username</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {!user ? (
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
                          {item.username}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-300 bg-white ">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {item.email}
                        </p>
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

            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs: text-gray-900">
                Showing 1 to {getPaginatedData().length} of {user.length}{" "}
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

export default UserApp;
