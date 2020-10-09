let request = require('request')
let cheerio = require('cheerio')

class RequestHandler {
    constructor(uri, method = 'GET', body = {}) {
        this.uri = uri;
        this.method = method;
        this.body = body;
    }


    makeRequest() {
        return new Promise(function (resolve, reject) {
            try {
                let options = {
                    uri: this.uri,
                    method: this.method,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/74.0.3729.157 Safari/537.36',
                    }
                }
                if (this.body.length || Object.keys(this.body).length) options.body = this.body

                request(options, function (err, response, body) {
                    if (err) return reject(err)
                    return resolve({
                        response,
                        body
                    })
                })
            } catch (e) {
                return reject(e)
            }
        }.bind(this))
    }

    extractData() {
        return new Promise(async function (resolve, reject) {
            try {
                let data = await this.makeRequest()
                let body = data.body;
                let scrappedData ={}
                const $ = cheerio.load(body)
                scrappedData.reviewCount = $('#acrCustomerReviewText').text().trim().split(' ')[0]
                scrappedData.dealPrice = ($('#priceblock_dealprice').text().trim())
                scrappedData.ourPrice = ($('#priceblock_ourprice').text().trim())
                scrappedData.desktopUnifiedPrice = ($('#desktop_unifiedPrice').text().trim())
                scrappedData.title = ($('#productTitle').text().trim())
                scrappedData.bestSellerRank = ($('#productDetails_detailBullets_sections1 > tbody > tr:nth-child(3) > td > span > span:nth-child(1)').text().trim().split(' ')[0])
                scrappedData.rating = ($('#reviewsMedley > div > div.a-fixed-left-grid-col.a-col-left > div.a-section.a-spacing-none.a-spacing-top-mini.cr-widget-ACR > div.a-fixed-left-grid.AverageCustomerReviews.a-spacing-small > div > div.a-fixed-left-grid-col.aok-align-center.a-col-right > div > span > span').text().trim())
                scrappedData.productDetails =($('#productDetails_db_sections').text().trim())// 
                scrappedData.technicalInfo = ($('#productDetails_techSpec_section_1').text().trim())
                resolve(scrappedData)
                
            } catch (e) {

            }
        }.bind(this))
    }
}

module.exports = RequestHandler