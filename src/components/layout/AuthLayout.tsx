
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

// Layout para páginas que requerem autenticação
export const AuthLayout = ({ children }: AuthLayoutProps) => {
  // Verificação simplificada de autenticação (será substituída pela implementação real)
  const isAuthenticated = localStorage.getItem("user") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
