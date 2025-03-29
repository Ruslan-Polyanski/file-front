const filterData = <T extends Record<string, unknown>[], K extends Record<string, unknown>>(data: T, filters: K) => {

    const filteredData = data.filter(item => {
        let resultFilterItem: null | boolean = null

        for(const key in filters) {
            resultFilterItem = item[key] === filters[key]
        }

        return resultFilterItem
    })
    
    return filteredData
}

export { filterData }