
var money_data = {}
money_data = [
  {
    num:"不限",
    arr: [""]
  },
  {
    num: '2K',
    arr: ['3K', '4K']
  },
  {
    num: '3K',
    arr: ['4K', '5K', '6K']
  },
  {
    num: '4K',
    arr: ['5K', '6K', '7K', '8K']
  },
  {
    num: '5K',
    arr: ['6K', '7K', '8K', '9K', '10K']
  },
  {
    num: '6K',
    arr: ['7K', '8K', '9K', '10K', '11K', '12K']
  },
  {
    num: '7K',
    arr: ['8K', '9K', '10K', '11K', '12K', '13K', '14K']
  }
]
function getMoney(){
	return money_data;
}

module.exports = {
  getMoney: getMoney
}