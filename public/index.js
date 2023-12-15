async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=f1562a0e97124d56b5490067e496ba62&source=docs')
    let result = await response.json()
    console.log(result)

    //Variables used for each stock
    let GME = result.GME
    let MSFT = result.MSFT
    let DIS = result.DIS
    let BNTX = result.BNTX

    const stocks = [GME, MSFT, DIS, BNTX]

    //Get Color function
    function getColor(stock) {
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    //Line chart for Time Chart Canvas
    stocks.forEach(stock => stock.values.reverse())
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.map( value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    })

    //Bar chart for highest price chart
    new Chart(highestPriceChartCanvas, {
        type: 'bar',
        
    })

}

main()