import { useCallback, useEffect, useRef, useState } from "react";
import "../App.css";

const InfiniteScrollIntersectionObserver = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 10;
  const SKIP = LIMIT * page;
  const observerRef = useRef();
  const PREFETCH_TRIGGER = 5;

  const bringData = async () => {
    try{
      setLoading(true);

      const res = await fetch(
        `https://dummyjson.com/todos?limit=${LIMIT}&skip=${SKIP}`
      );
      const listData = await res.json();
      setList((prev) => [...prev, ...listData.todos]);
      // ensures when the data is finished i.e 0 list item from api we dont keep showing loading...
      setHasMore(listData.todos.length > 0);
    }catch(err){
      console.log(err);
    }finally{
      setLoading(false);
    }   
  };

  useEffect(() => {
    bringData();
  }, [page]);

  // React calls this fn when the element mounts or unmounts
  const lastItemRefFunc = useCallback(
    (DomNode) => {
      // the DOM node is passed if we pass fn to ref in react
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      /*The Intersection Observer API allows you to configure a callback that is called when either of these circumstances occur:

        - A target element either goes away or comes into view i.e isIntersecting changes value
        - The first time the observer is initially asked to watch a target element.*/
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prev) => prev + 1);
          }
        },
        {
          rootMargin: "400px",
          // can use either this or PREFETCH_TRIGGER to optimise
        }
      );

      if (DomNode) observerRef.current.observe(DomNode);
    },
    [loading, hasMore]
  );

  return (
    <div className="list">
      {list.map((item, index) => (
        <div
          key={item.id}
          ref={index === list.length - 1 ? lastItemRefFunc : null}
        >
          --{index}--
          {item.todo}
        </div>
      ))}
      {loading && "loading...."}
    </div>
  );
};

export default InfiniteScrollIntersectionObserver;
