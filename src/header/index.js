import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-gray-800	 text-white p-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Ticket Train</h1>
      <div>
        <button className="bg-white text-black px-5 py-2 mx-3 rounded font-bold">
          <Link to="/login">Masuk</Link>
        </button>
        <button className="bg-white text-black px-5 py-2 rounded font-bold">
          <Link to="/register">Daftar</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
