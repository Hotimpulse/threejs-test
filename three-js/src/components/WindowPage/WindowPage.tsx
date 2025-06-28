import Scene from "../Scene";
import style from "./style.module.scss";

export default function WindowPage() {
    return (
        <div className={style.main_container}>
            <div>
                <Scene />
            </div>
        </div>
    );
}
