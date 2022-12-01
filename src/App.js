import { useEffect, useState } from "react";
import "./styles.css";
let color = "blue";
let headText = "Ashish";
const array = ["milk", "eggs", "peanut", "butter"];
const url = "https://unpkg.com/emoji.json@13.1.0/emoji.json";

export default function App() {
  const [emoji, setEmoji] = useState("");
  const [rand, setRand] = useState([]);
  const [data, setData] = useState("");

  useEffect(()=>{
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    });
   },[]) 

  useEffect(() => {
    renderEmoji()
  },[data])



  function doThis(event) {
    const input = event.target.value;

        data.map((item) => {
          if (item.char === input) {
            setEmoji(item.name);
          }
          return item.array;
        });
      };

  function clickHandler(item) {
    console.log("clicked", item);
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function renderEmoji(){
      for (let i = 0; i < 5; i++) {
        let some = getRandomInt(4590);
        setRand(prev => [...prev, data[some]?.char]);
      }
  }

  return (
    <div className="App">
      <h1 style={{ color: color }} className="main-head">
        {headText}
      </h1>
      <h2>Start editing to see some magic happen!</h2>

      <ul>
        {array.map((item, index) => {
          if (index % 2 === 0) {
            return (
              <li onClick={() => clickHandler(item)} key={item} className="bg">
                {item}
              </li>
            );
          } else
            return (
              <li onClick={() => clickHandler(item)} key={item} className="big">
                {item}
              </li>
            );
        })}
      </ul>

      <h1> Emoji Shower </h1>
      <input onChange={doThis} placeholder="type here"></input>
      <h3 className="emoji-name"> = {emoji}</h3>
      <section>
        <h2 className="stock">emoji's on the stock</h2>
        {rand.map(i => i)}
      </section>
    </div>
  );
}