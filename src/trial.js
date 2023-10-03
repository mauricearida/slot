import { useEffect } from "react";
import "./App.css";

function App() {
  var doors;

  let prizesProp = [
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

  let results = [
    {
      duration: 1000,
      id: 1,
    },
    {
      duration: 500,
      id: 1,
    },
    {
      duration: 1000,
      id: 3,
    },
  ];
  const items = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎",
    "😂",
    "🖕",
  ];

  let iconsArray = prizesProp.map((prize) => prize.icon);
  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    for (let d = 0; d < doors.length; d++) {
      if (firstInit) {
        d.dataset.spinned = "0";
      } else if (d.dataset.spinned === "1") {
        return;
      }

      const boxes = d.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = ["❓"];

      if (!firstInit) {
        pool.push(...shuffle(iconsArray));

        console.log("results", results);
        console.log("results[door]", results[d]);
        const desiredId = results[d].id;
        const selectedPrize = prizesProp.find(
          (prize) => prize.id === desiredId
        );

        if (selectedPrize) {
          const selectedIcon = selectedPrize.icon;
          pool[pool.length - 1] = selectedIcon;
        }
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.height = d.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        d.clientHeight * (pool.length - 1)
      }px)`;
      d.replaceChild(boxesClone, boxes);
    }
  }

  async function spin() {
    init(false, 1, 2);

    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  useEffect(() => {
    doors = document.querySelectorAll(".door");
    init();
  }, []);

  return (
    <div id="app">
      <div className="doors">
        <div className="door">
          <div className="boxes">{/* <div className="box">?</div> */}</div>
        </div>

        <div className="door">
          <div className="boxes">{/* <div className="box">?</div> */}</div>
        </div>

        <div className="door">
          <div className="boxes">{/* <div className="box">?</div> */}</div>
        </div>
      </div>

      <div className="buttons">
        <button onClick={spin}>Play</button>
        <button onClick={init}>Reset</button>
      </div>
    </div>
  );
}

export default App;
