import { useEffect, useState } from "react";
import { authenticateWithTelegram } from "./api/sendTelegramInitData";
import type { User } from "./types";

const App = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = async () => {
      try {
        const result = await authenticateWithTelegram();
        setUser(result.user);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    auth();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <p className="error">Ошибка: {error}</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="container">
        <h1>Добро пожаловать!</h1>
        <p className="username">@{user.username || user.first_name}</p>
        {user.first_name && <p>Имя: {user.first_name}</p>}
        {user.last_name && <p>Фамилия: {user.last_name}</p>}
        {user.photo_url && <img src={user.photo_url} />}
      </div>
    );
  }

  return (
    <div className="container">
      <p>Не удалось получить данные пользователя</p>
    </div>
  );
};

export default App;
