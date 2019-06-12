function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
// @TODO: Use `d3.json` to fetch the sample data for the plots
  var defaultURL = `/samples/${sample}`;
   
   // Build Pie Chart
   d3.json(defaultURL).then(function(response){
    
    console.log(response);
    
    var sample_values = response.sample_values.slice(0,10);
    var otu_ids = response.otu_ids.slice(0, 10);
    var otu_labels = response.otu_labels.slice(0, 10);
           
    // Create the Trace - then need to create as a dictionary
     var pie_trace = {
       values: sample_values,
       labels: otu_ids,
       hoverinfo: otu_labels,
       type: "pie"
     };

     var pie_data = [pie_trace];
  
    Plotly.plot("pie", pie_data);
    })};

    // @TODO: Build a Bubble Chart using the sample data

    var bubble_trace = {
      x: [1, 2, 3, 4],
      y: [10, 11, 12, 13],
      mode: 'markers',
      marker: {
        size: [40, 60, 80, 100]
      }
    };
    
    var data = [bubble_trace];
    
    var layout = {
      title: 'Marker Size',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('myDiv', data, layout);





function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();