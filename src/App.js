import { useEffect, useState } from "react";
import "./styles.css";
let headText = "Emoji Shower";
let descriptionText = "Are you also tired of not able to find the right emoji? ";
let descriptionText2 = "Use our api to get the name of the emoji and use it effeciently from next time."
// const array = ["milk", "eggs", "peanut", "butter"]; //list items
const url = "https://unpkg.com/emoji.json@13.1.0/emoji.json";

export default function App() {
  const [emojiName, setEmojiName] = useState("");
  const [emoji,setEmoji] = useState("type");
  const [rand, setRand] = useState([]);
  const [data, setData] = useState("");

  useEffect(()=>{
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setData(json);
    })
  },[]) 
  
  useEffect(() => {
    function renderEmoji(){
      let d = []
        for (let i = 0; i < 5; i++) {
          let some = getRandomInt(4590);
          d = [...d, data[some]?.char ]
        }
        setRand(d);
    }
    renderEmoji();
},[data])


  function doThis(event) {
  const input = event.target.value;
    data.forEach((item) => {
      if (item.char === input) {
        setEmojiName(item.name);
      }
    });
  };

  // Function to act while clicking on the item  in the list.
  // function clickHandler(item) { 
  //   console.log("clicked", item);
  // }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function emojisClicked(i){
    setEmoji(i);
    data.forEach((item) => {
      if (item.char === i) {
        setEmojiName(item.name);
      }
    });
  }

  
  return (
    <div className="App">
      <h1 className="main-head">
        {headText}
      </h1>
      {/* <h2>This is a list for practice </h2>

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
      </ul> */}

      <h4 className="description">{descriptionText}<br/>{descriptionText2}</h4>
      <input onChange={doThis} placeholder={emoji} id="emojiInput"></input>
      <h3 className="emoji-name"> = {emojiName}</h3>
      <section>
        <h2 className="stock">Emojies on the stock</h2>

        <div className="emojis">
        {rand.map(i => [
          // if I am adding the curly brackets instead of square here, code doesn't work. Why's that?
          <span onClick={()=> emojisClicked(i)} id="eachEmoji" key={i}>{i}</span>
        ])}
        </div>
      </section>
    </div>
  );
}