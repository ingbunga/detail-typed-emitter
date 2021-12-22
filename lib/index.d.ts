

type EmitterType = [
    [string, anyArrow]
]

type anyArrow = (...args: any[]) => any
type emitterTypes = Array<[string, anyArrow]>

type Rest<L extends Array<any>> = 
    L extends [any, ...infer R] 
      ? R 
      : never

type findValue<T extends any[], val extends any> =
    T["length"] extends 0
      ? never
      : val extends T[0][0]
          ? T[0][1]
          : findValue<Rest<T>, val>

type Keys<T extends any[]> = 
    T["length"] extends 0
      ? []
      : [T[0][0], ...Keys<Rest<T>>]


type unionOf<T extends any[]> = T[number]


export class TypedEmitter<L extends emitterTypes = EmitterType, KeyUnions = unionOf<Keys<L>>> {
    static defaultMaxListeners: number;
    addListener<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    prependListener<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    prependOnceListener<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    removeListener<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    removeAllListeners(event?: KeyUnions): this;
    once<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    on<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    off<U extends KeyUnions>(event: U, listener: findValue<L, U>): this;
    // @ts-ignore
    emit<U extends KeyUnions>(event: U, ...args: Parameters<findValue<L, U>>): boolean;
    eventNames<U extends KeyUnions>(): U[];
    listenerCount(type: KeyUnions): number;
    listeners<U extends KeyUnions>(type: U): findValue<L, U>[];
    rawListeners<U extends KeyUnions>(type: U): findValue<L, U>[];
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}



type _unwrap<l> =
    l extends { __rec: never } ? never
      : l extends {__rec: {__rec: infer R}} ? {__rec: _unwrap<R>} 
      : l extends {__rec: infer R} ? R 
      : l

type unwrap<l> =
    l extends {__rec: infer R}
      ? unwrap<_unwrap<l>>
      : l
  
type _LfindValue<T extends any[], val extends any> =
    T["length"] extends 0
      ? never
      : val extends T[0][0]
          ? T[0][1]
          : {__rec: findValue<Rest<T>, val>}
  
type LfindValue<T extends any[], val extends any> =
    unwrap<_LfindValue<T, val>>

type _LKeys<T extends any[]> = 
    T["length"] extends 0
      ? []
      : {__rec: [T[0][0], ...Keys<Rest<T>>]}

type LKeys<T extends any[]> =
  unwrap<_LKeys<T>>

type a = [
  ['a', () => void],
  [`hello_${string}`, (name: string)=>void]
]

type b = unionOf<LKeys<a>>

export class LargeTypedEmitter<L extends emitterTypes = EmitterType,
        //@ts-ignore 
        KeyUnions = LKeys<L>[number]> {
    static defaultMaxListeners: number;
    addListener<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    prependListener<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    prependOnceListener<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    removeListener<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    removeAllListeners(event?: KeyUnions): this;
    once<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    on<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    off<U extends KeyUnions>(event: U, listener: LfindValue<L, U>): this;
    // @ts-ignore
    emit<U extends KeyUnions>(event: U, ...args: Parameters<LfindValue<L, U>>): boolean;
    eventNames<U extends KeyUnions>(): U[];
    listenerCount(type: KeyUnions): number;
    listeners<U extends KeyUnions>(type: U): LfindValue<L, U>[];
    rawListeners<U extends KeyUnions>(type: U): LfindValue<L, U>[];
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}