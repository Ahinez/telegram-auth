const App = () => {
  window.Telegram?.WebApp?.ready();

  const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

  return (
    <ul>
      <li>{user?.first_name}</li>
      <li>{user?.last_name}</li>
      <li>{user?.username}</li>
      <li>{user?.id}</li>
      <li>{user?.language_code}</li>
      <img src={user?.photo_url} />
    </ul>
  );
};

export default App;
