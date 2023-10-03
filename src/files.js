import { useEffect } from "react";
import "./App.css";

function App() {
  let doors;
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

  let resultsProp = [
    {
      duration: 1000,
      id: 1,
    },
    {
      duration: 500,
      id: 2,
    },
    {
      duration: 1000,
      id: 3,
    },
  ];
  // const items = [
  //   "🍭",
  //   "❌",
  //   "⛄️",
  //   "🦄",
  //   "🍌",
  //   "💩",
  //   "👻",
  //   "😻",
  //   "💵",
  //   "🤡",
  //   "🦖",
  //   "🍎",
  //   "😂",
  //   "🖕",
  // ];

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const pool = ["❓"];

      if (!firstInit) {
        const arr = [];
        for (let n = 0; prizesProp.length; n++) {
          let iconsArray = prizesProp.map((prize) => prize.icon);

          arr.push(...iconsArray);
        }
        pool.push(...shuffle(arr));

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            this.querySelectorAll(".box").forEach((box) => {
              box.style.filter = "blur(1px)";
            });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
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
