import { ComponentPropsWithRef, ComponentPropsWithoutRef, ElementType } from "react";

type As<T extends ElementType> = { as?: T };

type Derived<T extends ElementType> = ComponentPropsWithoutRef<T>;
type DerivedRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

export type Polymorphic<T extends ElementType, Props = object> = As<T> & Props & Omit<Derived<T>, keyof Props | keyof As<T>>;
export type PolymorphicWithRef<T extends ElementType, Props = object> = As<T> & Props & DerivedRef<T> & Omit<Derived<T>, keyof Props | keyof As<T> | keyof DerivedRef<T>>;
