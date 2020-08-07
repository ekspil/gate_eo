let server = document.location.host
let app = new Vue({
    el: '#app',
    mounted: async function () {
        console.log(server)
        try {
            const { data } = await axios.get('http://'+server+'/api/v1/getDriveSettings', {
                params: {

                }
            })
            this.settingsDrive = data
        } catch (e) {
            throw new Error(e)
        }

    },
    data: {
        settingsDrive: []
    },
    computed: {},
    methods: {
        setDriveSettings: async function(index){
            const params = JSON.stringify(this.settingsDrive[index])
            try {
                const { data } = await axios.post('http://'+server+'/api/v1/setDriveSettings', params)
                console.log(data)
            } catch (e) {
                throw new Error(e)
            }
        }
    },
})