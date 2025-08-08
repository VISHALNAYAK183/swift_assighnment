interface NavbarProps {
  userName: string;
  userEmail: string;
}

export default function Navbar({ userName, userEmail }: NavbarProps) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-lg font-bold">SWIFT</div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-semibold">{userName}</p>
          <p className="text-sm text-gray-300">{userEmail}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          {userName.charAt(0)}
        </div>
      </div>
    </nav>
  );
}
