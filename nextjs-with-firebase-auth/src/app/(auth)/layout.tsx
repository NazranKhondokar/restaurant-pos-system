export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100 relative flex flex-col">
      {/* auth content  */}
      <main className="flex-1 flex flex-col justify-center items-center px-5 md:px-10 lg:px-20">
        {children}
      </main>
    </div>
  );
}
