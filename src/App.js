import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import Home from "./Pages/Home";
import Todo from "./Pages/Todo";
import TodoProvider from "./context/TodoProvider";

function App() {
  return (
    <TodoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </TodoProvider>
  );
}

export default App;
