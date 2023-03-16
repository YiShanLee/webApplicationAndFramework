import { Piechart } from "./piechart.js";
import { Table } from "./table.js";
class Barchart {
    constructor() {
        this.piechart = new Piechart();
        this.table = new Table();
        this.barChartDiagramContainer = document.querySelector("#barchartDiagram");
        this.barChartLoader = document.querySelector("#loaderBar");
    }

    /**
     * Creates the legend for the barchart
     */
    createBarChartAxisInfo = () => {
        const xAxisDescription = "X-Achse: Datum";
        const yAxisDescription = "Y-Achse: Blau(Geimpfte), Grün(Vollständig Geimpfte)";
        const width = 450,
            height = 60;
        const holder = d3
            .select("#barchartDiagram")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "pink")
            .attr("class", "achseInfo")
            .style("border", "5px grey dashed");


        holder.append("text")
            .style("fill", "black")
            .style("font-size", "15px")
            .attr("dy", ".35em")
            .attr("width", width)
            .attr("height", height)
            .attr("text-anchor", "middle")
            .attr("transform", "translate(75,15)")
            .text(xAxisDescription);

        holder.append("text")
            .style("fill", "black")
            .style("font-size", "15px")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(195,35)")
            .text(yAxisDescription);
    }

    /**
     * Retrieves objects to generate barchart for one chosen country.
     * @param {Object} data Json-formatted data of country's information
     */
    drawBarChart = (data) => {
        this.barChartDiagramContainer.innerHTML = "";

        // define constants for barchart
        const width = 1000;
        const height = 450;
        const margin = {
            top: 50,
            bottom: 50,
            right: 50,
            left: 150
        };

        const xAxisLabelSpace = 100;

        /** 
         * Retrieves maximum number of vaccinated people in the data set 
         * since it is needed for calculating the measurements for the
         * x axis
         */
        const maxVaccinated = d3.max(data, (d) => {
            return +d.vaccinated;
        });

        // define x axis ratio
        const x = d3.scaleBand().domain(d3.range(data.length)).range([margin.left, width]);

        // define y axis ratio
        const y = d3.scaleLinear().domain([0, maxVaccinated]).range([height, margin.top]);

        const svg = d3
            .select("#barchartDiagram")
            .append("svg")
            .data(data)
            .attr("viewBox", (d) => `0 0 ${width + margin.left} ${height + margin.top + xAxisLabelSpace}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .style("padding-bottom", 20);

        const barGroup = svg
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("x", margin.right)
            .attr(
                "transform",
                (d, i) => `translate (${ margin.left+ i * x.bandwidth()}, 0)`
            );

        barGroup
            .append("rect")
            .data(data)
            .attr("y", (d) => y(d.vaccinated))
            .attr("title", (d) => d.vaccinated)
            .attr("width", ((x.bandwidth() / 2) - 1))
            .attr("height", (d) => y(0) - y(d.vaccinated))
            .style("fill", "steelblue");

        barGroup
            .append("rect")
            .data(data)
            .attr("height", (d) => y(0) - y(d.fullyVaccinated))
            .attr("width", (x.bandwidth() / 2) - 7)
            .attr("x", (x.bandwidth() / 2))
            .attr("y", (d) => y(d.fullyVaccinated))
            .style("fill", "green");

        const yAxis = g => {
            g.attr("transform", `translate(${margin.left}, 0)`)
                .call(d3.axisLeft(y).ticks(null, data.format))
                .attr("font-size", "18px");
        };

        const xAxis = g => {
            g.attr("class", "x axis")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x).tickFormat(i => data[i].date))
                .attr("font-size", "18px");
        };

        svg.append("g").call(xAxis);
        d3.selectAll(".tick text").attr("transform", "translate(30, 50), rotate(70)");
        svg.append("g").call(yAxis);

    }

    /**
     * Shows an error messagte instead of the bar chart when 
     * the data could not be fetched
     */
    displayErrorMessage() {
        this.barChartLoader.style.display = "none";
        this.barChartDiagramContainer.innerHTML = `<div class="alert alert-danger">Die Daten konnten leider nicht geladen werden. Bitte versuchen Sie es zu einem späteren Zeitpunkt noch einmal.</div>`
        this.piechart.displayErrorMessage();
    }
 
    /**
     * Shows loaders whenever a new country is selected
     */
    showLoadersWhileFetchingRemoteData = () => {
        this.barChartDiagramContainer.innerHTML = "";
        document.querySelector("#pieChartContainer1").innerHTML = "";
        document.querySelector("#pieChartContainer2").innerHTML = "";
  
        this.barChartLoader.style.display = "block";
        document.querySelector("#loaderPie1").style.display = "block";
        document.querySelector("#loaderPie2").style.display = "block";
    }
   
    /**
     * Chooses one country code to filter the country's information, then the data passing via fetch API to functions of drawBarChart(data),
     * createBarChartAxisInfo(),drawTable(data), and fetchPieData(countryCode). Within fetch API is handled error through catch. 
     * After the fetch API is finished show the string of "Fetching Data complete!" through console.
     * @param {String} countryCode  
     */
    loadBarChartData = (countryCode) => {
        if (countryCode !== "") {

            this.showLoadersWhileFetchingRemoteData();
            
            fetch(`https://l1n.de/tl2/public/country/${countryCode}/vaccinations`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Sorry, the data could not be fetched.");
                    }
                    return response.json();
                })
                .then((data) => {
                    let barChartData = [];

                    /** 
                     * The regex is used to only select the data sets which have either the 2nd,
                     * the 12th, or the 22th as day in their date field in order not 
                     * to have too many values to display in the bar chart.
                     */
                    const re = /[0-9]{4}-[0-9]{2}-[0-9]{1}2/;

                    const filteredData = [];
                    data.forEach((entry) => {
                        if (entry.date.match(re)) {
                            filteredData.push(entry);
                        }
                    });

                    /**
                     * Goes through each entry and checks whether the number for vaccinated or
                     * fully vaccinated is undefined (since for some dates there might not be 
                     * information on that). If so, the according value is set to 0.
                     */
                    filteredData.forEach((entry, index) => {
                        const entryObject = {
                            date: entry.date,
                            vaccinated: entry.people_vaccinated != undefined ? entry.people_vaccinated : 0,
                            fullyVaccinated: entry.people_fully_vaccinated != undefined ?
                                entry.people_fully_vaccinated : 0,
                        };
                        barChartData[index] = entryObject;
                    })
                    
                    /**
                     * Data that gets into the bar chart: an array of objects that have
                     * keys for date, vaccinated and fully vaccinated people:
                     * [{date: <date>, vaccinated: <value>, fullyVaccinated: <value>}, ... ]
                     */
                    return barChartData;
                })
                .then((data) => {
                    this.barChartLoader.style.display = "none";
                    this.drawBarChart(data);
                    this.createBarChartAxisInfo();
                    this.table.drawTable(data);

                })
                .then(() => this.piechart.fetchPieData(countryCode))
                .catch(() => this.displayErrorMessage())
                .finally(() => console.log("Fetching Data complete!"));
        }

    }
    
}
export {
    Barchart
};
