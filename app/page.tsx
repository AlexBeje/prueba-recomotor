"use client";
export default function Home() {
  const callAPI = async () => {
    try {
      const res = await fetch(`https://recomotor-back.alexbeje.dev/cars`);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main>
      <button onClick={callAPI}>Make API Call</button>
    </main>
  );
}
