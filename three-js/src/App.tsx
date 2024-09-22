import appStyles from "./index.module.css";
import Shapes from "./components/Shapes/Shapes";

export default function App() {
  return (
    <>
      <div className={appStyles.main}>
        <Shapes />
      </div>
    </>
  );
}
