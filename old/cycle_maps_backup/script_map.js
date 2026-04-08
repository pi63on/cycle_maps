
var myPlayer = videojs("current_video", {});
var lastClick = 100;
// for CHanging Time
myPlayer.currentTime(3);
//Width and height
let w = 500;
let h = 500;
// Projection
let projection = d3.geo.mercator()
    .center([17.109,48.132])
    .translate([w/2,h/2])
    .scale(h*2000);

//Create SVG
let svg = d3.select("#svganchor")
.append("svg")
.attr("width", w)
.attr("height", h);

// Add circles:
d3.csv("coordinate_files/data.csv", (data) => {

    // Add a scale for bubble size
    //let valueExtent = d3.extent(data, (d) => { return +d.n; })
    //let size = d3.scaleSqrt()
    //    .domain(valueExtent)  // What's in the data
    //    .range([1, 20])  // Size of circle in pixel

    let tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("text-align", "center")
        .style("padding", "15px")
        .style("font", "12px sans-serif")
        .style("background", "white")
        .style("border", "0px")
        .style("border-radius", "8px")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .text("a simple tooltip");
    svg
        .selectAll("myCircles")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => { return projection([+d.X, +d.Y])[0] })
        .attr("cy", (d) => { return projection([+d.X, +d.Y])[1] })
        .attr("r", (d) => { return 2 })
        .attr("id", (d) => {return "s_"+d.video})
        .attr("stroke-width", 0)
        .attr("fill", '#055b87')
        .attr("fill-opacity", 1)
        .on("click", function(d){
            myPlayer.currentTime(d.video);})
        .on("mouseover", () => {
            return tooltip.style("visibility", "visible");
        })
        .on("mouseout", () => {
            return tooltip.style("visibility", "hidden");
        })
        .on("mousemove", (d) => {
            tooltip.text('Time: ' + d.video);
            return tooltip.style("top",
                (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })

});


setInterval(function() {
    video_where = myPlayer.currentTime() || 100;
    video_where = Math.round(video_where,0);
    video_where_id = "s_" + video_where;
    svg.selectAll('circle').attr('fill','#000000');
    svg.select("#" + video_where_id).attr("fill", '#ff0000');
    svg.select("#" + video_where_id).raise();
}, 1000);