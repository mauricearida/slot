import { useEffect, useState } from "react";

export default ({ results, prizes }) => {
  var doors;
  const [isSpinning, setIsSpinning] = useState(false);

  const iconsArray = prizes.map((prize) => prize.icon);

  function cloneAndRepeatArray(arr, factor) {
    const repeatedArray = [];
    const length = arr.length;
    const repeatCount = Math.floor(factor);
    const fraction = factor - repeatCount;

    for (let i = 0; i < repeatCount; i++) {
      repeatedArray.push(...arr);
    }

    if (fraction > 0) {
      const fractionCount = Math.floor(length * fraction);
      repeatedArray.unshift(...arr.slice(0, fractionCount));
    }

    return repeatedArray;
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  function init(firstInit = true, duration = 1) {
    let d = 0;
    for (const door of doors) {
      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const pool = ["❓"];
      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);
      const firstDuration = results[0].duration;
      const secondDurationProportion = results[1].duration / firstDuration;
      const thirdDurationProportion = results[2].duration / firstDuration;

      if (!firstInit) {
        let madeUpPoolArray = [];

        if (d === 0) {
          madeUpPoolArray = iconsArray;
        } else if (d === 1) {
          madeUpPoolArray = cloneAndRepeatArray(
            iconsArray,
            secondDurationProportion
          );
        } else if (d === 2) {
          madeUpPoolArray = cloneAndRepeatArray(
            iconsArray,
            thirdDurationProportion
          );
        }
        pool.push(...shuffle(madeUpPoolArray));
        if (d === doors.length) {
          d = 0;
        }
        const desiredId = results[d].id;
        const selectedPrize = prizes.find((prize) => prize.id === desiredId);

        if (selectedPrize) {
          const selectedIcon = selectedPrize.icon;
          pool[pool.length - 1] = selectedIcon;
        }
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.height = door.clientHeight + "px";
        box.textContent = pool[i];
        boxesClone.appendChild(box);
      }

      if (d === 0) {
        duration = results[0].duration / 1000;
      } else if (d === 1) {
        duration = results[1].duration / 1000;
      } else if (d === 2) {
        duration = results[2].duration / 1000;
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
      d++;
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

  return { spin, init };
};
