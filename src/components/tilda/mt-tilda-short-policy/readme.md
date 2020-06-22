# mt-tilda-short-policy



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                  | Default     |
| -------- | --------- | ----------- | ------------------------------------- | ----------- |
| `date`   | `date`    |             | `string`                              | `undefined` |
| `footer` | `footer`  |             | `string`                              | `undefined` |
| `header` | --        |             | `{ title: string; company: string; }` | `undefined` |
| `intro`  | `intro`   |             | `string`                              | `undefined` |
| `items`  | --        |             | `MtTildaShortPolicyItem[]`            | `[]`        |


## Methods

### `addItem(item: MtTildaShortPolicyItem) => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [mt-blog](../../mt-blog)
- [mt-blog-block](../../mt-blog/mt-blog-block)
- [mt-blog-title](../../mt-blog/helpers)
- [mt-tilda-accordeon](../tilda-accordeon)
- [mt-tilda-accordeon-item](../tilda-accordeon/tilda-accordeon-item)
- [mt-tilda-accordeon-header](../tilda-accordeon/tilda-accordeon-header)
- [mt-tilda-accordeon-content](../tilda-accordeon/tilda-accordeon-content)
- [mt-compact-list](../../list/compact-list)
- [mt-list-item](../../list/compact-list/list-item)

### Graph
```mermaid
graph TD;
  mt-tilda-short-policy --> mt-blog
  mt-tilda-short-policy --> mt-blog-block
  mt-tilda-short-policy --> mt-blog-title
  mt-tilda-short-policy --> mt-tilda-accordeon
  mt-tilda-short-policy --> mt-tilda-accordeon-item
  mt-tilda-short-policy --> mt-tilda-accordeon-header
  mt-tilda-short-policy --> mt-tilda-accordeon-content
  mt-tilda-short-policy --> mt-compact-list
  mt-tilda-short-policy --> mt-list-item
  mt-tilda-accordeon-item --> mt-tilda-accordeon-header
  mt-tilda-accordeon-item --> mt-tilda-accordeon-content
  mt-compact-list --> mt-list-item
  style mt-tilda-short-policy fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
