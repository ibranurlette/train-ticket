import { Link } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");

  const RouteAlreadyLogin = () => (
    <>
      <Link to="/" className="mr-5">
        Home
      </Link>
      <Link to="/create-ticket" className="mr-5">
        Buat Tiket
      </Link>
      <Link to="/transaction" className="mr-5">
        Transaksi
      </Link>
      <Link to="/order" className="mr-5">
        Order
      </Link>
    </>
  );

  const AllRoute = () => (
    <>
      <RouteAlreadyLogin />
      <Link to="/login" className="mr-5">
        Masuk
      </Link>
      <Link to="/register">Daftar</Link>
    </>
  );

  return (
    <div className="w-full bg-gray-800	text-white p-5 md:flex md:justify-between items-center mx-auto">
      <h1 className="text-2xl font-bold sm:mb-2 md:mb-0">Ticket Train</h1>
      <div className="font-bold">
        {token ? <RouteAlreadyLogin /> : <AllRoute />}
      </div>
    </div>
  );
};

export default Header;
