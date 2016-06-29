---
title: Styling Victory.js Axis Components
date: 2016-06-28
preview: Styling and building custom Victory Axis Components
collection: posts
---
### All Axis
I had a bit of trouble creating nice, clean `<VictoryAxis />` components at first. Victory is really good about sensible defaults, but they won't always cut it. For some of the data I was getting from my API, my values were only relevant if they were whole numbers. Luckily the makers of Victory.js have you covered in that situation, and many others. `style` props can use their own callbacks to custom style labels, stroke, ticks, grid and more. Here is how to style a `<VictoryAxis />`'s grid and ticks values.

#### Mini VictoryAxis Cheatsheet
1. Styling ticks and grid lines using callbacks.

```js
// The ticks and grid only render if the value is a whole number.
<VictoryAxis
  dependentAxis
  tickFormat={ y => {
    if (y % 1) {
      return "";
    }
    return y;
  }}
  style={{
    grid: {
      stroke: tick => tick % 1 == 0 ? "#ccc" : "none",
      width: 1
    },
    ticks: {
      stroke: tick => tick % 1 == 0 ? "#ccc" : "none",
      strokeWidth: "1px"
    }
  }} />
```

2. Hide the vertical line of an axis

```js
<VictoryAxis
  style={{
    axis: {
      stroke: "none"
    }
  }}
/>

```

3. Angle overlapping tick labels

```js
<VictoryAxis
  style={{
    tickLabels: {
      angle: 45
    }
  }}
/>
```
