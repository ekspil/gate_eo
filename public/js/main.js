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
            const params = this.settingsDrive[index]
            console.log(params)
            try {
                const answer = await axios({
                    method: 'post',
                    url: 'http://'+server+'/api/v1/setDriveSettings',
                    headers: { 'content-type': 'application/json' },
                    data: JSON.stringify(params)
                })

                console.log(answer)
            } catch (e) {
                throw new Error(e)
            }
        }
    },
})