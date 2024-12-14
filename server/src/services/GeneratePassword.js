export const GeneratePasswordService = () => {
    try {
        const numbers = "0123456789"
        const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const specialChars = "@$!%*?&"
        const allChars = numbers + letters + specialChars

        const codeLength = 16
        let code = ""

        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length)
            code += allChars[randomIndex]
        }

        return {
            status: "success",
            data: code
        }
    }
    catch (e) {
        return{
            status: "failed",
            message: e.toString()
        }
    }
};