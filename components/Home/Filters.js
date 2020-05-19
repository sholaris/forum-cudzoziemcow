import { Menu } from "semantic-ui-react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Filters = () => {
  const [active, setActive] = useState({ activeItem: "Najnowsze" });
  const { activeItem } = active;

  function handleItemClick(e, { name }) {
    setActive({ activeItem: name });
    // sorting_func(e);
  }

  return (
    <div className="menu-wrapper">
      <Menu compact>
        <Menu.Item
          href="/"
          id="recent"
          onClick={handleItemClick}
          name="Najnowsze"
          active={activeItem == "Najnowsze"}
        />

        <Menu.Item
          id="active"
          onClick={handleItemClick}
          active={activeItem == "Aktywne"}
          name="Aktywne"
        />
        <Link href={{ pathname: "/", query: { sort: "votes" } }} passHref>
          <Menu.Item
            id="votes"
            onClick={handleItemClick}
            active={activeItem == "Najwięcej głosów"}
            name="Najwięcej głosów"
          >
            Najwięcej głosów
          </Menu.Item>
        </Link>
        <Link href={{ pathname: "/", query: { sort: "answers" } }} passHref>
          <Menu.Item
            id="answers"
            onClick={handleItemClick}
            name="Najwięcej odpowiedzi"
          >
            Najwięcej odpowiedzi
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  );
};

export default Filters;
