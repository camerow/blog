---
title: Victory.js
date: 2016-06-17
preview: Victory.js and how to do custom components
collection: posts
---
## [Victory.js] (https://github.com/FormidableLabs/victory)

### Custom labels

You can create labels to your liking with custom label components:


```js
<VictoryStack colorScale="warm" style={{parent: parentStyle}}>
  <VictoryBar
    labelComponent={<CustomLabel offset={25}/>}
    data={[{x: "a", y: 2, label: "WOW"}, {x: "b", y: 3, label: "COOL"}]}
  />
  <VictoryBar
    data={[{x: "c", y: 2}, {x: "d", y: 3}]}
  />
</VictoryStack>
```

```js
class CustomLabel extends React.Component {
  static propTypes = {
    ...VictoryLabel.propTypes,
    offset: React.PropTypes.number
  };

  renderLabel() {
    const {offset, x} = this.props;
    return <VictoryLabel {...this.props} x={x + offset}/>
  }

  render() {
    return this.renderLabel();
  }
}
```

If your labels overlap, you can angle them:

```
style={{labels: {angle: 45...}}}
```
```
<VictoryLine
  data={this.state.data}
  x={(d) => new Date(d.x)}
/>
```
