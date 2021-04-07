const enums = require('./enums.json'),
    promotion = require('./models/promotion');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const dataGenerator = {
    generate: async () => {
        const promotionsArray = [];
        try {
            const keys = Object.keys(enums.promotionType);
            for (let i = 1; i <= 10000; i++) {
                let date = new Date();
                date.setDate(date.getDate() + 20);
                let startDate = randomDate(new Date(), date);
                date.setDate(startDate.getDate() + 20);
                let endDate = randomDate(startDate, date);
                promotionsArray.push(
                    {
                        name: 'promotion' + i,
                        type: enums.promotionType[keys[ keys.length * Math.random() << 0]],
                        startDate: startDate,
                        endDate: endDate,
                        userGroupName: 'userGroup' + i
                    }
                )
            }
            await promotion.insertMany(promotionsArray);
        } catch (err){
            console.log(err);
        }
    }
};

module.exports = dataGenerator;



