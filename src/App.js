function App() {
  const execution = (k) => {
    console.log(k.timeStamp);
    alert(10);
  };
  return (
    <div className="App">
      <h1>table</h1>
      <input type="text" className="search" />
      <button onClick={execution}>click</button>
    </div>
  );
}

export default App;
