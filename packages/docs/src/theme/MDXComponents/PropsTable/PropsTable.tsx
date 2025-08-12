import React from "react";
import "./PropsTable.css";

type PropTableItem = {
  prop: string;
  type: string;
  default: string;
  description: string;
};

type Props = {
  items: PropTableItem[];
};

const PropsTable = ({ items }: Props) => {
  return (
    <table className="PropsTable ">
      <thead>
        <tr>
          <td>Property</td>
          <td>Type</td>
          <td>Default</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.prop}>
            <td>
              <strong>{item.prop}</strong>
            </td>
            <td>
              <code>{item.type}</code>
            </td>
            <td>
              <code>{item.default}</code>
            </td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropsTable;
