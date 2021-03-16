module.exports = {
    success: (res, data, pagination, message) => {
        const response = {
            code: 200,
            message,
            pagination,
            data
        }
        res.json(response)
    },
    notFound: (res, message) => {
        const response = {
            code: 404,
            message
        }
        res.json(response)
    },
    failed: (res, message) => {
        const response = {
            code: 500,
            message,
        }
        console.log(response)
        // res.json(response)
        res.json(response)
    }
}