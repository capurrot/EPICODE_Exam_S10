import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchComponent = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="pt-3">
      <Form className="containersearch d-flex mx-auto p-2 rounded-pill border border-2 border-light">
        <InputGroup className="align-items-center justify-content-between px-2">
          <input
            type="text"
            placeholder="Inserisci la località da cercare"
            className="searchlocation"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btnsearch">
            <FaSearch />
          </button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default SearchComponent;
