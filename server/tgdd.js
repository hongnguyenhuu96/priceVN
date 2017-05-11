const axios = require('axios');
const cheerio = require('cheerio');


// request to get raw HTML
var tgddRawHtml = '';
const makeRequestTGDD = () => {
		return axios.post('https://www.thegioididong.com/aj/CategoryV4/Product',{
            PageSize: 1000,
            Category: 42
        },{
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        })
        .then((response) => {
			tgddRawHtml += response.data.trim();
			// console.log(tgddRawHtml);
			return Promise.resolve(tgddRawHtml);
	    })
		.catch((error) => {
				console.log(error);
		})
}

// extract name, link, price, img link from html
module.exports = function getPhone() {
		let allPhone = [];
		return makeRequestTGDD().then((result) => {
			let name = [], link = [], price = [], img =[];
			if (tgddRawHtml != '') {
				let $ = cheerio.load(tgddRawHtml);
				// get name and link
				$('.name').each((i, elem) => {
					name[i] = elem.children[0].data;
					let strong = elem.parent.children[3];
					for(let j = 0; j < strong.children.length; j++){
						if(strong.children[j].type == 'text'){
							price[i] = strong.children[j].data;
						}
					}
					link[i] = 'https://www.thegioididong.com' + elem.parent.parent.attribs.href;
				});
				$('img').each((i, elem) => {
					if(elem.attribs['data-original']){
						img.push(elem.attribs['data-original']);
					}else{
						img.push(elem.attribs.src);
					}
				});
				//save to one variable
				for (let i = 0; i < name.length; i++) {
					let newPhone = { name: name[i], link: link[i], price: price[i], img:img[i], source:'tgdd'};
					allPhone.push(newPhone);
				}
				return Promise.resolve(allPhone);
			} else {
				console.log('data Fpt error');
			}
		});
	}