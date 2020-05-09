# mt-tilda-accordeon-item



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type     | Default     |
| --------- | --------- | ----------- | -------- | ----------- |
| `content` | `content` |             | `string` | `undefined` |
| `header`  | `header`  |             | `string` | `undefined` |


## Dependencies

### Used by

 - [mt-tilda-short-policy](../../mt-tilda-short-policy)
 - [mt-tilda-term](../../mt-tilda-term)

### Depends on

- [mt-tilda-accordeon-header](../tilda-accordeon-header)
- [mt-tilda-accordeon-content](../tilda-accordeon-content)

### Graph
```mermaid
graph TD;
  mt-tilda-accordeon-item --> mt-tilda-accordeon-header
  mt-tilda-accordeon-item --> mt-tilda-accordeon-content
  mt-tilda-short-policy --> mt-tilda-accordeon-item
  mt-tilda-term --> mt-tilda-accordeon-item
  style mt-tilda-accordeon-item fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
