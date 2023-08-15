import { ComponentPropsWithoutRef, ElementType } from "react";

type Merge<E extends object, O extends object> = O & Omit<E, keyof O>;

type As<T extends ElementType> = { as?: T };
type Derived<T extends ElementType, P extends object> = Merge<ComponentPropsWithoutRef<T>, P>;

export type Polymorphic<T extends ElementType, P = object> = Derived<T, P & As<T>>;
