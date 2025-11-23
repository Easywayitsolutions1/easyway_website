import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Cell {
  v: string;
  f: string;
}

interface Row {
  c: Cell[];
}

interface SheetData {
  table: {
    cols: { label: string }[];
    rows: Row[];
  };
}

const Demo = () => {
  const [columns, setColumns] = useState<string[]>([]); 
  const [rows, setRows] = useState<string[][]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [sheetId, setSheetId] = useState<string>(""); 
  const [inputId, setInputId] = useState<string>("");

  useEffect(() => {
    if (!sheetId) return;
    setColumns([]);
    setRows([]);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.1.54:3434/fetch-sheet-data/${sheetId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data. Please try again later.");
        }
        const result: SheetData = await response.json(); 

        if (result.table && result.table.cols && result.table.rows) {
          const extractedColumns = result.table.cols.map((col) =>
            col.label ? col.label : "Column"
          );
          setColumns(extractedColumns);

          const extractedRows = result.table.rows.map((row) =>
            row.c.map((cell) => (cell ? cell.f || cell.v : ""))
          );
          setRows(extractedRows);
        } else {
          setError("Invalid sheet data received.");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred.");
      }
    };

    fetchData();
  }, [sheetId]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputId) {
      setSheetId(inputId);
    } else {
      setError("Please enter a valid Sheet ID.");
    }
  };

  return (
    <div className="container mt-4 p-3 shadow bg-white rounded" style={{ maxWidth: "100%", overflowX: "auto" }}>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <input
          type="text"
          name="api"
          placeholder="Enter Sheet ID"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          className="form-control mb-2 w-50"
        />  
        <button type="submit" className="btn btn-primary">Submit</button>
     

      <div className="table-responsive">
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-bordered table-striped text-center">
          <thead className="thead-dark">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="p-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="p-2">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </form>
    </div>
  );
};

export default Demo;
