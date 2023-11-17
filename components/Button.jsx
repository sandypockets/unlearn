export default function Button({ children, type = 'button', onClick }) {
  return (
    <button className="px-3 py-2 rounded-lg bg-blue-500" type={type} onClick={onClick}>
      {children}
    </button>
  );
}
