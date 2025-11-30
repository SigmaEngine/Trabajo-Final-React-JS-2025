export default function DeleteModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: 20, borderRadius: 10 }}>
        <h3>¿Eliminar producto?</h3>
        <button onClick={onConfirm} style={{ marginRight: 10 }}>Sí, eliminar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
