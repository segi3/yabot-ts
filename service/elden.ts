import axios from "axios"

export const FetchEldenRingAPI = async (category: string, itemName: string) => {

        try {
            const response = await axios.get(`https://eldenring.fanapis.com/api/${category}?name=${itemName}`) 
            if (response.data.data < 1) return 'err:empty'
            return response.data
        } catch (err) {
            console.log(err)
            return 'err:failed'
        }
}