
import { Link, useLocation } from "react-router-dom";
import { 
  Home, Video, Settings, LogOut, 
  BarChartBig, Code
} from "lucide-react";

// Componente de Sidebar para navegação
export const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Vídeos", path: "/videos", icon: Video },
    { name: "Análises", path: "/analytics", icon: BarChartBig },
    { name: "Código", path: "/embed", icon: Code },
    { name: "Configurações", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-600">VideoPop</h1>
        <p className="text-sm text-gray-500">Gerenciador de popup de vídeos</p>
      </div>
      
      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </button>
      </div>
    </aside>
  );
};
