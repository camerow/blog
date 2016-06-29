---
title: Intro to Victory.js
date: 2016-06-17
preview: Victory.js and how to do custom components
collection: posts
---
### What is Victory JS?
[Victory JS](https://github.com/FormidableLabs/victory) is a graphing library build on D3.js by [Formidable Labs](http://formidable.com/). It aims to be clean and composable, and I think it does an amazing job of giving sensible defaults and an intuitive API.

### Composable Components
Victory really embraces the composability of react components, and allows you to intuitively nest components in a way that, for me at least, just makes sense. If you want to throw in a bunch of labels, axis, and graph types, go for it! Here I've made a chart with a simple line graph of dates and values. I can give the `<VictoryAxis />` component a bunch of tickValues or I can use the data it's given and use a callback for each data point. In one of the apps I've been building, I use this as an opportunity to format my dates using Moment.js.

```js
const data = [
  { x: 1, y: new Date("01-01-2016") },
  { x: 2, y: new Date("02-01-2016") },
  { x: 3, y: new Date("03-01-2016") },
  { x: 4, y: new Date("04-01-2016") }  
];

<VictoryChart              
  height={200}
  width={650}>
  <VictoryAxis
    tickValues={ (x) => x.getDate() }
  />
  <VictoryAxis
    dependentAxis
    label={"Values"}
  />
  <VictoryLine
    data={data}
  />
</VictoryChart>
```

What's cool here is that you can add more `<VictoryAxis />`, `<VictoryLine />` components for more freedom to structure. You can move your axes to change the shape of your graph (eg. L-Shaped vs T-shaped) using the `offsetY` and `offsetX` props:

```js
...
  <VictoryAxis offsetY={200} />
...
```

#### Creating Custom Victory Labels

You can create custom label components and pass them in as props to your other victory components. They will be passed some props by the parent component, and you can also pass ownProps as well.

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

I opted to nest my `<VictoryLabel />` components in an `<svg>` block and position them within the graph relative to an anchor-point. This way was a bit easier for me to reason about, especially as my labels were quite static in nature. Here's a quick example.

```js
<svg>
  <VictoryLabel
    x={30}
    y={190}
    verticalAnchor="end"
  >
    {"My Label"}
  </VictoryLabel>
</svg>
```


I will try to write more about Victory as I find gotchas, nuances and useful features.

Check it out [here](https://github.com/FormidableLabs/victory).
