import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ openModal }) => {
  const state = useSelector((store) => store);

  // console.log(state.flights);

  const [itemOffset, setItemOffset] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const itemsPerPage = 10;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = state?.flights.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(state?.flights.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % state?.flights.length;

    setItemOffset(newOffset);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target[0].value);

    const newFilteredFlights = state?.flights.filter(
      (fly) => fly.code === searchTerm
    );
    setFilteredFlights(newFilteredFlights);

    // console.log("state?.flights.", state?.flights);

    // console.log("searchTerm", searchTerm);

    // console.log("newFilteredFlights", newFilteredFlights);

    if (newFilteredFlights.length > 0) {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }

    setItemOffset(0);
  };

  return (
    <div className="p-4">
      <div className="w-25 mt-4 mx-auto ">
        <form onSubmit={handleSearch} className="d-flex">
          <input
            className="form-control mr-2 bg-dark text-white "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success" type="submit">
            Search
          </button>
        </form>
      </div>

      <table className="table table-dark table-hover mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Tail Code</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
        </thead>

        {isSearch ? (
          <tbody>
            {filteredFlights.map((i) => (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.code}</td>
                <td>{i.lat}</td>
                <td>{i.lng}</td>
                <td>
                  <button onClick={() => openModal(i.id)}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {currentItems.map((fly) => (
              <tr key={fly.id}>
                <td>{fly.id}</td>
                <td>{fly.code}</td>
                <td>{fly.lat}</td>
                <td>{fly.lng}</td>
                <td>
                  <button onClick={() => openModal(fly.id)}>Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        {/* <tbody>
          {currentItems.map((fly) => (
            <tr>
              <td>{fly.id}</td>
              <td>{fly.code}</td>
              <td>{fly.lat}</td>
              <td>{fly.lng}</td>
              <td>
                <button onClick={() => openModal(fly.id)}>Detail</button>
              </td>
            </tr>
          ))}
        </tbody> */}
      </table>

      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageClick}
        className="pagination"
        nextLabel="Forward >"
        previousLabel="< Backward"
        activeClassName="active"
      />
    </div>
  );
};

export default ListView;
