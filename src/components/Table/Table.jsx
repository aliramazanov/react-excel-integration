import { useEffect } from "react";
import PropTypes from "prop-types";
import "tabulator-tables/dist/css/tabulator.min.css";

const Table = ({ selectedFile }) => {
  useEffect(() => {
    if (selectedFile) {
      import("xlsx").then((XLSX) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            new window.Tabulator("#example-table", {
              data: jsonData,
              layout: "fitColumns",
              responsiveLayout: true,
              addRowPos: "top",
              history: true,
              pagination: "local",
              paginationSize: 10,
              paginationSizeSelector: [10, 20, 50],
              movableColumns: true,
              columns: [
                {
                  title: "ID",
                  field: "id",
                  sorter: "number",
                  headerFilter: true,
                },
                {
                  title: "Length",
                  field: "len",
                  headerFilter: true,
                },
                { title: "WKT", field: "wkt", headerFilter: true, width: 700 },
                {
                  title: "Status",
                  field: "status",
                  headerFilter: true,
                },
              ],
            });
          } catch (error) {
            console.error("Error reading Excel file:", error);
          }
        };
        reader.readAsArrayBuffer(selectedFile);
      });
    }
  }, [selectedFile]);

  return <div id="example-table"></div>;
};

Table.propTypes = {
  selectedFile: PropTypes.instanceOf(File),
};

export default Table;
