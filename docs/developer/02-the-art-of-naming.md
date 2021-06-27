# THE ART OF NAMING

Naming things is hard. This guideline attempts to make it easier.

## Naming convention

> Enforce that all variables, functions, function parameters, properties and methods follow are camelCase

Style: `aaaBbbCcc`

Examples:

```ts
function getUserDetail(id: string): void {
  // Implementation
}

const shouldUpdateComponent: boolean = true;

export class Foo {
  public maxFooItems: number = 10;
  private _minFooItems: number = 1;
}
```

> Enforce that Class, enums, enum members, and types are capitalized.

Styles: `Name`, `TheName`

Examples:

```ts
namespace myNamespace {
  export function myFunction(myParameter: number) {}

  export class MyClass {
    public myField: number;

    public myMethod(): void {
      // Implementation
    }
  }

  export enum MyEnum {
    FirstMember = 1;
    SecondMember = 2;
  }

  export type MyType = MyClass | MyEnum;
}
```

> Enforce that all `export const` variables are in UPPER_CASE.

```ts
export const NUMBER_OF_DOGS: number = 5;
```

> Enforce that interface names must begin with an `I`.

Style: `IFoo`

Examples:

```ts
export interface IFoo {
  name: string;
}
```

> Enforce that private members are prefixed with an underscore.

```ts
export class Foo {
  private readonly _privateProperty: string = '';

  private _privateMethod(): void {
    // Implementation
  }
}
```

> Enforce that boolean variables are prefixed with an allowed verb and must be positive.

```ts
const isOnline: boolean = true;
const isPaidFor: boolean = true;
const hasChildren: boolean = true;

// Must be positive
const isEnabled: boolean = true;
const isActive: boolean = true;
const hasBillingAddress: boolean = true;
```

> Enforce that type parameters (generics) are prefixed with `T`, `R`, `U`, `V`, `K`

```ts
export class GenericClass<T, R, U, V> {
  public t: T | undefined;

  public r: R | undefined;

  public u: U | undefined;

  public v: V | undefined;

  public foo(): void {
    console.log(this.t, this.r, this.u, this.v);
  }
}
```

## S-I-D

A name must be _short_, _intuitive_ and _descriptive_:

- **Short**. A name must not take long to type and, therefore, to remember;
- **Intuitive**. Name must read naturally, as close to the common speach as possible;
- **Descriptive**. Name must reflect what it does/possesses in the most efficient way.

```ts
/* BAD */
const a = 5; // "a" could mean anything
const isPaginatable = postsCount > 10; // "Paginatable" sounds extremely unnatural
const shouldPaginatize = postsCount > 10; // Made up verbs are so much fun!

/* GOOD */
const postsCount: number = 5;
const hasPagination: boolean = postsCount > 10;
const shouldDisplayPagination: boolean = postsCount > 10; // alternatively
```

## Avoid contractions

Do **not** use contractions. They contribute to nothing but decreased readability of the code. Finding a short, descriptive name may be hard, but contraction is not an excuse for not doing so.

```ts
/* Bad */
const onItmClk = (): void => {};

/* GOOD */
const onItemClick = (): void => {};
```

## Avoid context duplication

A name should not duplicate the context in which it is defined. Always remove the context from a name if that doesn't decrease its readability.

```ts
class MenuItem {
  /* Method name duplicates the context (which is "MenuItem") */
  handleMenuItemClick = (event: MouseEvent) => { ... }

  /* Reads nicely as `MenuItem.handleClick()` */
  handleClick = (event: MouseEvent) => { ... }
}
```

## P/HC/LC Pattern

There is a useful pattern to follow when naming variables/properties:

```
Prefix? + High Context (HL) + Low Context? (LC)
```

Take a look at how this pattern may be applied in the table below.

| Name                   | Prefix   | High context (HC) | Low context (LC) |
| ---------------------- | -------- | ----------------- | ---------------- |
| `shouldDisplayMessage` | `should` | `Display`         | `Message`        |
| `totalQuizScore`       | `total`  | `Quiz`            | `Score`          |
| `shouldDisplayMessage` | `should` | `Display`         | `Message`        |

### Boolean

| Name | Prefix   | High context (HC) | Low context (LC) |
| ---- | -------- | ----------------- | ---------------- |
| ``   | `is`     | ``                | ``               |
| ``   | `are`    | ``                | ``               |
| ``   | `should` | ``                | ``               |
| ``   | `has`    | ``                | ``               |
| ``   | `have`   | ``                | ``               |
| ``   | `can`    | ``                | ``               |
| ``   | `did`    | ``                | ``               |
| ``   | `will`   | ``                | ``               |
| ``   | `any`    | ``                | ``               |

### Number

| Name                      | Prefix     | High context (HC) | Low context (LC) |
| ------------------------- | ---------- | ----------------- | ---------------- |
| `numberOfComponentFields` | `numberOf` | `Component`       | `Fields`         |
| ``                        | `min`      | ``                | ``               |
| ``                        | `max`      | ``                | ``               |
| ``                        | `total`    | ``                | ``               |
| ``                        | ``         | ``                | `Size`           |
| ``                        | ``         | ``                | `Length`         |
| ``                        | ``         | ``                | `Score`          |
| ``                        | ``         | ``                | `Price`          |
| ``                        | ``         | ``                | `Discount`       |
| ``                        | ``         | ``                | `Width`          |
| ``                        | ``         | ``                | `Height`         |
| `numberOfVisitedTimes`    | `numberOf` | `Visited`         | `Times`          |

> TODO: create examples by these words
> duration
> delay
> totalTime
> limit
> offset
> position
> count
> index
> existingBuildNumbers
> openPrNumbers
> downloadSizeLimit

### String

### Array

### Dictionary/Object

### Class

### Interface & Type

### Enum

## A/HC/LC Pattern

There is a useful pattern to follow when naming functions:

```
Action (A) + High Context (HL) + Low Context? (LC)
```

Take a look at how this pattern may be applied in the table below.

| Name                 | Action (A) | High context (HC) | Low context (LC) |
| -------------------- | ---------- | ----------------- | ---------------- |
| `getPost`            | `get`      | `Post`            |                  |
| `getPostData`        | `get`      | `Post`            | `Data`           |
| `handleClickOutside` | `handle`   | `Click`           | `Outside`        |

> **Note:** The order of context affects the meaning of a variable. For example, `shouldUpdateComponent` means _you_ are about to update a component, while `shouldComponentUpdate` tells you that _component_ will update on itself, and you are but controlling whether it should do that right now.
> In other words, **high context emphasizes the meaning of a variable**.

## Popular Function Actions

The verb part of your function name. The most important part responsible for describing what the function _does_.

### `get`

Accesses data immediately (i.e. shorthand getter of internal data).

```ts
function getFruitsCount(): number {
  return this.fruits.length;
}
```

> See also [compose](#compose).

### `set`

Declaratively sets a variable with value `A` to value `B`.

```ts
const fruits: number = 0;

function setFruits(nextFruits: number): void {
  fruits = nextFruits;
}

setFruits(5);
console.log(fruits); // 5
```

### `reset`

Sets a variable back to its initial value or state.

```ts
const initialFruits: number = 5;
const fruits: number = initialFruits;
setFruits(10);
console.log(fruits); // 10

function resetFruits(): void {
  fruits = initialFruits;
}

resetFruits();
console.log(fruits); // 5
```

### `fetch`

Requests for a data, which takes time (i.e. async request).

```ts
function fetchPosts(postCount): Observable<Posts> {
  return fetch('https://api.dev/posts', {...})
}
```

### `remove`

Removes something _from_ somewhere.

For example, if you have a collection of selected filters on a search page, removing one of them from the collection is `removeFilter`, **not** `deleteFilter` (and this is how you would naturally say it in English as well):

```ts
function removeFilter(filterName: string, filters: string[]): string[] {
  return filters.filter(name => name !== filterName);
}

const selectedFilters: string[] = ['price', 'availability', 'size'];
removeFilter('price', selectedFilters);
```

> See also [delete](#delete).

### `delete`

Completely erazes something from the realms of existence.

Imagine you are a content editor, and there is that notorious post you wish to get rid of. Once you clicked a shiny "Delete post" button, the CMS performed a `deletePost` action, **not** `removePost`.

```ts
function deletePost(id: number): boolean {
  return database.find({ id }).delete();
}
```

> See also [remove](#remove).

### `compose`

Creates a new data from the existing one. Mostly applicable to strings, objects, or functions.

```ts
function composePageUrl(pageName: string, pageId: number) {
  return `${pageName.toLowerCase()}-${pageId}`;
}
```

> See also [get](#get).

### `handle`

Handles an action. Often used when naming a callback method.

```ts
function handleLinkClick(): void {
  console.log('Clicked a link!');
}

link.addEventListener('click', handleLinkClick);
```
