import React, {useState, useEffect} from 'react';
import ReactLoading from "react-loading";

const Preloader = () => {

    const [data, setData] = useState([]);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
          fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              setData(json);
              setDone(true);
            });
        }, 4000);
      }, []);

    return (
        <>
        {!done ? (
          <ReactLoading
            type={"cylon"}
            color={"#247cf1"}
            height={100}
            width={100}
          />
        ) : (
          <ul>
            {data.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </>
    );
  }


const Loader = () => {
  return(
    <ReactLoading
    type={"cylon"}
    color={"#247cf1"}
    height={100}
    width={100}
  />
  )
}
export default Loader
