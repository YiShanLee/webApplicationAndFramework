import {
    Barchart
} from './barchart.js';

class App {
    constructor() {
        this.barchart = new Barchart();
        this.barChartLoader = document.getElementById("loaderBar");
        this.pieChart1Loader = document.getElementById("loaderPie1");
        this.pieChart2Loader = document.getElementById("loaderPie2");   
        this.barChartDiagramContainer = document.querySelector("#barchartDiagram");
    }

    /**
     * Retrieves a randomized number between the specified minimum and maximum
     * @param {int} min The minimum number of time in milliseconds
     * @param {int} max The maximum number of time in milliseconds
     */
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    /**
     * Removes the loaders on the webpage
     */
    removeLoader = () => {
        this.barChartLoader.style.display = "none";
        this.pieChart1Loader.style.display = "none";
        this.pieChart2Loader.style.display = "none";
    };

    /**
     * @async
     * Generates the HTML element of select and 
     * passes the value of the chosen country code to the loadBarChartData(countryCode)
     */
     async generateCountrySelection() {
        await fetch("./data/countries.json").then((response) => {
                if (!response.ok) {
                    throw new Error("Data could not be fetched");
                }
                return response.json();
            }).then(countries => {
                const options = document.createElement("select");
                options.setAttribute("selected", "true")

                /*
                 * Creates an option for the dropdown menu for each country listed in 
                 * the countries.json file 
                 */
                countries.forEach((country) => {
                    const option = document.createElement("option");
                    option.setAttribute("value", country.code);
                    option.innerHTML = country.country;
                    options.appendChild(option);
                });

                const selectionText = `<span>Bitte wählen Sie eines der folgenden Länder aus: </span>`;

                document.querySelector("#barchartSelector").innerHTML = selectionText;
                document.querySelector("#barchartSelector").appendChild(options);
                options.selectedIndex = -1;
                options.addEventListener("change", () => {
                    this.barchart.loadBarChartData(options.value);
                }, false);
            })
            .catch(() => this.barchart.displayErrorMessage());
    }

    /**
     * Starts the generation of the dropdown menus with available countries after
     * 1 - 3 seconds
     */
    start = () => {
        setTimeout(() => {
            this.generateCountrySelection();
            this.removeLoader();
        }, this.getRandomInt(1000, 3000));
    };
}

export { App };


