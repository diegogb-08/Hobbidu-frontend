import React from "react";

const SideBar = (props) => {
  return (
    <div className="sideBarComponent">
      <ul className="ulSideBarContinent">
        {props.tabs.map((tab) => {
          const active = tab === props.selected ? "active" : "";

          return (
            <li className="navItem" key={tab}>
              <div
                className={"navLink " + active}
                onClick={() => props.setSelected(tab)}
              >
                <p>{tab}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {props.children}
    </div>
  );
};

export default SideBar;
