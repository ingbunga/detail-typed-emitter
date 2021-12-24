

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


export type ListenerSignature<L> = {
    [E in keyof L]: (...args: any[]) => any;
};

export type DefaultListener = {
    [k: string]: (...args: any[]) => any;
};

export class DumbTypedEmitter<L extends ListenerSignature<L> = DefaultListener> {
    static defaultMaxListeners: number;
    addListener<U extends keyof L>(event: U, listener: L[U]): this;
    prependListener<U extends keyof L>(event: U, listener: L[U]): this;
    prependOnceListener<U extends keyof L>(event: U, listener: L[U]): this;
    removeListener<U extends keyof L>(event: U, listener: L[U]): this;
    removeAllListeners(event?: keyof L): this;
    once<U extends keyof L>(event: U, listener: L[U]): this;
    on<U extends keyof L>(event: U, listener: L[U]): this;
    off<U extends keyof L>(event: U, listener: L[U]): this;
    emit<U extends keyof L>(event: U, ...args: Parameters<L[U]>): boolean;
    eventNames<U extends keyof L>(): U[];
    listenerCount(type: keyof L): number;
    listeners<U extends keyof L>(type: U): L[U][];
    rawListeners<U extends keyof L>(type: U): L[U][];
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
}