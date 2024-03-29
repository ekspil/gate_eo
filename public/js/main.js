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
        settingsDrive: [],
        settingsDriveNew: {
            name: "",
            ip: "",
            number: null,
            prop: "",
            address: null,
            darall: false,
        }
    },
    computed: {},
    methods: {
        setDriveSettings: async function(index){
            let params = this.settingsDrive[index]
            if(index === null){
                params = this.settingsDriveNew
            }
            try {
                await axios({
                    method: 'post',
                    url: 'http://'+server+'/api/v1/setDriveSettings',
                    headers: { 'content-type': 'application/json' },
                    data: params
                })

                location.reload()
            } catch (e) {
                throw new Error(e)
            }
        }
    },
})