import { Home } from '../modules/Home'

export default Home

interface WithIndex<A, B> {
    index(a: A): B;
}


interface WithGet<A, B> {
    get(a: A): B;
}

interface A extends WithIndex<number, string>, WithGet<[], {}> { }



function builder<B extends (keyof A)[]>(url: string, a: B): Pick<A, B[number]> {
    return a as any;
}

const b = builder("a", ["index", "get"])