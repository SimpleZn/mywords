import React from "react";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 bottom-0 top-16 w-64 bg-gray-100 overflow-y-auto">
      <ul>
        <li>
          <a href="#">Sidebar Item 1</a>
        </li>
        <li>
          <a href="#">Sidebar Item 2</a>
        </li>
        <li>
          <a href="#">Sidebar Item 3</a>
        </li>
      </ul>
    </aside>
  );
};
