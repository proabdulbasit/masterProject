import { useState, useEffect } from "react";
import ListItem from "./ListItem";

export default function List({ search }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //  fetch from /api/data endpoint
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      });
  }, [search]);

  return (
    <div role="list" className="flex flex-wrap p-5">
      {products.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
