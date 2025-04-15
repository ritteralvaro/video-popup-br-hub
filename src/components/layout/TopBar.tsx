
import { Bell, Menu, User } from "lucide-react";
import { useState } from "react";

// Componente de barra superior
export const TopBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = userData.name || "Usuário";
  const companyName = userData.company || "Empresa";

  return (
    <header className="bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3">
      <button className="md:hidden text-gray-500 focus:outline-none">
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="md:flex-1 hidden md:block">
        <h2 className="text-lg font-medium text-gray-800">{companyName}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <Bell className="h-5 w-5" />
        </button>
        
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:block">
              {userName}
            </span>
          </button>
          
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <a
                href="/perfil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Meu Perfil
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Configurações
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
