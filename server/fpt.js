const axios = require('axios');
const cheerio = require('cheerio');

var fptRawHtml = '';
makeRequestFPT = (getFromNumber) => {
		return axios.get('http://fptshop.com.vn/Ajax/FilterProduct/ViewMore?page=' + getFromNumber + '&typeView=Hot&url=http%3A%2F%2Ffptshop.com.vn%2Fdien-thoai')
			.then((response) => {
				data = response.data;
				fptRawHtml += data.content.trim();
				if (data.next) {
					return makeRequestFPT(data.totalCurrent);
				}else{
					// console.log(fptRawHtml);
				}
			})
			.catch((error) => {
				console.log(error);
			})
}

// extract name, link, price, link img from html
module.exports = function getPhone() {
		let allFptPhone = [];
		return makeRequestFPT(0).then(() => {
			let name = [], link = [], price = [], img =[];
			if (fptRawHtml != '') {
				let $ = cheerio.load(fptRawHtml);
				// get name and link
				$('h3').each((i, elem) => {
					name[i] = elem.children['0'].data;
					link[i] = 'https://fptshop.com.vn' + elem.parent.attribs.href;
				})

				// get price
				$('.p-price').each((i, elem) => {
					let pCurrentPrice = elem.children[0].children;
					if (pCurrentPrice) {
						price[i] = pCurrentPrice[0].data;
					} else {
						price[i] = null;
					}
				})
				// get link img
				$('img').each(function(i, elem){
					if(i % 2 != 0){
						img.push('https://' + elem.attribs.src);
					}
				})
				
				//save all properties to one variable
				for (let i = 0; i < name.length; i++) {
					let newPhone = { name: name[i], link: link[i], price: price[i], img: img[i], date: new Date(), source:'fpt'};
					allFptPhone.push(newPhone);
				}
				return Promise.resolve(allFptPhone);
			} else {
				console.log('data Fpt error');
			}
		});
	}
