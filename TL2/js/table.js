class Table {
    constructor() {}

    /**
     * Retrieves objects to generate the table showing the numbers of total vaccinations' people.
     * @param {Object} data Json data of country's information
     */
    drawTable = (data) => {
        const table = d3.select("#barchartDiagram").append('table');
        const thead = table.append('thead');
        const tbody = table.append('tbody');

        /**
         * The first cell of the table's schemadata
         */
        thead.append("tr").append("th")
            .text("Datum")
            .style("background-color", "steelblue")
            .style("border", "1px black solid")
            .style("padding", "5px")
            .attr("class", "trhead");

        /**
         * The second cell of the table's schemadata
         */
        tbody.append("td")
            .text("vollständig Geimpfte (kumuliert)")
            .style("border", "1px black solid")
            .style("border-collapse", "collapse")
            .style("padding", "5px");
            
        /**
         * Append the header row
         */
        thead.select("tr")
            .selectAll(".th-data")
            .data(data)
            .enter()
            .append("th")
            .attr("class", "th-data")
            .text(d => d.date)
            .style("background-color", "steelblue")
            .style("border", "1px black solid")
            .style("padding", "5px");

        // Create a cell in each row for each column
        d3.select("tbody").selectAll('.td-data')
            .data(data)
            .enter()
            .append('td')
            .attr("class", "td-data")
            .text(d => d.fullyVaccinated)
            .style("border", "1px black solid")
            .style("padding", "5px")
            .on("mouseover", function () {
                d3.select(this).style("background-color", "powderblue");
            })
            .on("mouseout", function () {
                d3.select(this).style("background-color", "white");
            });
    }
}

export { Table };