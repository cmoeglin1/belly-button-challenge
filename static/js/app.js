const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);


d3.json(url).then(function(data) {
  console.log(data);
});

let menu = d3.select("#selDataset");
d3.json(url).then((data) => {
    let sample = data.names;
    sample.forEach((id) => {
        menu.append("option")
        .text(id)
        .property("value",id);
    });
       let default_sample = sample[0];
       getMetadata(default_sample)
       getBarChart(default_sample)
    });

function optionChanged(value){ 
    getMetadata(value)
    getBarChart(value)
};

function getMetadata(sample){
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        let valueData = value[0];

        
        d3.select("#sample-metadata").html("");

        Object.entries(valueData).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        })
    })

}

function getBarChart(sample){
    d3.json(url).then((data) => {
        let chartData = data.samples;
        let value = chartData.filter(result => result.id == sample);
        let valueData = value[0];

        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;
        let y = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let x = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        

        let trace1 = {
            x: x,
            y: y,
            text: labels,
            type: "bar",
            orientation: "h"
        };


        Plotly.newPlot("bar", [trace1])

    })
}

