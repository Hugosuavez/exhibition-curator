const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <main className="modal-overlay" onClick={onClose}>
      <section className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </section>
    </main>
  );
};

export default Modal;
