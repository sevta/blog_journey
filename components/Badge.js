export default function Badge({ children }) {
  return (
    <div className="fixed top-0 left-0 w-full p-2 text-sm font-bold bg-yellow-400 z-50">
      {children}
    </div>
  );
}
