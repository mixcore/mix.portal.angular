# STATE MANAGEMENT

@ngrx/component-store: https://ngrx.io/guide/component-store
ComponentStore is a stand-alone library that helps to manage local/component state. It's an alternative to reactive push-based "Service with a Subject" approach.

Key Concepts

- Local state has to be initialized, but it can be done lazily.
- Local state is typically tied to the life-cycle of a particular component and is cleaned up when that component is destroyed.
- Users of ComponentStore can update the state through setState or updater, either imperatively or by providing an Observable.
- Users of ComponentStore can read the state through select or a top-level state$. Selectors are very performant.
- Users of ComponentStore may start side-effects with effect, both sync and async, and feed the data both imperatively or reactively.

## WHY DO WE CHOOSE THE @NGRX/COMPONENT-STORE, NOT THE @NGRX/STORE?

[@Ngrx/Store vs @Ngrx/Component-Store](https://ngrx.io/guide/component-store/comparison)

- ComponentStore that is tied to the specific node in the components tree, will be automatically cleaned up when that node is destroyed
- state is fully self-contained with each ComponentStore, and thus allows to have multiple independent instances of the same component
- provides simpler state management to small/medium sized apps

## ARCHITECTURE:

[1.initialization](https://ngrx.io/guide/component-store/initialization)

[2.Read](https://ngrx.io/guide/component-store/read)

[3.Write](https://ngrx.io/guide/component-store/write)

[4.Effect](https://ngrx.io/guide/component-store/effect)

## WHAT ARE WE GOING TO BUILD?
