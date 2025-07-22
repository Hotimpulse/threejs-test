import style from "./style.module.scss";

export default function TypeScript() {
    return (
        <>
            <div className={style.main_container}>
                <span className={style.card}>This is a TS learning space</span>
                <p>Primitives</p>
                <ul>
                    <li>string</li>
                    <li>number</li>
                    <li>bigInt</li>
                    <li>boolean</li>
                    <li>undefined</li>
                    <li>null</li>
                    <li>symbol</li>
                </ul>
            </div>

            <div>Special Types</div>
            <ul>
                <li>Any</li>
                <li>Unknown</li>
                <li>Never</li>
                <li>Void</li>
            </ul>

            <p>Any</p>
            
        </>
    );
}
