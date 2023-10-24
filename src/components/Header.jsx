import { useSelector } from "react-redux";

const Header = () => {
  const state = useSelector((store) => store);

  //   console.log(state);

  return (
    <header>
      <div>
        <img src="./pln-logo.png" alt="flight rota" />
        <h3>Flight Tracker</h3>
      </div>
      <p>
        {state.isLoading
          ? "Loading..."
          : !state.isError
          ? `${state.flights.length} flights found`
          : `Error Occurred !!!`}
      </p>
    </header>
  );
};

export default Header;
