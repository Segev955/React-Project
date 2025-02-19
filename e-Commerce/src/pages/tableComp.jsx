import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

function TableComp({ headers, data, renderRow }) {
  return (
    <Container>
      <Table striped bordered hover size="sm" responsive className="w-auto text-center">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item, index) => renderRow(item, index)) : (
            <tr>
              <td colSpan={headers.length}>No Data Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComp;
