module.exports = {
    removeSpaces: function (text) {
        return text.replace(/\r\n|\n|\r/gm, '\n').split('\n')
    },

    hasNumber: function (myString) {
        return /\d/.test(myString);
    },

    getPrices: function (arr) {
        let hashMap = {};
        let key = "";
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].length > 0) {
                if (!module.exports.hasNumber(arr[i])) {
                    key = arr[i]
                } else if (key) {
                    hashMap[key] = hashMap[key] ? hashMap[key] + " " + arr[i] : arr[i]
                }
            }
        }
        return hashMap;
    },
    
    findInfo: function (text, labelsToFind = []) {
        let hashMap = {}
        let dataArr = []
        let key = '';
        let data = module.exports.removeSpaces(text)
        dataArr = data.filter(d => d.length > 1);
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].length > 1) {
                if (labelsToFind.indexOf(dataArr[i].toLowerCase().trim()) > -1) {
                    key = dataArr[i]
                } else if (key) {
                    hashMap[key] = hashMap[key] ? hashMap[key] + " " + dataArr[i] : dataArr[i]
                }
            }
        }
        return hashMap
    }
}