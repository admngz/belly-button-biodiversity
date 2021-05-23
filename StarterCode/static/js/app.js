// // use d3 library to read in 'sample.json'
// d3.json('./samples.json').then(function(data) {
//     console.log(data)
// });

// charts: h-bar, bubble
function charts(id) {
        d3.json("samples.json").then((data) => {
            // console.log(data)
            var otu_ids = data.samples[0].otu_ids;
            // console.log(otu_ids);
            var sample_values =  data.samples[0].sample_values.slice(0,10).reverse();
            // console.log(sample_values);
            var otu_labels =  data.samples[0].otu_labels.slice(0,10);
            // console.log(otu_labels);
            var top10otu = (data.samples[0].otu_ids.slice(0, 10)).reverse();
            // console.log(top10otu);
            var otu = top10otu.map(d => "OTU " + d);
            // console.log(otu);
            var samples = data.samples.filter(s => s.id.toString() ===id)[0];
            // console.log(samples);


            // * Use `sample_values` as the values for the bar chart.
            // * Use `otu_ids` as the labels for the bar chart.
            // * Use `otu_labels` as the hovertext for the chart.

            var trace = {
                x: sample_values,
                y: otu,
                text: otu_labels,
                marker: {
                color: '#FFA08A'},
                type:"bar",
                orientation: "h",
            };

            var data = [trace];

            var layout = {
                title: "Top 10 OTU",
                autosize: true,
                height: 500,
                width: 700
                
            }
    
            Plotly.newPlot("bar", data, layout);
            
        
    //   bubble
            var trace1 = {
                x: samples.otu_ids,
                y: samples.sample_values,
                mode: "markers",
                marker: {
                    size: samples.sample_values,
                    color: samples.otu_ids
                },
                text: data.otu_labels
            };

            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            var data1 = [trace1];
    
   
            Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  

    function demographics(id) {
        d3.json("samples.json").then((data)=> {
            var metadata = data.metadata;
            // console.log(metadata);
            var filteredResult = metadata.filter(meta => meta.id.toString() === id)[0];
            var demoinfo = d3.select("#sample-metadata");
            
            demoinfo.html("");
    
            Object.entries(filteredResult).forEach((id) => {   
                demoinfo.append("h5")
                .text(id[0]
                .toUpperCase() + ": " + id[1] + "\n");    
            });
        });
    }

    function options(id) {
        charts(id);
        demographics(id);
    }
    
  
    function init() {
        var dropdownMenu = d3.select("#selDataset");
        d3.json("samples.json").then((data)=> {
            data.names.forEach(function(name) {
                dropdownMenu.append("option")
                .text(name)
                .property("value");
            });
            
            charts(data.names[0]);
            demographics(data.names[0]);
        });
    };
    init();
    
    function optionChanged(id) {
        charts(id);
        demographics(id);
    };
