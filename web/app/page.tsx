"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [tp, setTp] = useState(0);
  const [taps, setTaps] = useState(0);
  const username = "demo_user"; // later: replace with Telegram username

  // Fetch user stats on load
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(users => {
        const user = users.find((u: any) => u.username === username);
        if (user) {
          setTp(user.tp);
          setTaps(user.taps);
        }
      });
  }, []);

  const handleTap = async () => {
    setTp(tp + 1);
    setTaps(taps + 1);

    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      setTp(data.tp);
      setTaps(data.taps);
    } catch (err) {
      console.error("API error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full pb-20">
      <h1 className="text-xl font-bold mb-4">@{username}</h1>
      <p className="text-lg">Teuron Points: {tp}</p>
      <p className="text-sm text-gray-600">Total taps: {taps}</p>

      <button
        onClick={handleTap}
        className="mt-6 w-40 h-40 rounded-full bg-yellow-400 flex items-center justify-center text-white text-lg font-bold shadow-lg active:scale-95 transition"
      >
        🪙 Tap
      </button>

      <p className="mt-4 text-gray-500 text-sm">Tap the coin to earn TP!</p>
    </div>
  );
}
