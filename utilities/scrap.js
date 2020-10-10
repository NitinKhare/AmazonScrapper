let RequestHandler = require('./requestHandler')
let utility = require('./util');
let globalVar = require('./globalVar');

module.exports = async function scrap(uri) {
    try {
        let makeReq = new RequestHandler(uri, "GET")
        let scrappedData = await makeReq.extractData()
        let price = utility.getPrices(utility.removeSpaces(scrappedData.desktopUnifiedPrice))
        let additionalInformation = utility.findInfo(scrappedData.productDetails, globalVar.productDetails)
        let technicalInfo = utility.findInfo(scrappedData.technicalInfo, globalVar.technicalDetails)
        delete scrappedData.desktopUnifiedPrice
        delete scrappedData.productDetails
        delete scrappedData.technicalInfo
        let allData = { price, additionalInformation, technicalInfo, otherData:scrappedData }
        return allData
    } catch (e) {
        console.log("An Error Occurred", e)
        return e
    }
}