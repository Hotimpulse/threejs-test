/* eslint-disable @typescript-eslint/no-unused-vars */
import style from "./style.module.scss";

function logData(data: unknown) {
    let value: string;

    if (typeof data === "string") {
        value = data;
        console.log(value);
    }
}

logData(23);

type SuperType = {
    name: string;
};

type SubType = {
    name: string;
    age: number;
};

const subType: SubType = { name: "Lev", age: 25 };
const superType: SuperType = subType;

const otherVar: SuperType = { name: "ASD" };

enum Values {
    FIRST,
    SECOND,
    // THIRD,
}

function fn(value: Values) {
    switch (value) {
        case Values.FIRST:
            return value;
        case Values.SECOND:
            return value;
        default:
            const exhaustiveCheck: never = value;
            return value;
    }
}

fn(Values.FIRST);
fn(Values.SECOND);

interface Address {
    city?: string;
    street?: number;
    coords: number[];
}

type User = {
    username: string;
    age?: number;
    address?: Address;
    id: string;
    createdAt: Date;
};

const user: User = {
    address: {
        coords: [5, 5],
    },
};

// data coming from an API

// type ApiResponse<T> = {
//     status: "success" | "error";
//     data?: T;
// };

// Literals

type Color = "red" | "green" | "blue";
type Size = 4 | 8 | 16;

const color: Color = "blue";

const values = {
    color: "green",
} as const; // read-only property

// Readonly properties

interface AdminUser {
    readonly id: string;
}

function paint(color: Color) {}

paint(values.color);

type EventName = "click" | "change";

type EventHandler = `on${EventName}`;

type Userid = `user_id_${string}`;

// Generics

interface someUser {
    username: string;
}

interface Article {
    title: string;
}

interface ApiResponse<Data, Meta> {
    status: "error" | "success";
    meta: Meta;
    requestId: string;
    data: Data;
}

interface MetaData {
    timestamp: string;
}

const responseFromUserApi: ApiResponse<someUser, MetaData> = {
    data: {
        username: "John",
    },
};

const responseFromArticleApi: ApiResponse<Article> = {
    data: {
        title: "John",
    },
};

interface Tree<T> {
    id: string;
    value: T;
    children: Tree<T>[] | null;
}

const treeNode: Tree<User> = {
    id: "10",
    value: {
        username: "123",
    },
    children: [
        {
            id: "12",
            value: {
                username: "123",
            },
            children: null,
        },
    ],
};

// Generics in functions

function genericFn<T>(arg: T) {}

const arrowGeneric = <T,>(arg: T): T => {
    return arg;
};

const data = arrowGeneric<User>({ username: "123" });

// Generic constraints

function createEntity<T extends { id: string; createdAt: Date }>(arg: T) {
    arg.
}

createEntity<User>({});

// Generics in classes

class Order<T> {
    private data: T;

    constructor(arg: T) {
        this.data = arg;
    }
}

//

enum ArticleSortField {
    VIEWS = 'views',
    TITLE = 'title',
    CREATED = 'createdAt'
}

interface SortOrder {
    desc: string;
    asc: string;
}

interface ArticleSortSelectorProps {
    className: string;
    sort: ArticleSortField;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortField) => void;
}

const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {className, onChangeOrder, onChangeSort, order, sort} = props;
    const {t} = useTranslation();

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
        {
            value: 'asc',
            content: t{'asc'},
        },
        {
            value: 'desc',
            content: t{'desc'},
        }.
    ],
    [t],
    );
})

// conditional generics

// interface ApiResponse<Data extends User ? {} : {}> {
//     status?: 'error' | "success";
//     requestId?: string;
//     data: Data;
// }

type isArray<T> = T extends any[] ? true : false;

const first: isArray<string> = false;
const second: isArray<string[]> = true;
 
export default function TypeScript() {
    return (
        <>
            <div className={style.main_container}>
                <span className={style.card}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum quod provident itaque reiciendis
                    adipisci a error nihil, rerum dolor corrupti sunt architecto maiores praesentium ratione blanditiis.
                    Nulla porro labore nihil!
                </span>
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
                <div>Special Types</div>
                <ul>
                    <li>Any</li>
                    <li>Unknown</li>
                    <li>Never</li>
                    <li>Void</li>
                </ul>

                <p>Unknown</p>
                <p>Makes us check for types on our values</p>
                <p>Never</p>
                <p>Subtype of all other types, is not a supertype; most narrow</p>
                <p>Makes us check for types on our values</p>
            </div>
        </>
    );
}
