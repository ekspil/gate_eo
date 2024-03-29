const model = require('./models.js')
const deliveryApikey = "MDU3NThhMTYxMGE4ZDYyM2M3OTk0NDc1ODg1ZmVlYzU4N2FmMmJjMg"

const getDriveSettings = async function(){

    return await model.SettingsDrive.findAll()

}
const setDriveSettings = async function(data){
    if(data.id) {
        const where = {
            id: data.id
        }
        const sett = await model.SettingsDrive.findOne({where})
        sett.name = data.name
        sett.ip = data.ip
        sett.prop = data.prop
        sett.number = data.number
        sett.address = data.address
        sett.darall = data.darall
        await sett.save()
    }
    else {
        const sett = {}
        sett.name = data.name
        sett.ip = data.ip
        sett.prop = data.prop
        sett.number = data.number
        sett.address = data.address
        sett.darall = data.darall
        await model.SettingsDrive.create(sett)
    }

    let settings = await getDriveSettings()
    for(let item of settings){

        restorants[item.number] = item.ip
        restorantsInfo[item.number] = {
            address: item.address,
            darall: item.darall
        }
    }

    return true

}



module.exports={
    getDriveSettings,
    setDriveSettings
}