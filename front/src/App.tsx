import { useEffect } from "react";

const App = () => {
  window.Telegram?.WebApp?.ready();

  const initData = window.Telegram?.WebApp?.initData;

  useEffect(() => {
    const fetchData = async () => {
      if (!initData) return;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/init-data`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: initData,
            },
            body: JSON.stringify({ initData }),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success:", data);
        // Обработка данных
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [initData]);
};

export default App;
