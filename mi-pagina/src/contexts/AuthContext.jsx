import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // 👈 Nuevo: guardamos el usuario actual

  // Cargar sesión desde localStorage al iniciar
  useEffect(() => {
    const savedAuth = localStorage.getItem("auth");
    const savedUser = localStorage.getItem("user");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));  // 👈 restauramos usuario
    }
  }, []);

  const login = ({ username, password }) => {
    // login SIMULADO
    if (username === "admin" && password === "1234") {
      setIsAuthenticated(true);
      const userData = { username };

      setUser(userData);

      // Guardamos en localStorage
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    }

    return { success: false, message: "Credenciales incorrectas" };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

