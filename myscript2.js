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
  "triangle": [{"x": 9.895, "y": 0}, {"x": 19.79, "y": 19.79}, {"x": 0, "y": 19.79}, {"x": 9.895, "y": 0}],
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
        .attr("stroke-width", 3);

  //Fixation cross
  svg.append("svg:line")
        .attr("x1", center()[0])
        .attr("y1", center()[1] - 10)
        .attr("x2", center()[0])
        .attr("y2", center()[1] + 10)
        .attr("stroke", "white")
        .attr("stroke-width", 3);

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
  if(position > 5 || position < 0)
    return;

  // remove shape and position marker from the seleted position
  d3.selectAll(".stimulus" + position).remove();
  d3.select(".pos" + position).style("fill", "black");

  if(shape == "circle") {
    console.log("drawing circle at position ", position)
    d3.select("#stage").append("svg:circle")
        .attr("cx", positions[position][0])
        .attr("cy", positions[position][1])
        .attr("r", stimulusDimensions.shapeSize/ 2)
        .classed("shape", true)
        .classed("stimulus" + position, true);
  }

  else if(shape == "square") {
    console.log("drawing square at position ", position)
    d3.select("#stage").append("svg:rect")
        .attr("x", positions[position][0] - (stimulusDimensions.shapeSize / 2))
        .attr("y", positions[position][1] - (stimulusDimensions.shapeSize / 2))
        .attr("width", stimulusDimensions.shapeSize)
        .attr("height", stimulusDimensions.shapeSize)
        .classed("shape", true)
        .classed("stimulus" + position, true);
  }

  else if(shape == "triangle") {
    console.log("drawing triangle at position ", position)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.triangle))
        .classed("shape", true)
        .attr("transform", "translate("
            + (positions[position][0] - (stimulusDimensions.shapeSize / 2))
            + ","
            + (positions[position][1] - (stimulusDimensions.shapeSize / 2))
            + ")")
        .classed("stimulus" + position, true);
  }

  else if(shape == "asterisk") {
    console.log("drawing asterisk at position ", position)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.asterisk))
        .classed("shape", true)
        .attr("transform", "translate("
            + (positions[position][0] - (stimulusDimensions.shapeSize / 2))
            + ","
            + (positions[position][1] - (stimulusDimensions.shapeSize / 2))
            + ")")
        .classed("stimulus" + position, true);
  }

  else if(shape == "x") {
    console.log("drawing x at position ", position)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.x))
        .classed("shape", true)
        .attr("transform", "translate("
            + (positions[position][0] - (stimulusDimensions.shapeSize / 2))
            + ","
            + (positions[position][1] - (stimulusDimensions.shapeSize / 2))
            + ")")
        .classed("stimulus" + position, true);
  }

  else if(shape == "+") {
    console.log("drawing + at position ", position)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData["+"]))
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

  else if(shape == "triangle") {
    console.log("drawing triangle at position ", side)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.triangle))
        .classed("shape", true)
        .attr("transform", "translate("
            + (stimulusDimensions.flankerPos[side] - (stimulusDimensions.flankerSize / 2))
            + ","
            + (center()[1] - (stimulusDimensions.flankerSize / 2))
            + "), scale(1.3)")
        .classed("flanker" + side, true);
  }

  else if(shape == "asterisk") {
    console.log("drawing asterisk at position ", side)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.asterisk))
        .classed("shape", true)
        .attr("transform", "translate("
            + (stimulusDimensions.flankerPos[side] - (stimulusDimensions.flankerSize / 2))
            + ","
            + (center()[1] - (stimulusDimensions.flankerSize / 2))
            + "), scale(1.3)")
        .classed("flanker" + side, true);
  }

  else if(shape == "x") {
    console.log("drawing x at position ", side)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData.x))
        .classed("shape", true)
        .attr("transform", "translate("
            + (stimulusDimensions.flankerPos[side] - (stimulusDimensions.flankerSize / 2))
            + ","
            + (center()[1] - (stimulusDimensions.flankerSize / 2))
            + "), scale(1.3)")
        .classed("flanker" + side, true);
  }

  else if(shape == "+") {
    console.log("drawing + at position ", side)
    d3.select("#stage").append("path")
        .attr("d", lineFunction(shapeData["+"]))
        .classed("shape", true)
        .attr("transform", "translate("
            + (stimulusDimensions.flankerPos[side] - (stimulusDimensions.flankerSize / 2))
            + ","
            + (center()[1] - (stimulusDimensions.flankerSize / 2))
            + "), scale(1.3)")
        .classed("flanker" + side, true);
  }

}

function clearShapes() {
    d3.selectAll(".pos").style("fill", "white");
    d3.selectAll(".shape").remove();
    d3.selectAll(".flanker").remove();
}



//
// var fixA = document.getElementById("fixA");
// var fixB = document.getElementById("fixB");
// var c1 = document.getElementById("c1");
// var c2 = document.getElementById("c2");
// var c3 = document.getElementById("c3");
// var c4 = document.getElementById("c4");
// var selectedPosition = 1;
// var selectedColor = "white";
// var C = {
//     "c1": document.getElementById("c1"),
//     "c2": document.getElementById("c2"),
//     "c3": document.getElementById("c3"),
//     "c4": document.getElementById("c4"),
//     "visible":false
//     }
//
// var T = {
//     "t1":document.getElementById("t1"),
//     "t2":document.getElementById("t2"),
//     "t3":document.getElementById("t3"),
//     "t4":document.getElementById("t4"),
//     "visible":true
// }
// var colors = {
//     "c1": selectedColor,
//     "c2": selectedColor,
//     "c3": selectedColor,
//     "c4": selectedColor,
//     "t1": "grey",
//     "t2": "grey",
//     "t3": "grey",
//     "t4": "grey"
// };
//
// var svgData = {
//     strokewidth: 3,
//     radius: 20
// }
//
// function setup(center) {
//     setFixation(center);
//     setCardinals(center);
//     setT(center);
//     setColors();
// }
//
// function setT(center) {
//     var transform1 = "translate("+ (center.x - 136) +","+ (center.y - 20) +")";
//     var transform3 = "translate("+ (center.x + 101) +","+ (center.y - 20) +") rotate(180, 18, 20)";
//     var transform2 = "translate("+ (center.x - 18) +","+ (center.y - 139) +") rotate(180, 18, 20)";
//     var transform4 = "translate("+ (center.x - 18) +","+ (center.y + 99) +")";
//
//     T.t1.setAttributeNS(null, "transform", transform1);
//     T.t2.setAttributeNS(null, "transform", transform2);
//     T.t3.setAttributeNS(null, "transform", transform3);
//     T.t4.setAttributeNS(null, "transform", transform4);
//
//     toggleT();
// }
//
// function setColors() {
//     $('#c1').css("stroke", colors.c1);
//     $('#c2').css("stroke", colors.c2);
//     $('#c3').css("stroke", colors.c3);
//     $('#c4').css("stroke", colors.c4);
//
//     T.t1.setAttribute("stroke", colors.t1);
//     T.t2.setAttribute("stroke", colors.t2);
//     T.t3.setAttribute("stroke", colors.t3);
//     T.t4.setAttribute("stroke", colors.t4);
// }
//
// function setFixation(center) {
//     fixA.setAttribute("x1", center.x - 10);
//     fixA.setAttribute("y1", center.y);
//     fixA.setAttribute("x2", center.x + 10);
//     fixA.setAttribute("y2", center.y);
//
//     fixB.setAttribute("x1", center.x);
//     fixB.setAttribute("y1", center.y - 10);
//     fixB.setAttribute("x2", center.x);
//     fixB.setAttribute("y2", center.y + 10);
// }
//
// function setCardinals(center) {
//     c1.setAttribute("cx", center.x - 118.74);
//     c1.setAttribute("cy", center.y);
//
//     c3.setAttribute("cx", center.x + 118.74);
//     c3.setAttribute("cy", center.y);
//
//     c2.setAttribute("cx", center.x);
//     c2.setAttribute("cy", center.y - 118.74);
//
//     c4.setAttribute("cx", center.x);
//     c4.setAttribute("cy", center.y + 118.74);
// }
//
// //Toggle colors
// var white = false;
//
// function toggle() {
//     if (white) {
// 	selectedColor = white;
//
//         $('body').css("background-color", "black");
//         $('#c1').css("fill", "black");
//         $('#c2').css("fill", "black");
//         $('#c3').css("fill", "black");
//         $('#c4').css("fill", "black");
//
//         if(colors.c1 == "black")
//             colors.c1 = "white";
//         if(colors.c2 == "black")
//             colors.c2 = "white";
//         if(colors.c3 == "black")
//             colors.c3 = "white";
//         if(colors.c4 == "black")
//             colors.c4 = "white";
//
//         $('#fixA').css("stroke", "white");
//         $('#fixB').css("stroke", "white");
//         white = false;
//
//         setColors();
//     } else {
// 	selectedColor = "black";
//
//         $('body').css("background-color", "white");
//         $('#c1').css("fill", "white");
//         $('#c2').css("fill", "white");
//         $('#c3').css("fill", "white");
//         $('#c4').css("fill", "white");
//
//         if(colors.c1 == "white")
//             colors.c1 = "black";
//         if(colors.c2 == "white")
//             colors.c2 = "black";
//         if(colors.c3 == "white")
//             colors.c3 = "black";
//         if(colors.c4 == "white")
//             colors.c4 = "black";
//
//         $('#fixA').css("stroke", "black");
//         $('#fixB').css("stroke", "black");
//         white = true;
//
//         setColors();
//     }
//
// }
//
// function increaseStrokeSize() {
//     var size = ($('#c1').css("stroke-width").substr(0, 1) * 1 + 1);
//     if (size < 10) {
//         $('#c1').css("stroke-width", size);
//         $('#c2').css("stroke-width", size);
//         $('#c3').css("stroke-width", size);
//         $('#c4').css("stroke-width", size);
//         svgData.strokewidth = size;
//     }
// }
//
// function decreaseStrokeSize() {
//     var size = ($('#c1').css("stroke-width").substr(0, 1) * 1 - 1);
//     if (size > 0) {
//         $('#c1').css("stroke-width", size);
//         $('#c2').css("stroke-width", size);
//         $('#c3').css("stroke-width", size);
//         $('#c4').css("stroke-width", size);
//         svgData.strokewidth = size;
//     }
// }
//
// function increaseSize() {
//     var size = (c1.getAttribute("r") * 1 + 5);
//     if (size < 35) {
//         c1.setAttribute("r", size);
//         c2.setAttribute("r", size);
//         c3.setAttribute("r", size);
//         c4.setAttribute("r", size);
//         svgData.radius = size;
//     }
// }
//
// function decreaseSize() {
//     var size = (c1.getAttribute("r") * 1 - 5);
//     if (size > 10) {
//         c1.setAttribute("r", size);
//         c2.setAttribute("r", size);
//         c3.setAttribute("r", size);
//         c4.setAttribute("r", size);
//         svgData.radius = size;
//     }
//
// }
//
// function setColor(pos, color) {
//     $('#c'+pos).css("stroke",color);
//     colors["c"+pos] = color;
// }
//
// function setTColor(pos, color) {
//     T["t"+pos].setAttribute("stroke",color);
//     colors["t"+pos] = color;
// }
//
// function toggleT() {
//     if(T.visible) {
//         T.t1.setAttribute("visibility", "hidden");
//         T.t2.setAttribute("visibility", "hidden");
//         T.t3.setAttribute("visibility", "hidden");
//         T.t4.setAttribute("visibility", "hidden");
//         T.visible = false;
//     } else {
//         T.t1.setAttribute("visibility", "visible");
//         T.t2.setAttribute("visibility", "visible");
//         T.t3.setAttribute("visibility", "visible");
//         T.t4.setAttribute("visibility", "visible");
//         T.visible = true;
//     }
// }
//
// function toggleCircles() {
//        if(C.visible) {
//         C.c1.setAttribute("visibility", "hidden");
//         C.c2.setAttribute("visibility", "hidden");
//         C.c3.setAttribute("visibility", "hidden");
//         C.c4.setAttribute("visibility", "hidden");
//         C.visible = false;
//     } else {
//         C.c1.setAttribute("visibility", "visible");
//         C.c2.setAttribute("visibility", "visible");
//         C.c3.setAttribute("visibility", "visible");
//         C.c4.setAttribute("visibility", "visible");
//         C.visible = true;
//     }
// }
//
// function rotateT(pos){
//     var transform = T["t"+pos].getAttribute("transform") + " rotate(180, 18, 20)";
//     T["t"+pos].setAttribute("transform", transform);
// }
//
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
  }

  // S for square
  else if (e.keyCode == 115) {
    currentSelection.shape = "square";
  }

  // D for triangle
  else if (e.keyCode == 100) {
    currentSelection.shape = "triangle";
  }

  // F for asterisk
  else if (e.keyCode == 102) {
    currentSelection.shape = "asterisk";
  }

  // G for x
  else if (e.keyCode == 103) {
    currentSelection.shape = "x";
  }

  // H for +
  else if (e.keyCode == 104) {
    currentSelection.shape = "+";
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
      currentSelection.flankerPos = 1;
  }

  //L for left flanker
  else if (e.keyCode == 108) {
      currentSelection.flankerPos = 0;
  }

})


setupVisuals();
