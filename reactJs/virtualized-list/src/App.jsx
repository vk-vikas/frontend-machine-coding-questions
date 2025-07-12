import "./App.css";
import VirtualizedList from "./components/VirtualizedList";

function App() {
  const itemCount = 1000;
  const itemHeight = 30; // px
  const height = 300; // visible height in px

  // This function tells VirtualList how to render a single item
  const renderItem = (content, index) => (
    <div
      style={{
        padding: "5px",
        backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#dcdcdc",
        borderBottom: "1px solid #ccc",
      }}
    >
      Item #{content}
    </div>
  );
  return (
    <>
      <VirtualizedList
        itemHeight={itemHeight}
        itemCount={itemCount}
        height={height}
        renderItem={renderItem}
      />
    </>
  );
}

export default App;
