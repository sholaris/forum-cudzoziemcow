import { Menu } from "semantic-ui-react";
import { useState } from "react";
import Link from "next/link";

const Filters = ({ method }) => {
  const [active, setActive] = useState({ activeItem: method });
  const { activeItem } = active;

  function handleItemClick(e, { name }) {
    setActive({ activeItem: name });
  }

  return (
    <div className="menu-wrapper">
      <Menu compact>
        <Menu.Item
          href="/"
          id="recent"
          onClick={handleItemClick}
          name="Najnowsze"
          active={activeItem == "date"}
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
            active={activeItem == "stats.votes"}
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
            active={activeItem == "stats.answers"}
          >
            Najwięcej odpowiedzi
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  );
};

export default Filters;
