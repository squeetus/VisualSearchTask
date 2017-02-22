var width = 500,
    height = 500,
    canvas_padding = 20,  // padding around the image itself
    maxElements = 100,
    shapeSize = 15,
    padding = shapeSize * 2,         // padding around each element
    shape1 = 5, // index into shapes array;
    shape2 = 3, // index into shapes array; higher y, larger number, correlated one!!!
    shapes = ["circle", "square", "triangle", "asterisk", "plus", "x"];
    lineGenerator = d3.svg.line(),
    mode = 0,// 0 is single svg, 1 is both
    pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;


console.log(pageWidth/2 - width/2 , pageHeight/2 - height/2);


if(mode == 0) {
  var svg1 = d3.select("body").append("svg")
      .style("padding", canvas_padding)
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", pageWidth/2 - width/2 - canvas_padding - 8)
      .style("margin-right", pageWidth/2 - width/2 - canvas_padding - 8)
      .style("margin-top", pageHeight/2 - height/2 - canvas_padding - 8)
      // .style("margin-right", pageWidth/2 - width/2)
      .style("border", "solid 1px black");

} else if(mode == 1) {

  var thePadding = (pageWidth - (2*width) - 24 - 16 - 80 -4) / 2 ;
  console.log(thePadding);
  var svg1 = d3.select("body").append("svg")
      .style("padding", canvas_padding)
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", thePadding)
      .style("margin-top", pageHeight/2 - height/2 - canvas_padding - 8)
      .style("border", "solid 1px black");

  var svg2 = d3.select("body").append("svg")
      .style("padding", canvas_padding)
      .attr("width", width)
      .attr("height", height)
      .style("margin-right", thePadding)
      .style("margin-top", pageHeight/2 - height - canvas_padding - 8)
      .style("border", "solid 1px black")
      .style("margin-left", 24);
}

var useThis = {
  "something": function() {
      console.log('something');
  }
};

function drawCircle(s, i, whichSVG) {
  counts[i]++;
  whichSVG.append("circle")
      // .attr("cx", s[0] - (shapeSize / 4))
      // .attr("cy", s[1] - (shapeSize / 4))
      .attr("cx", s[0])
      .attr("cy", s[1])
      .attr("r", shapeSize/2)
      .attr("shape", "shape" + i)
      .attr("class", "shape" + i)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawSquare(s, i, whichSVG) {
  counts[i]++;
  whichSVG.append("rect")
      .attr("x", s[0] - (shapeSize / 2))
      .attr("y", s[1] - (shapeSize / 2))
      .attr("height", shapeSize)
      .attr("width", shapeSize)
      .attr("class", "shape" + i)
      .attr("shape", "shape" + i)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawTriangle(s, i, whichSVG) {
  counts[i]++;
  whichSVG.append("path")
      .attr("d", d3.svg.symbol().type('triangle-up')
    					.size(shapeSize*8)
            )
      .attr('transform', "translate("+(s[0])+","+(s[1] - 1)+")")
      .attr('x', s[0])
      .attr('y', s[1]-1)
      .attr("class", "shape" + i)
      .attr("shape", "shape" + i)
      .style("fill", "white")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawPlus(s, i, whichSVG) {
  counts[i]++;
  var plusLineSize = shapeSize/2;;
  var plusLine1 = [
    [s[0]-plusLineSize, s[1]],
    [s[0]+plusLineSize, s[1]]
  ],
  plusLine2 = [
    [s[0], s[1]-plusLineSize],
    [s[0], s[1]+plusLineSize]
  ]
  var g = whichSVG.append("g")
              .attr("class", "shape" + i)
              .attr("shape", "shape" + i)
              .attr('x', s[0])
              .attr('y', s[1]);

  g.append("path")
      .attr("d", lineGenerator(plusLine1))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
  g.append("path")
      .attr("d", lineGenerator(plusLine2))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawX(s, i, whichSVG) {
  counts[i]++;
  var lineSize = shapeSize/2;

  var line1 = [
    [s[0]-lineSize*Math.cos(0.785398), s[1]+lineSize*Math.sin(0.785398)],
    [s[0]+lineSize*Math.cos(0.785398), s[1]-lineSize*Math.sin(0.785398)]
  ],
  line2 = [
    [s[0]-lineSize*Math.cos(0.785398), s[1]-lineSize*Math.sin(0.785398)],
    [s[0]+lineSize*Math.cos(0.785398), s[1]+lineSize*Math.sin(0.785398)]
  ];
  var g = whichSVG.append("g")
              .attr("class", "shape" + i)
              .attr("shape", "shape" + i)
              .attr('x', s[0])
              .attr('y', s[1]);

  g.append("path")
      .attr("d", lineGenerator(line1))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
  g.append("path")
      .attr("d", lineGenerator(line2))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawAsterisk(s, i, whichSVG) {
  counts[i]++;
  var lineSize = shapeSize/3,
      straightSize = shapeSize/2;
  var line1 = [
    [s[0]-lineSize, s[1]+lineSize],
    [s[0]+lineSize, s[1]-lineSize]
  ],
  line2 = [
    [s[0]-lineSize, s[1]-lineSize],
    [s[0]+lineSize, s[1]+lineSize]
  ],
  line3 = [
    [s[0]-straightSize, s[1]],
    [s[0]+straightSize, s[1]]
  ],
  line4 = [
    [s[0], s[1]-straightSize],
    [s[0], s[1]+straightSize]
  ]
  var g = whichSVG.append("g")
              .attr("class", "shape" + i)
              .attr("shape", "shape" + i)
              .attr('x', s[0])
              .attr('y', s[1]);

  g.append("path")
      .attr("d", lineGenerator(line1))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
  g.append("path")
      .attr("d", lineGenerator(line2))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
  g.append("path")
      .attr("d", lineGenerator(line3))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
  g.append("path")
      .attr("d", lineGenerator(line4))
      .attr("class", "shape")
      .style("stroke", "black")
      .style("stroke-width", 1);
}

function drawShape(shape, s, i, whichSVG) {
  switch(shape) {
    case 0:
      drawCircle(s, i, whichSVG);
      break;
    case 1:
      drawSquare(s, i, whichSVG);
      break;
    case 2:
      drawTriangle(s, i, whichSVG);
      break;
    case 3:
      drawAsterisk(s, i, whichSVG);
      break;
    case 4:
      drawPlus(s, i, whichSVG);
      break;
    case 5:
      drawX(s, i, whichSVG);
      break;

  }
}
