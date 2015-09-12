// var svg = document.getElementById("stage");

// Set up dimensions of window
(function() {
  width = window.innerWidth;
  height = window.innerHeight;
  function dimensions() {
      return [width, height];
  }
  window.dimensions = dimensions;
})();

var center = function() {
  return[dimensions()[0]/2, dimensions()[1]/2]
}

// attributes for the various stimuli
var stimulusDimensions = {
  "shapeSize": 19.79,     // stimulus width/height in pixels
  "flankerSize": 25.728,   // flanker width/height in pixels
  "flankerPos": [center()[0] - 119.547, center()[0] + 119.547]
};

// end points for the non-svg shapes
var shapeData = {
  "triangle": [
                {"x": 9.895, "y": 0},
                {"x": 19.79, "y": 19.79},
                {"x": 0, "y": 19.79},
                {"x": 9.895, "y": 0},
                {"x": 19.79, "y": 19.79}
              ],
  "asterisk": [
                {"x": 9.895, "y": 0}, {"x": 9.895, "y": 9.895},
                {"x": 16.8946, "y": 2.9}, {"x": 9.895, "y": 9.895},
                {"x": 19.79, "y": 9.895}, {"x": 9.895, "y": 9.895},
                {"x": 16.8946, "y": 16.89}, {"x": 9.895, "y": 9.895},
                {"x": 9.895, "y": 19.79}, {"x": 9.895, "y": 9.895},
                {"x": 2.9, "y": 16.89}, {"x": 9.895, "y": 9.895},
                {"x": 0, "y": 9.895}, {"x": 9.895, "y": 9.895},
                {"x": 2.9, "y": 2.9}, {"x": 9.895, "y": 9.895}
              ],
  "x": [
          {"x": 16.8946, "y": 2.9}, {"x": 9.895, "y": 9.895},
          {"x": 16.8946, "y": 16.89}, {"x": 9.895, "y": 9.895},
          {"x": 2.9, "y": 16.89}, {"x": 9.895, "y": 9.895},
          {"x": 2.9, "y": 2.9}, {"x": 9.895, "y": 9.895}
        ],
  "+": [
          {"x": 9.895, "y": 0}, {"x": 9.895, "y": 9.895},
          {"x": 19.79, "y": 9.895}, {"x": 9.895, "y": 9.895},
          {"x": 9.895, "y": 19.79}, {"x": 9.895, "y": 9.895},
          {"x": 0, "y": 9.895}, {"x": 9.895, "y": 9.895}
        ],
  "hexagon":  [
                {"x": 9.895, "y": 0},
                {"x": 1, "y": 4.95 },
                {"x": 1, "y": 19.79 - 4.95 },
                {"x": 9.895, "y": 19.79},
                {"x": 18.79 , "y": 19.79 - 4.95 },
                {"x": 18.79, "y": 4.95 },
                {"x": 9.895, "y": 0},
                {"x": 1, "y": 4.95 }
              ],
  "octagon":  [
                {"x": 19.79 - 5.796, "y": 0},
                {"x": 5.796, "y": 0},
                {"x": 0, "y": 5.796 },
                {"x": 0, "y": 19.79 - 5.796 },
                {"x": 5.796, "y": 19.79},
                {"x": 19.79 - 5.796 , "y": 19.79 },
                {"x": 19.79, "y": 19.79 - 5.796 },
                {"x": 19.79, "y": 5.796},
                {"x": 19.79 - 5.796, "y": 0},
                {"x": 5.796, "y": 0}
              ],
  "diamond":  [
                {"x": 19.79 / 2, "y": 0},
                {"x": 19.79 /5 , "y": 19.79/2},
                {"x": 19.79 / 2, "y": 19.79},
                {"x": 19.79 - 19.79 /5 , "y": 19.79/2},
                {"x": 19.79 / 2, "y": 0},
                {"x": 19.79 /5 , "y": 19.79/2}
              ],
  "tristar": [
                {"x": 9.895, "y": 0},{"x": 9.895, "y": 9.895},
                {"x": 17.79, "y": 17.79},{"x": 9.895, "y": 9.895},
                {"x": 2, "y": 17.79},{"x": 9.895, "y": 9.895},
                {"x": 9.895, "y": 0},{"x": 9.895, "y": 9.895},
                {"x": 17.79, "y": 17.79},{"x": 9.895, "y": 9.895}
              ],
  "pentastar": [
                {"x": 9.895 + 3.058, "y": 9.895 + 9.41},{"x": 9.895, "y": 9.895},
                {"x": 9.895 - 8, "y": 9.895 + 5.816},{"x": 9.895, "y": 9.895},
                {"x": 9.895 - 8, "y": 9.895 - 5.816},{"x": 9.895, "y": 9.895},
                {"x": 9.895 + 3.058, "y": 9.895 - 9.41},{"x": 9.895, "y": 9.895},
                {"x": 9.895+ 9.895, "y": 9.895},{"x": 9.895, "y": 9.895}
              ],
  "diagonal1": [
                {"x": 2, "y": 2},
                {"x": 17.79, "y": 17.79}
              ],
  "diagonal2": [
                {"x": 17.79, "y": 2},
                {"x": 2, "y": 17.79}
              ]


};

// function to draw the lines for the various shapes
var lineFunction = d3.svg.line()
  .x(function(d) { return d.x; })
  .y(function(d) { return d.y; })
  .interpolate("linear");

var currentSelection = {
    "shape": "circle",
    "pos": 0,
    "flanker": "circle",
    "flankerPos": 0
}



function setupVisuals() {
  var r = 63.723;

  var svg = d3.select("#stage")
    // .style("height", "800")
    // .style("width", "1650");
    .style("height", dimensions()[1])
    .style("width", dimensions()[0])

  //Fixation cross
  svg.append("svg:line")
        .attr("x1", center()[0] - 10)
        .attr("y1", center()[1])
        .attr("x2", center()[0] + 10)
        .attr("y2", center()[1])
        .attr("stroke", "white")
        .attr("stroke-width", 1);

  //Fixation cross
  svg.append("svg:line")
        .attr("x1", center()[0])
        .attr("y1", center()[1] - 10)
        .attr("x2", center()[0])
        .attr("y2", center()[1] + 10)
        .attr("stroke", "white")
        .attr("stroke-width", 1);

  //positions
  var positions = [];

  svg.selectAll("pos").data([0,1,2,3,4,5])
        .enter().append("svg:circle")
        .attr("cx", function(d,i){
          positions[i] = [];
          positions[i][0] = center()[0] +(r * Math.cos((i * 1.047) + -1.57079632679))
          return center()[0] +(r * Math.cos((i * 1.047) + -1.57079632679))

        })
        .attr("cy", function(d,i){
          positions[i][1] = center()[1] +(r * Math.sin((i * 1.047) + -1.57079632679))
          return center()[1] +(r * Math.sin((i * 1.047) + -1.57079632679))
        })
        .attr("r", 2.72)
        .style("fill", "white")
        .attr("class", function(d, i) {
          return("pos" + i)
        })
        .classed("pos", true);

    // svg.append("svg:circle")
    //     .attr("cx", function() {
    //       return center()[0] - 119.547;
    //     })
    //     .attr("cy", center()[1])
    //     .attr("r", 2.72)
    //     .style("fill", "white")
    //     .classed("flanker", true);
    //
    // svg.append("svg:circle")
    //     .attr("cx", function() {
    //       return center()[0] + 119.547;
    //     })
    //     .attr("cy", center()[1])
    //     .attr("r", 2.72)
    //     .style("fill", "white")
    //     .classed("flanker", true);

  window.positions = positions;
}

// draw the specified shape in the specified stimulus location
function drawShapeAtPosition(shape, position) {
  if(position == 6 || position == 7)
    drawFlanker(shape, position-6);
  if(position > 5 || position < 0)
    return;

  // remove shape and position marker from the seleted position
  d3.selectAll(".stimulus" + position).remove();
  d3.select(".pos" + position).style("fill", "black");

  console.log("drawing ", shape, " at position ", position)

  if(shape == "circle") {
    d3.select("#stage").append("svg:circle")
        .attr("cx", positions[position][0])
        .attr("cy", positions[position][1])
        .attr("r", stimulusDimensions.shapeSize/ 2)
        .classed("shape", true)
        .classed("stimulus" + position, true);
  }

  else if(shape == "square") {
    d3.select("#stage").append("svg:rect")
        .attr("x", positions[position][0] - (stimulusDimensions.shapeSize / 2))
        .attr("y", positions[position][1] - (stimulusDimensions.shapeSize / 2))
        .attr("width", stimulusDimensions.shapeSize)
        .attr("height", stimulusDimensions.shapeSize)
        .classed("shape", true)
        .classed("stimulus" + position, true);
  }

  else {
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData[shape]))
        .classed("shape", true)
        .attr("transform", "translate("
            + (positions[position][0] - (stimulusDimensions.shapeSize / 2))
            + ","
            + (positions[position][1] - (stimulusDimensions.shapeSize / 2))
            + ")")
        .classed("stimulus" + position, true);
  }
}

// side can be 0 for left, 1 for right
function drawFlanker(shape, side) {
  if(side < 0 || side > 1)
    return;

  // remove flanker from the seleted side
  d3.selectAll(".flanker" + side).remove();

  if(shape == "circle") {
    console.log("drawing circle as flanker on side ", side)
    d3.select("#stage").append("svg:circle")
        .attr("cx", function() {
          return stimulusDimensions.flankerPos[side];
        })
        .attr("cy", center()[1])
        .attr("r", stimulusDimensions.flankerSize / 2)
        .classed("shape", true)
        .classed("flanker" + side, true);
  }

  else if(shape == "square") {
    console.log("drawing square at position ", side)
    d3.select("#stage").append("svg:rect")
        .attr("x", (side == 0) ? center()[0] - 119.547 - (stimulusDimensions.flankerSize / 2) : center()[0] + 119.547 - (stimulusDimensions.flankerSize / 2))
        .attr("y", center()[1] - (stimulusDimensions.flankerSize / 2))
        .attr("width", stimulusDimensions.flankerSize)
        .attr("height", stimulusDimensions.flankerSize)
        .classed("shape", true)
        .classed("flanker" + side, true);
  }

  else {//if(shape == "triangle") {
    console.log("drawing triangle at position ", side)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData[shape]))
        .classed("shape", true)
        .attr("transform", "translate("
            + (stimulusDimensions.flankerPos[side] - (stimulusDimensions.flankerSize / 2))
            + ","
            + (center()[1] - (stimulusDimensions.flankerSize / 2))
            + "), scale(1.3)")
        .classed("flanker" + side, true);
  }
}

function randomizeHighLoad() {

  var randomShapeIndex = ["hexagon", "octagon", "diamond", "tristar", "pentastar", "diagonal1", "diagonal2"];
  var randomPositionIndex = [0,1,2,3,4,5];
  var s, shape, p, pos;

  for(var i = 0; i < 6; i++) {
    //console.log(randomShapeIndex, randomPositionIndex);

    s = Math.floor((Math.random() * randomShapeIndex.length));
    shape = randomShapeIndex[s];
    randomShapeIndex.splice(s, 1);


    p = Math.floor((Math.random() * randomPositionIndex.length));
    pos = randomPositionIndex[p];
    randomPositionIndex.splice(p, 1);

    drawShapeAtPosition(shape, pos);
  }
}

function clearShapes() {
    d3.selectAll(".pos").style("fill", "white");
    d3.selectAll(".shape").remove();
    d3.selectAll(".flanker").remove();
}







$(window).keypress(function(e) {
  console.log(e.keyCode);

  //j for draw
  if (e.keyCode == 106) {
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos)
  }

  //Shift+j for draw flanker
  else if (e.keyCode == 74) {
    drawFlanker(currentSelection.shape, currentSelection.flankerPos)
  }

  //space for clear
  else if (e.keyCode == 32) {
    clearShapes();
  }

  ////////////////////////////////////////////////////////////////////////////
  //
  //        S H A P E S
  //
  ////////////////////////////////////////////////////////////////////////////

  // A for circle
  else if (e.keyCode == 97) {
    currentSelection.shape = "circle";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // S for square
  else if (e.keyCode == 115) {
    currentSelection.shape = "square";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // D for triangle
  else if (e.keyCode == 100) {
    currentSelection.shape = "triangle";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // F for asterisk
  else if (e.keyCode == 102) {
    currentSelection.shape = "asterisk";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // G for x
  else if (e.keyCode == 103) {
    currentSelection.shape = "x";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // H for +
  else if (e.keyCode == 104) {
    currentSelection.shape = "+";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // Q for hexagon
  else if (e.keyCode == 113) {
    currentSelection.shape = "hexagon";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // W for octagon
  else if (e.keyCode == 119) {
    currentSelection.shape = "octagon";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // E for diamond
  else if (e.keyCode == 101) {
    currentSelection.shape = "diamond";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // Z for tristar
  else if (e.keyCode == 122) {
    currentSelection.shape = "tristar";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // X for pentastar
  else if (e.keyCode == 120) {
    currentSelection.shape = "pentastar";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // C for diagonal1
  else if (e.keyCode == 99) {
    currentSelection.shape = "diagonal1";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }

  // V for diagonal2
  else if (e.keyCode == 118) {
    currentSelection.shape = "diagonal2";
    drawShapeAtPosition(currentSelection.shape, currentSelection.pos);
  }


  ////////////////////////////////////////////////////////////////////////////
  //
  //        P O S I T I O N S
  //
  ////////////////////////////////////////////////////////////////////////////

  //0 for position 0
  else if (e.keyCode == 48) {
      currentSelection.pos = 0;
  }

  //1 for position 1
  else if (e.keyCode == 49) {
      currentSelection.pos = 1;
  }

  //2 for position 2
  else if (e.keyCode == 50) {
      currentSelection.pos = 2;
  }

  //3 for position 3
  else if (e.keyCode == 51) {
      currentSelection.pos = 3;
  }

  //4 for position 4
  else if (e.keyCode == 52) {
      currentSelection.pos = 4;
  }

  //5 for position 5
  else if (e.keyCode == 53) {
      currentSelection.pos = 5;
  }

  //R for right flanker
  else if (e.keyCode == 114) {
      currentSelection.pos = 7;
      currentSelection.flankerPos = 1;
  }

  //L for left flanker
  else if (e.keyCode == 108) {
      currentSelection.pos = 6;
      currentSelection.flankerPos = 0;
  }

  //M for left flanker
  else if (e.keyCode == 109) {
      randomizeHighLoad();
  }

})


setupVisuals();
