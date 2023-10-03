import useSlot from "./useSlot";
import "./slot.css";

export default ({ results, prizes }) => {
  const { spin, init } = useSlot({ results, prizes });

  return (
    <>
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
      </div>
      <div className="buttons">
        <button onClick={spin}>Play</button>
      </div>
      <button onClick={init}>reset</button>
    </>
  );
};
