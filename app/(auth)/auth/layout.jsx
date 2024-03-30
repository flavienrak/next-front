export default function AuthLayout({ children }) {
  return (
    <div className="container relative bg-[url('/bg-depht.jpg')] bg-no-repeat bg-left bg-cover min-h-[100vh]">
      {children}
    </div>
  );
}
