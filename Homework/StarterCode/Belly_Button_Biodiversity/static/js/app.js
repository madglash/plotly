function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  var defaultURL = `/metadata/${sample}`;
   
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(defaultURL).then(function(response){
    console.log(response)
    console.log(Object.entries(response))

    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    var panel_metadata = d3.select("#sample-metadata")
    panel_metadata.html("")

    // Use `Object.entries` to add each key and value pair to the panel
    //loop through object.entries and add a line for key key/value pair
     //"Title": Belly button value
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    
    Object.entries(response).forEach(([key, value]) => {
      panel_metadata.append("h6").text(`${key}: ${value}`);
      });
  })};

    
    
function buildCharts(sample) {
// @TODO: Use `d3.json` to fetch the sample data for the plots
  var defaultURL = `/samples/${sample}`;
   
   // Build Pie Chart
   d3.json(defaultURL).then(function(response){
    
    console.log(response);
    PIE = d3.select("pie")
    PIE.html("")
    
    var sample_values = response.sample_values;
    var otu_ids = response.otu_ids;
    var otu_labels = response.otu_labels;
           
    // Create the Trace
    var pie_trace = {
      values: sample_values.slice(0,10),
      labels: otu_ids.slice(0,10),
      hoverinfo: otu_labels.slice(0,10),
      type: "pie"
    };

    // Translates trace to be dictionary
    var pie_data = [pie_trace];
    console.log(pie_data)

    pie_layout = {
      title: 'Bacteria per Sample'
    };

    // Plot the pie chart
    Plotly.plot("pie", pie_data, pie_layout);
    
    // @TODO: Build a Bubble Chart using the sample data
    BUBBLE = d3.select("bubble")
    BUBBLE.html("")

    var bubble_trace = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values
      },
      hoverinfo: otu_labels
    };
    
    var bubble_data = [bubble_trace];
    console.log(bubble_data);
  
    var layout = {
      title: 'Bacteria Bubble Chart',
      showlegend: false,
      xaxis: {title: "OTU IDs"},
      yaxis: {title: "Values"}
    };
    
    Plotly.newPlot('bubble', bubble_data, layout);
  })};


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