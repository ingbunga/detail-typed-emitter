

type EmitterType = [
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

