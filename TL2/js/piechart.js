class Piechart {
    constructor() {}
    /**
     * Shows error message with Bootstrap and put loader.img as not displayed.
     */
    displayErrorMessage = () => {
        document.querySelector("#loaderPie1").style.display = "none";
        document.querySelector("#loaderPie2").style.display = "none";
        document.querySelector("#pieChartContainer1").innerHTML = `<div class="alert alert-danger">Die Daten für die Kreisdiagramme konnten leider nicht geladen werden. Bitte versuchen Sie es später wieder.</div>`
    }

     /**
      * Retrieves the data for a selected country in order to 
      * use it of the generation of the pie charts. 
     * @param {String} countryCode The abbreveation for the selected country
     */
      fetchPieData = (countryCode) => {
        if (countryCode !== "") {
            fetch(`https://l1n.de/tl2/public/country/${countryCode}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            "Sorry, an error occured while fetching the data for the pie chart."
                        );
                    }
                    return response.json();
                })
                .then((json) => {
                    this.preparePieChart1(json, 1);
                    this.preparePieChart2(json, 2);
                })
                .catch(() => this.displayErrorMessage());
        }
    }

    /**
     * Rretrieves the chosen data to render a pie chart
     * @param {Objects} data The chosen data from one country's information
     * @param {int} chartNumber The number of one chart that is generated
     */
    drawDiagram = (data, chartNumber) => {
        // define constants for pie chart
        const width = 400;
        const height = 400;
        const margin = 10;
        const legendSpace = 100;
        const colors = d3.scaleOrdinal().domain(data).range(d3.schemePastel1);

        const pieSvg = d3
            .select(`#pieChartContainer${chartNumber}`)
            .append("svg")
            .attr("viewBox", `0 0 ${width + 2 * margin} ${height + 2*margin + legendSpace}`);

        const pieAngles = d3.pie().value((d) => {
            return d.number;
        })(data);

        // Defines the segments of the pie chart 
        const segments = d3
            .arc()
            .innerRadius(0) // 0 because we want a pie chart, not a donut chart
            .outerRadius(width / 2);

        // Creates a group for each section of the pie chart
        const sections = pieSvg
            .append("g")
            .attr("class", `pieGroup${chartNumber}`)
            .attr("transform", `translate(210, 210)`)
            .selectAll("path")
            .data(pieAngles);

        sections
            .enter()
            .append("path")
            .attr("d", segments)
            .attr("fill", (d, i) => {
                return colors(i); // selects color based on the index
            });

        // Generates and positions the labels for the pie chart
        const pieContent = d3
            .select(`.pieGroup${chartNumber}`)
            .selectAll(`.pieText${chartNumber}`)
            .data(pieAngles);
        pieContent.enter().append("text").attr("class", `pieText${chartNumber}`);
        d3.selectAll(`.pieText${chartNumber}`)
            .data(pieAngles)
            .attr("x", (d) => {
                const center = segments.centroid(d);
                return center[0];
            })
            .style("text-anchor", "middle")
            .attr("y", (d) => {
                const center = segments.centroid(d);
                return center[1];
            })
            .text((d) => d.data.number);

        // Generates the legend for the pie chart  
        const pieLegend = pieSvg.data(pieAngles).append("g").attr("class", `pieLegend${chartNumber}`);
        const legend = pieLegend.selectAll(`.legendItem${chartNumber}`).data(pieAngles);
        legend.enter().append("circle")
            .attr("class", `legendItem${chartNumber}`).attr("cx", margin + width / 4).attr("cy", (d, i) => (height + 3 * margin) + i * 20).attr("r", 6)
            .style("fill", (d, i) => colors(i));

        legend.enter().append("text").attr("class", "legendItemText")
            .text(d => {
                return d.data.categoryName
            }).attr("x", 2 * margin + width / 4).attr("y", (d, i) => 6 + (height + 3 * margin) + i * 20);
    }

    /**
     * Retrieves a country's data and filters the needed attributes for the first pie chart.
     * It shows the age distribution of the  country. 
     * Removes the loader for the first pie chart.
     * @param {Object} json The country's data
     */
    preparePieChart1 = (json) => {
       
        const data = [{
                categoryName: "bis 65 Jahre",
                number: ((100 - json.aged_65_older).toFixed(2))
            },
            {
                categoryName: "von 65 bis 70 Jahren",
                number: (json.aged_65_older - json.aged_70_older).toFixed(2)
            },
            {
                categoryName: "70 Jahre oder älter",
                number: json.aged_70_older.toFixed(2)
            }
        ]

        document.querySelector("#loaderPie1").style.display = "none";

        this.drawDiagram(data, 1);
    }

      /**
         * Retrieves a country's data and filters the needed attributes for the second pie chart.
         * It shows the amount of male and female smokers in the country.
         * Removes the loader for the second pie chart.
         * @param {Object} json The country's data
         */
    preparePieChart2 = (json) => {
        const data = [{
                categoryName: "Raucherinnen",
                number: json.female_smokers
            },
            {
                categoryName: "Raucher",
                number: json.male_smokers
            }
        ];

        document.querySelector("#loaderPie2").style.display = "none";
        this.drawDiagram(data, 2);
    }
}
export {
    Piechart
};