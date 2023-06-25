import { useEffect, useState } from "react";
import "./App.css";

const getGreeting = async function () {
  const res = await fetch("/api/test");
  return await res.json();
};

function App() {
  const [count, setCount] = useState(0);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    getGreeting().then((res) => setGreeting(res.greeting));
  }, []);

  return (
    <>
      <p>Server response: {greeting}</p>
    </>
  );
}

export default App;
