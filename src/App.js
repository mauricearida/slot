import "./App.css";
import Slot from "./components/Slot.jsx";

function App() {
  const prizes = [
    {
      id: 1,
      icon: "🍭",
      title: "Lollipop prize",
    },
    {
      id: 2,
      icon: "❌",
      title: "Stop prize",
    },
    {
      id: 3,
      icon: "⛄️",
      title: "Snowman prize",
    },
    {
      id: 4,
      icon: "🦄",
      title: "Horse prize",
    },
    {
      id: 5,
      icon: "🍌",
      title: "Banana prize",
    },
    {
      id: 6,
      icon: "💩",
      title: "Shit prize",
    },
    {
      id: 7,
      icon: "👻",
      title: "Ghost prize",
    },
    {
      id: 8,
      icon: "😻",
      title: "Cat prize",
    },
    {
      id: 9,
      icon: "💵",
      title: "Money prize",
    },
    {
      id: 10,
      icon: "🤡",
      title: "Clown prize",
    },
    {
      id: 11,
      icon: "🦖",
      title: "Dinosaur prize",
    },
    {
      id: 12,
      icon: "🍎",
      title: "Apple prize",
    },
    {
      id: 13,
      icon: "😂",
      title: "Laughing prize",
    },
    {
      id: 14,
      icon: "🖕",
      title: "Flick prize",
    },
  ];

  const results = [
    {
      id: 1,
      duration: 1000,
    },
    {
      id: 2,
      duration: 2000,
    },
    {
      id: 2,
      duration: 3000,
    },
  ];
  return (
    <>
      <Slot results={results} prizes={prizes} />
    </>
  );
}

export default App;
