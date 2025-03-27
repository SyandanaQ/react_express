import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch data dari backend
  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  // Tambah data
  const addItem = async () => {
    const res = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
    setName("");
    setPrice("");
  };

  // Hapus data
  const deleteItem = async (id) => {
    await fetch(`http://localhost:5000/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item.id !== id));
  };

  // Set data untuk diedit
  const startEditing = (item) => {
    setEditingId(item.id);
    setName(item.name);
    setPrice(item.price);
  };

  // Update data
  const updateItem = async () => {
    const res = await fetch(`http://localhost:5000/items/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: parseFloat(price) }),
    });
    const updatedItem = await res.json();
    setItems(items.map((item) => (item.id === editingId ? updatedItem : item)));
    setEditingId(null);
    setName("");
    setPrice("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>CRUD React + Express</h2>
      <input
        type="text"
        placeholder="Nama Produk"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {editingId ? (
        <button onClick={updateItem}>Update</button>
      ) : (
        <button onClick={addItem}>Tambah</button>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - Rp{item.price}{" "}
            <button onClick={() => startEditing(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
