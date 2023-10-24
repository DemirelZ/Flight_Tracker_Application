import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ openModal }) => {
  const state = useSelector((store) => store);

  const [itemOffset, setItemOffset] = useState(10);

  // sayfa başına eleman sayısı
  const itemsPerPage = 10;

  // gösterilecek son elemanı tespi eder
  const endOffset = itemOffset + itemsPerPage;
  // gösterlieck elemanları diziden alıyor
  const currentItems = state?.flights.slice(itemOffset, endOffset);
  // toplam kaç sayfa hesaplar
  const pageCount = Math.ceil(state?.flights.length / itemsPerPage);

  // sayfa değiştiğinde çalışır
  const handlePageClick = (event) => {
    // gösterileck yeni elemaları hesaplar
    const newOffset = (event.selected * itemsPerPage) % state?.flights.length;
    //  state'i günceller
    setItemOffset(newOffset);
  };

  return (
    <div className="p-4">
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
        <tbody>
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
        </tbody>
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
