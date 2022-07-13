import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full bg-gray-800	text-white p-5 md:flex md:justify-between items-center mx-auto">
      <h1 className="text-2xl font-bold sm:mb-2 md:mb-0">Ticket Train</h1>
      <div className="font-bold">
        <Link to="/" className="mr-5">
          Home
        </Link>
        <Link to="/order" className="mr-5">
          Order
        </Link>
        <Link to="/login" className="mr-5">
          Masuk
        </Link>
        <Link to="/register">Daftar</Link>
      </div>
    </div>
  );
};

export default Header;
